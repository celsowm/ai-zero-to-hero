import torch

# Gradiente e limite
grad = torch.tensor([3.0, 4.0])
max_norm = 2.0

# 1. Calcule a norma atual
current_norm = torch.norm(grad)

# TODO: Se current_norm > max_norm, reescale grad em 'clipped_grad'
# Caso contrário, apenas copie grad para 'clipped_grad'
clipped_grad = None
