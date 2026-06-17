import os
from pathlib import Path

import torch
from datasets import load_dataset
from transformers import AutoModelForCausalLM, AutoTokenizer
from trl import SFTConfig, SFTTrainer

MODEL_ID = "Qwen/Qwen3.5-0.8B"
DATASET_ID = "celsowm/valdoria-sft-qwen35-dataset"
OUTPUT_ROOT = Path(os.environ.get("SFT_OUTPUT_ROOT", "runs"))
OUTPUT_DIR = OUTPUT_ROOT / "sft-valdoria-qwen35-08b-full-smoke"

train_dataset = load_dataset(DATASET_ID, split="train").select(range(32))

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
    logging_steps=1,
    save_strategy="no",
    report_to="none",
    remove_unused_columns=False,
)

trainer = SFTTrainer(
    model=model,
    args=args,
    train_dataset=train_dataset,
    processing_class=tokenizer,
)

trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
print("Parâmetros treináveis:", f"{trainable:,}")

result = trainer.train()
print("Métricas:", result.metrics)

trainer.save_model(str(OUTPUT_DIR))
tokenizer.save_pretrained(str(OUTPUT_DIR))
print("Modelo completo salvo em:", OUTPUT_DIR)
