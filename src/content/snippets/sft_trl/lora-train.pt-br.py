import os
from pathlib import Path

import torch
from datasets import load_dataset
from peft import LoraConfig
from transformers import AutoModelForCausalLM, AutoTokenizer
from trl import SFTConfig, SFTTrainer

MODEL_ID = "Qwen/Qwen3.5-0.8B"
DATASET_ID = "celsowm/valdoria-sft-qwen35-dataset"
# SFT_OUTPUT_ROOT permite salvar checkpoints em outro disco sem mudar o código.
OUTPUT_ROOT = Path(os.environ.get("SFT_OUTPUT_ROOT", "runs"))
OUTPUT_DIR = OUTPUT_ROOT / "sft-valdoria-qwen35-08b-lora"

dataset = load_dataset(DATASET_ID, split="train").shuffle(seed=42)
# Smoke test mais longo. Para treinar em todo o dataset, remova o select.
smoke_dataset = dataset.select(range(min(1024, len(dataset))))
# O dataset precisa expor "messages"; o SFTTrainer aplica o chat template.
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

peft_config = LoraConfig(
    r=32,
    lora_alpha=64,
    lora_dropout=0.03,
    bias="none",
    task_type="CAUSAL_LM",
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
)

args = SFTConfig(
    output_dir=str(OUTPUT_DIR),
    max_steps=220,
    per_device_train_batch_size=1,
    gradient_accumulation_steps=2,
    learning_rate=2e-4,
    max_length=512,
    bf16=True,
    gradient_checkpointing=True,
    assistant_only_loss=True,
    do_eval=True,
    eval_strategy="steps",
    eval_steps=20,
    logging_steps=20,
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
    peft_config=peft_config,
)

trainable = sum(p.numel() for p in trainer.model.parameters() if p.requires_grad)
total = sum(p.numel() for p in trainer.model.parameters())
print("Treinável:", f"{trainable:,}", f"({100 * trainable / total:.4f}%)")
print("Treino/validação:", len(train_dataset), len(eval_dataset))

result = trainer.train()
print("Métricas:", result.metrics)

trainer.save_model(str(OUTPUT_DIR))
tokenizer.save_pretrained(str(OUTPUT_DIR))
print("Adapter LoRA salvo em:", OUTPUT_DIR)
