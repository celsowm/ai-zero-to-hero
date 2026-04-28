from transformers import (
    AutoModelForCausalLM,
    TrainingArguments,
    Trainer,
    TrainerCallback,
)

model = AutoModelForCausalLM.from_pretrained("gpt2")

# TrainingArguments — o que cada parâmetro faz
training_args = TrainingArguments(
    output_dir="./gpt2-finetuned",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,   # efetivamente batch_size=16
    learning_rate=2e-5,
    weight_decay=0.01,
    warmup_ratio=0.05,
    fp16=True,                        # mixed precision
    eval_strategy="steps",            # avaliar a cada N steps
    eval_steps=100,
    save_strategy="epoch",
    logging_steps=10,
    max_grad_norm=1.0,                # gradient clipping
)

# Callback customizado para monitorar loss
class LossMonitorCallback(TrainerCallback):
    def on_log(self, args, state, control, logs=None, **kwargs):
        if logs and "loss" in logs:
            print(f"Step {state.global_step}: loss={logs['loss']:.3f}")

# Trainer — o que acontece por dentro
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=eval_dataset,
    data_collator=data_collator,
    callbacks=[LossMonitorCallback()],
)

# O Trainer esconde: loop de treino, gradient clipping, logging, saving
trainer.train()
