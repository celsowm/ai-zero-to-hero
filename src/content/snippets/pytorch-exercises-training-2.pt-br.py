import torch

# Dados
pred = torch.tensor([0.5, 0.8])
target = torch.tensor([0.0, 1.0])
weights = torch.tensor([0.3, -0.4])
lambd = 0.1

# 1. Calcule o MSE em 'mse'
mse = torch.mean((pred - target)**2)

# TODO: Calcule a loss total (MSE + L2) em 'loss'
# L2 = lambd * sum(weights^2)
loss = None
