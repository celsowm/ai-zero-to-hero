from transformers import AutoModelForCausalLM, TrainingArguments, Trainer

# Carregando o modelo pré-treinado
model_name = "gpt2"
model = AutoModelForCausalLM.from_pretrained(model_name)

# Precisamos ajustar o tamanho dos embeddings pois adicionamos
# tokens novos (<|im_start|>, <|im_end|>) no tokenizador anteriormente
model.resize_token_embeddings(len(tokenizer))

# Parâmetros de treinamento
training_args = TrainingArguments(
    output_dir="./sft_output",
    num_train_epochs=30,      # Treinamos bastante para ele decorar este exemplo simples
    per_device_train_batch_size=2,
    logging_steps=5,
    learning_rate=5e-4,
    save_strategy="no",       # Para este exemplo não salvaremos checkpoints
    report_to="none"          # Desabilita integrações externas de logging
)

# O Trainer facilita o loop de treinamento
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset,
)

print("Iniciando Treinamento SFT...")
trainer.train()
