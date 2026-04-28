from transformers import AutoModelForCausalLM, TrainingArguments, Trainer
from peft import LoraConfig, get_peft_model, TaskType

model = AutoModelForCausalLM.from_pretrained("gpt2")

# BUG 1: target_modules errado — "c_proj" não é a camada de atenção no GPT-2
# Dica: o GPT-2 usa "c_attn" para QKV, não "c_proj" (que é saída da atenção)
lora_config = LoraConfig(
    task_type=TaskType.CAUSAL_LM,
    r=2,               # BUG 2: rank muito baixo — 2 é insuficiente para aprender
    lora_alpha=16,
    lora_dropout=0.05,
    target_modules=["c_proj"],  # ← ERRADO!
)

model = get_peft_model(model, lora_config)

# BUG 3: learning rate muito alto para LoRA — vai divergir
training_args = TrainingArguments(
    output_dir="./gpt2-lora",
    learning_rate=5e-3,  # ← muito alto! LoRA precisa de ~1e-4
    per_device_train_batch_size=2,
    max_steps=200,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset,
)

trainer.train()
# Resultado: loss não converge, texto gerado é lixo
