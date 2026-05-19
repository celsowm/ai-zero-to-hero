import torch
from torch import nn

V, C = 1000, 16
embedding = nn.Embedding(V, C)

idx = torch.tensor([[10, 25, 42], [7, 8, 9]])
tok_vectors = embedding(idx)

print("idx shape:", idx.shape)
print("vec shape:", tok_vectors.shape)
print("token 42 first dims:", tok_vectors[0, 2, :4])
