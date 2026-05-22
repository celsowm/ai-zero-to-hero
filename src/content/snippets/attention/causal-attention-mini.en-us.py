import torch
import torch.nn.functional as F

tokens = ["We", "the", "people"]
q = torch.tensor([[1.0, 0.2], [0.1, 1.0], [0.8, 0.6]])
k = torch.tensor([[0.9, 0.1], [0.0, 1.1], [1.0, 0.4]])
v = torch.tensor([[1.0, 0.0], [0.0, 1.0], [1.0, 1.0]])
dk = q.shape[-1]

scores = q @ k.T / torch.sqrt(torch.tensor(dk))
causal_mask = torch.triu(torch.ones(3, 3), diagonal=1).bool()
scores = scores.masked_fill(causal_mask, float("-inf"))

query_index = tokens.index("people")
people_scores = scores[query_index]
weights = F.softmax(people_scores, dim=-1)
context = weights @ v

print(tokens)
print(weights.round(decimals=2))
print(context.round(decimals=2))
