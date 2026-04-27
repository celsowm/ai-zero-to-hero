# Uma nova pergunta para o modelo, já no formato de lista de dicionários
prompt_messages = [
    {"role": "system", "content": "Você é um assistente prestativo."},
    {"role": "user", "content": "Qual é a capital do Brasil?"}
]

# Aplicamos o template ChatML, mas ATENÇÃO:
# add_generation_prompt=True faz o tokenizer adicionar '<|im_start|>assistant' no final
prompt_text = tokenizer.apply_chat_template(
    prompt_messages,
    tokenize=False,
    add_generation_prompt=True
)

inputs = tokenizer(prompt_text, return_tensors="pt").to(model.device)

# Geramos a resposta
outputs = model.generate(
    **inputs,
    max_new_tokens=20,
    do_sample=False,  # Sem aleatoriedade, queremos a resposta exata
    pad_token_id=tokenizer.eos_token_id
)

response = tokenizer.decode(outputs[0], skip_special_tokens=False)

print("\\n--- RESPOSTA DO ASSISTENTE ---")
print(response)
print("------------------------------")
