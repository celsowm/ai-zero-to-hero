from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("gpt2")

text = "Hello, world! Ola mundo!"
tokens = tokenizer.tokenize(text)
ids = tokenizer.encode(text)
decoded = tokenizer.decode(ids)

print(f"Original text: {text}")
print(f"Tokens: {tokens}")
print(f"Token IDs: {ids}")
print(f"Decoded: {decoded}")
print()
print(f"Vocabulary size: {tokenizer.vocab_size}")
print(f"Model max length: {tokenizer.model_max_length}")
print(f"Special tokens: {tokenizer.all_special_tokens}")
print(f"Special IDs: {tokenizer.all_special_ids}")
