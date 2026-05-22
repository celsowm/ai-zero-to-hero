import torch

# Parameter w
w = torch.tensor(1.0, requires_grad=True)
values = [2.0, 3.0, 1.5]

# TODO: For each item in values, compute loss = w and call .backward()
# Goal is to accumulate 1.0 into w.grad each step

# Save final gradient value in 'final_grad'
final_grad = w.grad
