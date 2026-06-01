from transformers import AutoTokenizer

# Load a small chat model whose tokenizer ships with a chat_template.
MODEL = "Qwen/Qwen3.5-0.8B"
tokenizer = AutoTokenizer.from_pretrained(MODEL)

# A conversation as a list of typed messages — this is the canonical
# representation: role + content, in order.
messages = [
    {"role": "system", "content": "You are a concise assistant. Answer in one sentence."},
    {"role": "user", "content": "What is the capital of Brazil?"},
]

# 1) add_generation_prompt=False — render only what we have.
text_no_prompt = tokenizer.apply_chat_template(
    messages, tokenize=False, add_generation_prompt=False
)
print("--- WITHOUT generation prompt ---")
print(repr(text_no_prompt))

# 2) add_generation_prompt=True — append the assistant start marker
#    so the model knows it must continue as 'assistant'.
text_with_prompt = tokenizer.apply_chat_template(
    messages, tokenize=False, add_generation_prompt=True
)
print("\n--- WITH generation prompt ---")
print(repr(text_with_prompt))

# 3) tokenize=True — return input_ids ready to feed the model.
ids = tokenizer.apply_chat_template(
    messages, tokenize=True, add_generation_prompt=True
)
print("\nNumber of tokens:", len(ids))
