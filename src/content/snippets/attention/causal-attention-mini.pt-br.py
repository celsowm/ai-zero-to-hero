import torch
import torch.nn.functional as F

tokens = ["We", "the", "people"]
q = torch.tensor([[1.0, 0.2], [0.1, 1.0], [0.8, 0.6]])
k = torch.tensor([[0.9, 0.1], [0.0, 1.1], [1.0, 0.4]])
v = torch.tensor([[1.0, 0.0], [0.0, 1.0], [1.0, 1.0]])
dk = q.shape[-1]

scores = q @ k.T / torch.sqrt(torch.tensor(dk))
mascara_causal = torch.triu(torch.ones(3, 3), diagonal=1).bool()
scores = scores.masked_fill(mascara_causal, float("-inf"))

indice_query = tokens.index("people")
scores_people = scores[indice_query]
pesos = F.softmax(scores_people, dim=-1)
contexto = pesos @ v

print(tokens)
print(pesos.round(decimals=2))
print(contexto.round(decimals=2))
