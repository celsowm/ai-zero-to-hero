import torch
import torch.nn as nn

# One minimal training step must connect loss -> backward -> step.
w = nn.Parameter(torch.tensor([1.0]))
target = torch.tensor([3.0])
optimizer = torch.optim.SGD([w], lr=0.1)

# TODO: zero gradients, compute MSE loss, run backward and step.
# Minimal model: pred = w.
# Then save w.item() in updated_w and w.grad.item() in grad_after_backward.
loss = None
updated_w = None
grad_after_backward = None
