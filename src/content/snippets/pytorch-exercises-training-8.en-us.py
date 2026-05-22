import torch

# Gradient and limit
grad = torch.tensor([3.0, 4.0])
max_norm = 2.0

# 1. Compute current norm
current_norm = torch.norm(grad)

# TODO: If current_norm > max_norm, rescale grad into 'clipped_grad'
# Otherwise, just copy grad into 'clipped_grad'
clipped_grad = None
