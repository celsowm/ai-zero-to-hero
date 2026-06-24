from __future__ import annotations

import os
from pathlib import Path

import torch
from datasets import load_dataset
from transformers import AutoModelForCausalLM, AutoTokenizer, set_seed
from trl import SFTConfig, SFTTrainer


MODEL_ID = "Qwen/Qwen3.5-0.8B"
DATASET_ID = "celsowm/valdoria-sft-qwen35-dataset"

OUTPUT_ROOT = Path(os.environ.get("SFT_OUTPUT_ROOT", "runs"))
OUTPUT_DIR = OUTPUT_ROOT / "sft-valdoria-qwen35-08b-full"

SEED = 42


def can_use_tf32() -> bool:
    if not torch.cuda.is_available():
        return False

    major, _minor = torch.cuda.get_device_capability()
    return major >= 8


def get_model_dtype() -> torch.dtype:
    if not torch.cuda.is_available():
        return torch.float32

    if torch.cuda.is_bf16_supported():
        return torch.bfloat16

    return torch.float16


def print_cuda_info() -> None:
    print("=" * 80)
    print("CUDA available:", torch.cuda.is_available())

    if torch.cuda.is_available():
        print("GPU:", torch.cuda.get_device_name(0))
        print("Capability:", torch.cuda.get_device_capability(0))
        print("BF16 supported:", torch.cuda.is_bf16_supported())
        print("TF32 supported:", can_use_tf32())
        print("CUDA device count:", torch.cuda.device_count())

    print("=" * 80)


def load_train_eval_dataset():
    dataset = load_dataset(DATASET_ID)
    data_split = "train" if "train" in dataset else next(iter(dataset))

    if "validation" in dataset:
        train_dataset = dataset[data_split]
        eval_dataset = dataset["validation"]
    elif "test" in dataset:
        train_dataset = dataset[data_split]
        eval_dataset = dataset["test"]
    else:
        splits = dataset[data_split].shuffle(seed=SEED).train_test_split(
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

    supports_bf16 = torch.cuda.is_available() and torch.cuda.is_bf16_supported()
    supports_tf32 = can_use_tf32()
    model_dtype = get_model_dtype()

    if supports_tf32:
        torch.backends.cuda.matmul.allow_tf32 = True
        torch.backends.cudnn.allow_tf32 = True

    print("model dtype:", model_dtype)
    print("bf16:", supports_bf16)
    print("fp16:", torch.cuda.is_available() and not supports_bf16)
    print("tf32:", supports_tf32)

    train_dataset, eval_dataset = load_train_eval_dataset()

    tokenizer = AutoTokenizer.from_pretrained(
        MODEL_ID,
        trust_remote_code=True,
    )

    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    tokenizer.padding_side = "right"

    model = AutoModelForCausalLM.from_pretrained(
        MODEL_ID,
        dtype=model_dtype,
        trust_remote_code=True,
    )

    model.config.use_cache = False

    args = SFTConfig(
        output_dir=str(OUTPUT_DIR),

        # training
        num_train_epochs=3,
        max_steps=-1,
        per_device_train_batch_size=16,
        per_device_eval_batch_size=16,
        auto_find_batch_size=True,
        gradient_accumulation_steps=1,

        # optimization
        learning_rate=1.5e-5,
        warmup_steps=10,
        weight_decay=0.01,
        lr_scheduler_type="cosine",
        optim="adamw_bnb_8bit",

        # sequence
        max_length=1024,
        packing=False,

        # precision
        bf16=supports_bf16,
        fp16=torch.cuda.is_available() and not supports_bf16,
        tf32=supports_tf32,

        # memory
        gradient_checkpointing=True,
        gradient_checkpointing_kwargs={"use_reentrant": False},
        use_cache=False,

        # loss
        assistant_only_loss=True,
        loss_type="nll",

        # train/eval
        do_train=True,
        do_eval=True,
        eval_strategy="steps",
        eval_steps=50,

        # logs/save
        logging_steps=50,
        save_strategy="steps",
        save_steps=50,
        save_total_limit=2,
        load_best_model_at_end=True,
        metric_for_best_model="eval_loss",
        greater_is_better=False,

        # misc
        report_to="none",
        remove_unused_columns=False,
        seed=SEED,
        data_seed=SEED,
    )

    trainer = SFTTrainer(
        model=model,
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

    print("Full model saved to:", OUTPUT_DIR)

if __name__ == "__main__":
    main()
