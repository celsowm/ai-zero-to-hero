import torch

batch = [
    [101, 2054, 2003, 1996, 102],
    [101, 2129, 2024, 2017, 102],
]

idx = torch.tensor(batch, dtype=torch.long)
x = idx[:, :-1]
y = idx[:, 1:]

print("idx:", idx.shape)
print("x:", x.shape)
print("y:", y.shape)
