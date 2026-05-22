import torch
import torch.nn as nn

# TODO: Use nn.Sequential para criar o modelo 'net'
# Camadas: Linear(4, 8) -> ReLU -> Linear(8, 1)
net = None

# O validador checará o número de parâmetros
param_count = sum(p.numel() for p in net.parameters()) if net else 0
