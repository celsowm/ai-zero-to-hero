import torch

# Data
x = torch.tensor([1.0, 2.0])
w = torch.tensor([[0.5, 0.5], [1.0, -1.0]])
b = torch.tensor([0.0, 0.0])

# 1. Linear projection: x @ w.T + b
logits = x @ w.t() + b

# TODO: Compute Softmax on last axis and save in 'probs'
probs = None
