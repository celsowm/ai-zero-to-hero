from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("gpt2")

text = "Hello, world! Ola mundo!"
tokens = tokenizer.tokenize(text)
ids = tokenizer.encode(text)
decoded = tokenizer.decode(ids)

print(f"Texto original: {text}")
print(f"Tokens: {tokens}")
print(f"Token IDs: {ids}")
print(f"Decodificado: {decoded}")
print()
print(f"Tamanho do vocabulario: {tokenizer.vocab_size}")
print(f"Tamanho maximo do modelo: {tokenizer.model_max_length}")
print(f"Tokens especiais: {tokenizer.all_special_tokens}")
print(f"IDs especiais: {tokenizer.all_special_ids}")
