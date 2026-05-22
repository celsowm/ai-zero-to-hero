import torch

# Evaluation point
x = torch.tensor(3.0, requires_grad=True)

# 1. Compute y = x^2
y = x**2

# 2. Call backward
y.backward()

# TODO: Save numeric value of x.grad into 'grad_val'
# Hint: use .item()
grad_val = None
