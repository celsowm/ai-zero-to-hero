from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("gpt2")

# Sem system prompt — resposta genérica
messages_no_system = [
    {"role": "user", "content": "O que é uma API?"}
]

# Com system prompt — resposta direcionada
messages_with_system = [
    {"role": "system", "content": "Você é um professor de computação. Use analogias simples."},
    {"role": "user", "content": "O que é uma API?"}
]

# ChatML sem system
text_no_system = tokenizer.apply_chat_template(
    messages_no_system, tokenize=False, add_generation_prompt=True
)
print("Sem system prompt:")
print(text_no_system)

# ChatML com system
text_with_system = tokenizer.apply_chat_template(
    messages_with_system, tokenize=False, add_generation_prompt=True
)
print("\nCom system prompt:")
print(text_with_system)
