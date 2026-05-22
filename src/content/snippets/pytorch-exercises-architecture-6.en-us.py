import torch
import torch.nn as nn

# TODO: Use nn.Sequential to create 'net' model
# Layers: Linear(4, 8) -> ReLU -> Linear(8, 1)
net = None

# Validator checks parameter count
param_count = sum(p.numel() for p in net.parameters()) if net else 0
