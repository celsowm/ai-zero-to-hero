from __future__ import annotations

import os
from pathlib import Path

import torch
from datasets import DatasetDict, load_dataset
from transformers import AutoModelForCausalLM, AutoTokenizer, set_seed
from trl.experimental.orpo import ORPOConfig, ORPOTrainer


MODEL_ID = "Qwen/Qwen3.5-0.8B"
DATASET_ID = "celsowm/valdoria-orpo-qwen35-dataset"

SEED = 42

BASE_DIR = Path(__file__).resolve().parent
OUTPUT_ROOT = Path(os.environ.get("ORPO_OUTPUT_ROOT", BASE_DIR / "runs")).resolve()
OUTPUT_DIR = OUTPUT_ROOT / "orpo-valdoria-qwen35-08b"


def is_valid_orpo_example(example: dict) -> bool:
    prompt = example.get("prompt")
    chosen = example.get("chosen")
    rejected = example.get("rejected")

    if not isinstance(prompt, list) or len(prompt) == 0:
        return False

    if not isinstance(chosen, list) or len(chosen) == 0:
        return False

    if not isinstance(rejected, list) or len(rejected) == 0:
        return False

    chosen_text = chosen[-1].get("content", "").strip()
    rejected_text = rejected[-1].get("content", "").strip()

    if not chosen_text:
        return False

    if not rejected_text:
        return False

    if chosen_text == rejected_text:
        return False

    metadata = example.get("metadata") or {}
    status = metadata.get("status")

    # If metadata.status exists, it must be "kept".
    # If there is no metadata, accept.
    if status is not None and status != "kept":
        return False

    return True


def load_orpo_dataset() -> tuple:
    print("Loading ORPO dataset:", DATASET_ID)

    dataset = load_dataset(
        DATASET_ID,
        download_mode="force_redownload",
    )

    print("Dataset loaded:")
    print(dataset)

    if not isinstance(dataset, DatasetDict):
        raise TypeError(f"Expected DatasetDict, got: {type(dataset)}")

    if "train" not in dataset:
        raise ValueError(f"Dataset must have a train split. Found: {list(dataset.keys())}")

    train_dataset = dataset["train"]

    if "validation" in dataset:
        eval_dataset = dataset["validation"]
    elif "test" in dataset:
        eval_dataset = dataset["test"]
    else:
        split = train_dataset.shuffle(seed=SEED).train_test_split(
            test_size=0.1,
            seed=SEED,
        )
        train_dataset = split["train"]
        eval_dataset = split["test"]

    print("Train columns:", train_dataset.column_names)
    print("Eval columns :", eval_dataset.column_names)

    required = {"prompt", "chosen", "rejected"}
    missing = required - set(train_dataset.column_names)

    if missing:
        raise ValueError(
            f"Invalid ORPO dataset. Missing columns: {sorted(missing)}. "
            f"Found columns: {train_dataset.column_names}"
        )

    before_train = len(train_dataset)
    before_eval = len(eval_dataset)

    train_dataset = train_dataset.filter(is_valid_orpo_example)
    eval_dataset = eval_dataset.filter(is_valid_orpo_example)

    print("Train before/after filter:", before_train, len(train_dataset))
    print("Eval  before/after filter:", before_eval, len(eval_dataset))

    if len(train_dataset) == 0:
        raise ValueError("Train split is empty after filtering.")

    if len(eval_dataset) == 0:
        raise ValueError("Eval split is empty after filtering.")

    print("First valid example:")
    print(train_dataset[0])

    return train_dataset, eval_dataset


def main() -> None:
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)

    set_seed(SEED)

    if torch.cuda.is_available():
        torch.backends.cuda.matmul.allow_tf32 = True

    train_dataset, eval_dataset = load_orpo_dataset()

    print("Loading base model:", MODEL_ID)

    tokenizer = AutoTokenizer.from_pretrained(
        MODEL_ID,
        trust_remote_code=True,
    )

    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    # Preference training: left padding is best.
    tokenizer.padding_side = "left"

    dtype = torch.float32

    if torch.cuda.is_available():
        if torch.cuda.is_bf16_supported():
            dtype = torch.bfloat16
        else:
            dtype = torch.float16

    model = AutoModelForCausalLM.from_pretrained(
        MODEL_ID,
        dtype=dtype,
        trust_remote_code=True,
    )

    model.config.use_cache = False
    model.gradient_checkpointing_enable()

    args = ORPOConfig(
        output_dir=str(OUTPUT_DIR),

        # Pure ORPO: base -> ORPO.
        # Conservative LR so as not to destroy base behavior.
        learning_rate=1e-6,
        num_train_epochs=3,
        max_steps=-1,

        per_device_train_batch_size=4,
        per_device_eval_batch_size=4,
        gradient_accumulation_steps=4,
        auto_find_batch_size=True,

        # Paper uses beta=0.1 as a practical reference.
        beta=0.1,

        max_length=1024,

        warmup_ratio=0.03,
        weight_decay=0.01,
        lr_scheduler_type="cosine",
        optim="adamw_bnb_8bit",

        bf16=torch.cuda.is_available() and torch.cuda.is_bf16_supported(),
        fp16=torch.cuda.is_available() and not torch.cuda.is_bf16_supported(),
        tf32=torch.cuda.is_available(),

        gradient_checkpointing=True,

        do_train=True,
        do_eval=True,

        eval_strategy="steps",
        eval_steps=25,
        logging_steps=25,

        save_strategy="steps",
        save_steps=25,
        save_total_limit=2,

        load_best_model_at_end=True,
        metric_for_best_model="eval_loss",
        greater_is_better=False,

        report_to="none",

        # Important because the dataset may still have metadata.
        remove_unused_columns=False,

        seed=SEED,
        data_seed=SEED,
    )

    trainer = ORPOTrainer(
        model=model,
        args=args,
        train_dataset=train_dataset,
        eval_dataset=eval_dataset,
        processing_class=tokenizer,
    )

    trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
    total = sum(p.numel() for p in model.parameters())

    print("Trainable parameters:", f"{trainable:,}", f"({100 * trainable / total:.2f}%)")
    print("Train/validation:", len(train_dataset), len(eval_dataset))
    print("Output:", OUTPUT_DIR)

    result = trainer.train()

    print("Final metrics:")
    print(result.metrics)

    trainer.save_model(str(OUTPUT_DIR))
    tokenizer.save_pretrained(str(OUTPUT_DIR))

    print("ORPO model saved to:", OUTPUT_DIR)


if __name__ == "__main__":
    main()
