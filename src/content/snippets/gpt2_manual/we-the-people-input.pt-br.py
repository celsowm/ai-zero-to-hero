import torch

texto = "We the people"
tokens = ["We", " the", " people"]
token_para_id = {"We": 1135, " the": 262, " people": 661}
ids = [token_para_id[token] for token in tokens]

idx = torch.tensor([ids], dtype=torch.long)
entradas = idx[:, :-1]
alvos = idx[:, 1:]

print("texto:", texto)
print("tokens:", tokens)
print("shape idx:", tuple(idx.shape), idx.tolist())
print("entradas:", entradas.tolist())
print("alvos:", alvos.tolist())
