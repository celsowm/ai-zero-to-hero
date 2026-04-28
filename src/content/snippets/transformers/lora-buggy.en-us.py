from transformers import AutoModelForCausalLM, TrainingArguments, Trainer
from peft import LoraConfig, get_peft_model, TaskType

model = AutoModelForCausalLM.from_pretrained("gpt2")

# BUG 1: wrong target_modules — "c_proj" is not the attention layer in GPT-2
# Hint: GPT-2 uses "c_attn" for QKV, not "c_proj" (which is attention output)
lora_config = LoraConfig(
    task_type=TaskType.CAUSAL_LM,
    r=2,               # BUG 2: rank too low — 2 is insufficient for learning
    lora_alpha=16,
    lora_dropout=0.05,
    target_modules=["c_proj"],  # ← WRONG!
)

model = get_peft_model(model, lora_config)

# BUG 3: learning rate too high for LoRA — will diverge
training_args = TrainingArguments(
    output_dir="./gpt2-lora",
    learning_rate=5e-3,  # ← too high! LoRA needs ~1e-4
    per_device_train_batch_size=2,
    max_steps=200,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset,
)

trainer.train()
# Result: loss doesn't converge, generated text is garbage
