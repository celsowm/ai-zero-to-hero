import torch

# Temporal logits: shape (B=2, T=2, V=2).
logits = torch.tensor([
    [[1.0, 0.1], [0.2, 0.8]],
    [[0.5, 0.5], [0.9, 0.1]],
])

# Temporal targets: shape (B=2, T=2).
targets = torch.tensor([
    [0, 1],
    [1, 0],
], dtype=torch.long)

# TODO: Flatten logits to (B*T, V) and targets to (B*T).
B, T, V = logits.shape
flat_logits = None
flat_targets = None
