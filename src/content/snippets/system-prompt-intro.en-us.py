from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("gpt2")

# Without system prompt — generic response
messages_no_system = [
    {"role": "user", "content": "What is an API?"}
]

# With system prompt — directed response
messages_with_system = [
    {"role": "system", "content": "You are a computer science teacher. Use simple analogies."},
    {"role": "user", "content": "What is an API?"}
]

# ChatML without system
text_no_system = tokenizer.apply_chat_template(
    messages_no_system, tokenize=False, add_generation_prompt=True
)
print("Without system prompt:")
print(text_no_system)

# ChatML with system
text_with_system = tokenizer.apply_chat_template(
    messages_with_system, tokenize=False, add_generation_prompt=True
)
print("\nWith system prompt:")
print(text_with_system)
