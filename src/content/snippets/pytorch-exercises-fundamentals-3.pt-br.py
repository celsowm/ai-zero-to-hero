import torch

# Logits temporais (B=2, T=2, V=2)
logits = torch.tensor([[[1.0, 0.1], [0.2, 0.8]], [[0.5, 0.5], [0.9, 0.1]]])

# TODO: Achate os eixos B e T em um só para o formato da Cross-Entropy (4, 2)
# Use .view() e salve em 'flat_logits'
flat_logits = None
