from __future__ import annotations

import os
from pathlib import Path

import torch
from datasets import load_dataset
from peft import LoraConfig
from transformers import AutoModelForCausalLM, AutoTokenizer, set_seed
from trl import SFTConfig, SFTTrainer


MODEL_ID = "Qwen/Qwen3.5-0.8B"
DATASET_ID = "celsowm/valdoria-sft-qwen35-dataset"

OUTPUT_ROOT = Path(os.environ.get("SFT_OUTPUT_ROOT", "runs"))
OUTPUT_DIR = OUTPUT_ROOT / "sft-valdoria-qwen35-08b-lora"

SEED = 42


def can_use_tf32() -> bool:
    if not torch.cuda.is_available():
        return False

    major, _minor = torch.cuda.get_device_capability()
    return major >= 8  # Ampere or higher


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
    dataset = load_dataset(DATASET_ID, split="train").shuffle(seed=SEED)

    # Longer smoke test.
    # To train on the full dataset, replace this line:
    #
    #   smoke_dataset = dataset
    #
    smoke_dataset = dataset.select(range(min(1024, len(dataset))))

    # The dataset must expose "messages".
    # SFTTrainer applies the chat template automatically.
    splits = smoke_dataset.train_test_split(
        test_size=0.1,
        seed=SEED,
    )

    return splits["train"], splits["test"]


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

    print("dtype:", model_dtype)
    print("bf16:", supports_bf16)
    print("fp16:", torch.cuda.is_available() and not supports_bf16)
    print("tf32:", supports_tf32)
    print("optimizer:", optim)

    train_dataset, eval_dataset = load_train_eval_dataset()

    tokenizer = AutoTokenizer.from_pretrained(
        MODEL_ID,
        trust_remote_code=True,
    )

    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    tokenizer.padding_side = "right"

    model_kwargs = {
        "dtype": model_dtype,
        "trust_remote_code": True,
    }

    if torch.cuda.is_available():
        model_kwargs["device_map"] = "auto"

    model = AutoModelForCausalLM.from_pretrained(
        MODEL_ID,
        **model_kwargs,
    )

    model.config.use_cache = False

    peft_config = LoraConfig(
        r=32,
        lora_alpha=64,
        lora_dropout=0.03,
        bias="none",
        task_type="CAUSAL_LM",
        target_modules=[
            "q_proj",
            "k_proj",
            "v_proj",
            "o_proj",
            "gate_proj",
            "up_proj",
            "down_proj",
        ],
    )

    args = SFTConfig(
        output_dir=str(OUTPUT_DIR),

        # training
        max_steps=220,
        per_device_train_batch_size=1,
        per_device_eval_batch_size=1,
        gradient_accumulation_steps=2,

        # optimization
        learning_rate=2e-4,
        optim=optim,

        # sequence
        max_length=512,
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

        # evaluation
        do_train=True,
        do_eval=True,
        eval_strategy="steps",
        eval_steps=20,

        # logging / saving
        logging_steps=20,
        save_strategy="no",
        report_to="none",

        # misc
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
        peft_config=peft_config,
    )

    trainable = sum(p.numel() for p in trainer.model.parameters() if p.requires_grad)
    total = sum(p.numel() for p in trainer.model.parameters())

    print("=" * 80)
    print("Trainable params:", f"{trainable:,}", f"({100 * trainable / total:.4f}%)")
    print("Total params:", f"{total:,}")
    print("Train:", len(train_dataset))
    print("Eval:", len(eval_dataset))
    print("Output:", OUTPUT_DIR)
    print("=" * 80)

    result = trainer.train()

    print("=" * 80)
    print("Final metrics:")
    print(result.metrics)
    print("=" * 80)

    trainer.save_model(str(OUTPUT_DIR))
    tokenizer.save_pretrained(str(OUTPUT_DIR))

    print("LoRA adapter saved at:", OUTPUT_DIR)


if __name__ == "__main__":
    main()
