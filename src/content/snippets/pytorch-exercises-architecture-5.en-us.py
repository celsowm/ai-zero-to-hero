import torch
import torch.nn as nn

# Contract: input (B, T, C) and output (B, T, V).
B, T, C, V = 2, 3, 4, 5
x = torch.randn(B, T, C)

# TODO: create a Linear layer that projects C -> V.
projection = None

# TODO: apply the layer to x to get logits.
logits = None

# Validator checks these contracts.
logits_shape = list(logits.shape) if logits is not None else []
weight_shape = list(projection.weight.shape) if projection is not None else []
