import torch

# Data
pred = torch.tensor([0.5, 0.8])
target = torch.tensor([0.0, 1.0])
weights = torch.tensor([0.3, -0.4])
lambd = 0.1

# 1. Compute MSE in 'mse'
mse = torch.mean((pred - target)**2)

# TODO: Compute total loss (MSE + L2) in 'loss'
# L2 = lambd * sum(weights^2)
loss = None
