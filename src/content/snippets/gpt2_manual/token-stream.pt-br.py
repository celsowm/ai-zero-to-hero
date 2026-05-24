import torch


text = "we the people ..."
tokens = tokenizer.encode(text)
data = torch.tensor(tokens, dtype=torch.long)

print(data.shape)
print(data.dtype)
print(data.max().item())

assert data.dtype == torch.long
assert data.max().item() < config.vocab_size
