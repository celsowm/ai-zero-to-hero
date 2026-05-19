import torch
from torch import nn

B, T, C, V = 2, 4, 8, 1000

embedding = nn.Embedding(V, C)
head = nn.Linear(C, V)

idx = torch.randint(0, V, (B, T))
x = embedding(idx)
logits = head(x)

print("emb:", x.shape)
print("logits:", logits.shape)
