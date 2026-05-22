import torch

B, T, C, V = 2, 4, 8, 50
device = "cpu"

idx = torch.tensor([
    [10, 11, 12, 13],
    [20, 21, 22, 23],
], dtype=torch.long, device=device)
targets = torch.tensor([
    [11, 12, 13, 14],
    [21, 22, 23, 24],
], dtype=torch.long, device=device)

hidden = torch.randn(B, T, C, dtype=torch.float32, device=device)
logits = torch.randn(B, T, V, dtype=torch.float32, device=device)

idx_as_float = idx.float()
idx_roundtrip = idx_as_float.long()

print("idx:", idx.dtype, idx.shape, idx.device)
print("targets:", targets.dtype, targets.shape, targets.device)
print("hidden:", hidden.dtype, hidden.shape, hidden.device)
print("logits:", logits.dtype, logits.shape, logits.device)
print("roundtrip:", idx_as_float.dtype, "->", idx_roundtrip.dtype)
