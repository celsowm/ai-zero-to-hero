import torch

# Logits temporais: shape (B=2, T=2, V=2).
logits = torch.tensor([
    [[1.0, 0.1], [0.2, 0.8]],
    [[0.5, 0.5], [0.9, 0.1]],
])

# Targets temporais: shape (B=2, T=2).
targets = torch.tensor([
    [0, 1],
    [1, 0],
], dtype=torch.long)

# TODO: Achate logits para (B*T, V) e targets para (B*T).
B, T, V = logits.shape
flat_logits = None
flat_targets = None
