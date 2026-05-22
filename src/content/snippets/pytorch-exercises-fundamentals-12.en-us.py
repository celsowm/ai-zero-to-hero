import torch

# Evaluation point for autograd.
x = torch.tensor(3.0, requires_grad=True)

# TODO: Compute y = x**2, run backward, and save x.grad.item() in grad_val.
y = None
grad_val = None
