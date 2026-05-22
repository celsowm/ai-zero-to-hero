import torch

text = "We the people"
tokens = ["We", " the", " people"]
token_to_id = {"We": 1135, " the": 262, " people": 661}
ids = [token_to_id[token] for token in tokens]

idx = torch.tensor([ids], dtype=torch.long)
inputs = idx[:, :-1]
targets = idx[:, 1:]

print("text:", text)
print("tokens:", tokens)
print("idx shape:", tuple(idx.shape), idx.tolist())
print("inputs:", inputs.tolist())
print("targets:", targets.tolist())
