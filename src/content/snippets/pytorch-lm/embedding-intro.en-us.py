import torch
from torch import nn

# V = vocab size (number of tokens)
# C = embedding dimension (vector width per token)
V, C = 1000, 16
embedding = nn.Embedding(V, C)

# The embedding table is trainable — gradients flow through it
print("Embedding table shape:", embedding.weight.shape)
print("Requires grad:", embedding.weight.requires_grad)

# Lookup: each integer ID gets its row from the table
idx = torch.tensor([[10, 25, 42], [7, 8, 9]])
tok_vectors = embedding(idx)

print("idx shape:", idx.shape)            # (2, 3)
print("vec shape:", tok_vectors.shape)     # (2, 3, 16)
print("token 42 first dims:", tok_vectors[0, 2, :4])

# Internally: one-hot @ W without building the huge one-hot matrix
# One-hot of token 42 would be a 1000-element vector with a single 1
# Embedding just skips directly to indexing the 42nd row
