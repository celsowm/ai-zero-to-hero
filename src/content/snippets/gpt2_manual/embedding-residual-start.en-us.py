import torch
from torch import nn

idx = torch.tensor([[1135, 262, 661]], dtype=torch.long)
B, T = idx.shape
C = 4
positions = torch.arange(T)

wte = nn.Embedding(2048, C)
wpe = nn.Embedding(16, C)
with torch.no_grad():
    wte.weight.zero_()
    wpe.weight.zero_()
    wte.weight[1135] = torch.tensor([1.0, 0.2, 0.0, 0.1])
    wte.weight[262] = torch.tensor([0.1, 1.0, 0.3, 0.0])
    wte.weight[661] = torch.tensor([0.7, 0.4, 1.0, 0.2])
    wpe.weight[:T] = torch.tensor([
        [0.0, 0.0, 0.0, 0.0],
        [0.1, 0.0, 0.0, 0.2],
        [0.2, 0.1, 0.0, 0.3],
    ])

token_vectors = wte(idx)
position_vectors = wpe(positions)[None, :, :]
x = token_vectors + position_vectors

print("idx:", tuple(idx.shape))
print("token vectors:", tuple(token_vectors.shape))
print("position vectors:", tuple(position_vectors.shape))
print("residual start x:", tuple(x.shape))
