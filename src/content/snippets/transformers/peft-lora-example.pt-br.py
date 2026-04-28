from transformers import AutoModelForCausalLM, TrainingArguments, Trainer
from peft import LoraConfig, get_peft_model, TaskType

# Carregar modelo base
model = AutoModelForCausalLM.from_pretrained("gpt2")

# Configurar LoRA
lora_config = LoraConfig(
    task_type=TaskType.CAUSAL_LM,
    r=8,              # rank da decomposição
    lora_alpha=32,    # scaling factor
    lora_dropout=0.1,
    target_modules=["c_attn"],  # camadas de atenção no GPT-2
)

# Aplicar PEFT ao modelo
model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# trainable params: 0.06% of total

# Configurar treinamento
training_args = TrainingArguments(
    output_dir="./gpt2-lora",
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,
    learning_rate=1e-4,
    fp16=True,
    max_steps=500,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset,
    data_collator=data_collator,
)

trainer.train()
model.save_pretrained("./gpt2-lora-finetuned")
