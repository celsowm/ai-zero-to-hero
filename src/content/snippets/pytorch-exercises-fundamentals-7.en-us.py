import torch

# Temporal logits (B=2, T=2, V=2)
logits = torch.tensor([[[1.0, 0.1], [0.2, 0.8]], [[0.5, 0.5], [0.9, 0.1]]])

# TODO: Flatten B and T axes into one for Cross-Entropy format (4, 2)
# Use .view() and save into 'flat_logits'
flat_logits = None
