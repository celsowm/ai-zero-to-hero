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


def main() -> None:
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)
    set_seed(SEED)
    torch.backends.cuda.matmul.allow_tf32 = True

    dataset = load_dataset(DATASET_ID)
    if "validation" in dataset:
        train_dataset = dataset["train"]
        eval_dataset = dataset["validation"]
    elif "test" in dataset:
        train_dataset = dataset["train"]
        eval_dataset = dataset["test"]
    else:
        splits = dataset["train"].shuffle(seed=SEED).train_test_split(test_size=0.1, seed=SEED)
        train_dataset = splits["train"]
        eval_dataset = splits["test"]

    tokenizer = AutoTokenizer.from_pretrained(MODEL_ID, trust_remote_code=True)
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token
    tokenizer.padding_side = "right"

    model = AutoModelForCausalLM.from_pretrained(
        MODEL_ID,
        dtype=torch.bfloat16 if torch.cuda.is_available() else torch.float32,
        trust_remote_code=True,
    )
    model.config.use_cache = False
    model.gradient_checkpointing_enable()

    args = SFTConfig(
        output_dir=str(OUTPUT_DIR),
        num_train_epochs=3,
        max_steps=-1,
        per_device_train_batch_size=16,
        per_device_eval_batch_size=16,
        auto_find_batch_size=True,
        gradient_accumulation_steps=1,
        learning_rate=1.5e-5,
        warmup_steps=10,
        weight_decay=0.01,
        lr_scheduler_type="cosine",
        optim="adamw_bnb_8bit",
        max_length=1024,
        bf16=torch.cuda.is_available() and torch.cuda.is_bf16_supported(),
        fp16=torch.cuda.is_available() and not torch.cuda.is_bf16_supported(),
        gradient_checkpointing=True,
        assistant_only_loss=True,
        loss_type="nll",
        do_train=True,
        do_eval=True,
        eval_strategy="steps",
        eval_steps=50,
        logging_steps=50,
        save_strategy="steps",
        save_steps=50,
        save_total_limit=2,
        load_best_model_at_end=True,
        metric_for_best_model="eval_loss",
        greater_is_better=False,
        report_to="none",
        remove_unused_columns=False,
        seed=SEED,
        data_seed=SEED,
        tf32=True,
        use_cache=False,
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
    print("Trainable parameters:", f"{trainable:,}", f"({100 * trainable / total:.2f}%)")
    print("Train/eval rows:", len(train_dataset), len(eval_dataset))

    result = trainer.train()
    print("Metrics:", result.metrics)

    trainer.save_model(str(OUTPUT_DIR))
    tokenizer.save_pretrained(str(OUTPUT_DIR))
    print("Full model saved to:", OUTPUT_DIR)


if __name__ == "__main__":
    main()
