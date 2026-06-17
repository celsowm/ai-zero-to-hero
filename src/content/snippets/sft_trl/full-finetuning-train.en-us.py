import os
from pathlib import Path

import torch
from datasets import load_dataset
from transformers import AutoModelForCausalLM, AutoTokenizer
from trl import SFTConfig, SFTTrainer

MODEL_ID = "Qwen/Qwen3.5-0.8B"
DATASET_ID = "celsowm/valdoria-sft-qwen35-dataset"
# SFT_OUTPUT_ROOT can save checkpoints to another drive without code changes.
OUTPUT_ROOT = Path(os.environ.get("SFT_OUTPUT_ROOT", "runs"))
OUTPUT_DIR = OUTPUT_ROOT / "sft-valdoria-qwen35-08b-full-smoke"

dataset = load_dataset(DATASET_ID, split="train").shuffle(seed=42)
# Smoke test: small cut for class. To use everything, remove the select.
smoke_dataset = dataset.select(range(min(32, len(dataset))))
# For another dataset, keep a chat-template-compatible "messages" column.
splits = smoke_dataset.train_test_split(test_size=0.1, seed=42)
train_dataset = splits["train"]
eval_dataset = splits["test"]

tokenizer = AutoTokenizer.from_pretrained(MODEL_ID)
if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token

model = AutoModelForCausalLM.from_pretrained(
    MODEL_ID,
    dtype=torch.bfloat16,
    device_map="cuda",
)
model.config.use_cache = False
model.gradient_checkpointing_enable()

args = SFTConfig(
    output_dir=str(OUTPUT_DIR),
    max_steps=5,
    per_device_train_batch_size=1,
    gradient_accumulation_steps=1,
    learning_rate=1e-5,
    max_length=512,
    bf16=True,
    gradient_checkpointing=True,
    assistant_only_loss=True,
    do_eval=True,
    eval_strategy="steps",
    eval_steps=1,
    logging_steps=1,
    save_strategy="no",
    report_to="none",
    remove_unused_columns=False,
)

trainer = SFTTrainer(
    model=model,
    args=args,
    train_dataset=train_dataset,
    eval_dataset=eval_dataset,
    processing_class=tokenizer,
)

trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
print("Trainable parameters:", f"{trainable:,}")
print("Train/eval rows:", len(train_dataset), len(eval_dataset))

result = trainer.train()
print("Metrics:", result.metrics)

trainer.save_model(str(OUTPUT_DIR))
tokenizer.save_pretrained(str(OUTPUT_DIR))
print("Full model saved to:", OUTPUT_DIR)
