import torch
from torch import nn

idx = torch.tensor([[87, 101, 32, 116]], dtype=torch.long)
positions = torch.arange(idx.size(1), device=idx.device)

token_embedding = nn.Embedding(257, 64)
position_embedding = nn.Embedding(32, 64)

x = token_embedding(idx) + position_embedding(positions)[None, :, :]
print(x.shape)  # (B, T, C)
