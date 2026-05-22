import torch
import torch.nn.functional as F

B, T, C, V = 2, 4, 8, 50  # C = hidden size (features da representação de cada token)

idx = torch.randint(0, V, (B, T), dtype=torch.long)
targets = torch.randint(0, V, (B, T), dtype=torch.long)
hidden = torch.randn(B, T, C)
logits = torch.randn(B, T, V)

flat_logits = logits.view(B * T, V)
flat_targets = targets.view(B * T)
loss = F.cross_entropy(flat_logits, flat_targets)

print("idx:", idx.shape, idx.dtype, idx.device)
print("targets:", targets.shape, targets.dtype, targets.device)
print("hidden:", hidden.shape, hidden.dtype, hidden.device)
print("logits:", logits.shape, logits.dtype, logits.device)
print("flat_logits:", flat_logits.shape)
print("flat_targets:", flat_targets.shape)
print("loss:", loss.shape)
