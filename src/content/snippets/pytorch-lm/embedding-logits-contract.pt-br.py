import torch
import torch.nn.functional as F
from torch import nn

B, T, C, V = 2, 4, 8, 100
embedding = nn.Embedding(V, C)
out_proj = nn.Linear(C, V)

idx = torch.randint(0, V, (B, T), dtype=torch.long)
targets = torch.randint(0, V, (B, T), dtype=torch.long)

H = embedding(idx)
logits = out_proj(H)

logits_flat = logits.reshape(B * T, V)
targets_flat = targets.reshape(B * T)

loss = F.cross_entropy(logits_flat, targets_flat)

next_token_scores = logits[:, -1, :]

print('H:', H.shape)
print('logits:', logits.shape)
print('flat:', logits_flat.shape, targets_flat.shape)
print('next:', next_token_scores.shape)
print('loss:', loss.shape)
