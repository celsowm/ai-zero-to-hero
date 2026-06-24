from __future__ import annotations

import os
from pathlib import Path

import torch
from datasets import load_dataset
from transformers import AutoModelForCausalLM, AutoTokenizer, set_seed
from trl import DPOConfig, DPOTrainer


# Model already trained with full SFT
SFT_MODEL_DIR = "runs/sft-valdoria-qwen35-08b-full"

DATASET_ID = "celsowm/valdoria-dpo-qwen35-dataset"

OUTPUT_ROOT = Path(os.environ.get("DPO_OUTPUT_ROOT", "runs"))
OUTPUT_DIR = OUTPUT_ROOT / "dpo-valdoria-qwen35-08b-full"

SEED = 42


def can_use_tf32() -> bool:
    if not torch.cuda.is_available():
        return False

    major, _minor = torch.cuda.get_device_capability()
    return major >= 8  # Ampere or newer


def can_use_bf16() -> bool:
    return torch.cuda.is_available() and torch.cuda.is_bf16_supported()


def get_model_dtype() -> torch.dtype:
    if not torch.cuda.is_available():
        return torch.float32

    if can_use_bf16():
        return torch.bfloat16

    return torch.float16


def get_optim() -> str:
    if torch.cuda.is_available():
        return "adamw_bnb_8bit"

    return "adamw_torch"


def print_cuda_info() -> None:
    print("=" * 80)
    print("CUDA available:", torch.cuda.is_available())

    if torch.cuda.is_available():
        print("CUDA device count:", torch.cuda.device_count())
        print("GPU 0:", torch.cuda.get_device_name(0))
        print("Capability:", torch.cuda.get_device_capability(0))
        print("BF16 supported:", can_use_bf16())
        print("TF32 supported:", can_use_tf32())

    print("=" * 80)


def load_train_eval_dataset():
    print("Loading DPO dataset:", DATASET_ID)

    dataset = load_dataset(DATASET_ID)

    train_dataset = dataset["train"]

    if "validation" in dataset:
        eval_dataset = dataset["validation"]
    elif "test" in dataset:
        eval_dataset = dataset["test"]
    else:
        splits = train_dataset.shuffle(seed=SEED).train_test_split(
            test_size=0.1,
            seed=SEED,
        )
        train_dataset = splits["train"]
        eval_dataset = splits["test"]

    return train_dataset, eval_dataset


def main() -> None:
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)

    set_seed(SEED)
    print_cuda_info()

    supports_bf16 = can_use_bf16()
    supports_tf32 = can_use_tf32()
    model_dtype = get_model_dtype()
    optim = get_optim()

    if supports_tf32:
        torch.backends.cuda.matmul.allow_tf32 = True
        torch.backends.cudnn.allow_tf32 = True

    print("Model dtype:", model_dtype)
    print("bf16:", supports_bf16)
    print("fp16:", torch.cuda.is_available() and not supports_bf16)
    print("tf32:", supports_tf32)
    print("optimizer:", optim)

    train_dataset, eval_dataset = load_train_eval_dataset()

    print("Loading SFT model:", SFT_MODEL_DIR)

    tokenizer = AutoTokenizer.from_pretrained(
        str(SFT_MODEL_DIR),
        trust_remote_code=True,
    )

    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    # Important in the current DPOTrainer:
    # for DPO we typically use left padding.
    tokenizer.padding_side = "left"

    model = AutoModelForCausalLM.from_pretrained(
        str(SFT_MODEL_DIR),
        dtype=model_dtype,
        trust_remote_code=True,
    )

    model.config.use_cache = False
    model.gradient_checkpointing_enable()

    args = DPOConfig(
        output_dir=str(OUTPUT_DIR),

        # DPO usually needs a much lower LR than SFT.
        learning_rate=5e-7,
        num_train_epochs=2,
        max_steps=-1,

        # DPO consumes more VRAM than SFT:
        # chosen + rejected + reference.
        per_device_train_batch_size=4,
        per_device_eval_batch_size=4,
        auto_find_batch_size=True,
        gradient_accumulation_steps=4,

        warmup_ratio=0.03,
        weight_decay=0.01,
        lr_scheduler_type="cosine",
        optim=optim,

        # Standard DPO.
        beta=0.1,
        loss_type="sigmoid",

        # Context
        max_length=1024,
        truncation_mode="keep_start",

        # Safe precision
        bf16=supports_bf16,
        fp16=torch.cuda.is_available() and not supports_bf16,
        tf32=supports_tf32,

        # Memory
        gradient_checkpointing=True,
        gradient_checkpointing_kwargs={"use_reentrant": False},
        use_cache=False,

        # Training / evaluation
        do_train=True,
        do_eval=True,
        eval_strategy="steps",
        eval_steps=25,
        logging_steps=25,

        # Checkpoints
        save_strategy="steps",
        save_steps=25,
        save_total_limit=2,
        load_best_model_at_end=True,
        metric_for_best_model="eval_loss",
        greater_is_better=False,

        # Misc
        report_to="none",
        remove_unused_columns=False,
        seed=SEED,
        data_seed=SEED,
    )

    trainer = DPOTrainer(
        model=model,

        # ref_model=None is intentional:
        # DPOTrainer uses the initial policy as the reference.
        # In other words: the reference is your SFT before DPO starts.
        ref_model=None,

        args=args,
        train_dataset=train_dataset,
        eval_dataset=eval_dataset,
        processing_class=tokenizer,
    )

    trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
    total = sum(p.numel() for p in model.parameters())

    print("=" * 80)
    print("Trainable parameters:", f"{trainable:,}", f"({100 * trainable / total:.2f}%)")
    print("Total parameters:", f"{total:,}")
    print("Train:", len(train_dataset))
    print("Validation:", len(eval_dataset))
    print("Output:", OUTPUT_DIR)
    print("=" * 80)

    result = trainer.train()

    print("=" * 80)
    print("Final metrics:")
    print(result.metrics)
    print("=" * 80)

    trainer.save_model(str(OUTPUT_DIR))
    tokenizer.save_pretrained(str(OUTPUT_DIR))

    print("DPO model saved to:", OUTPUT_DIR)


if __name__ == "__main__":
    main()
