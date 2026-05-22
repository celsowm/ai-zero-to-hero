import torch
import torch.nn as nn

# Um passo mínimo de treino precisa conectar loss -> backward -> step.
w = nn.Parameter(torch.tensor([1.0]))
target = torch.tensor([3.0])
optimizer = torch.optim.SGD([w], lr=0.1)

# TODO: zere gradientes, calcule loss MSE, rode backward e step.
# Modelo mínimo: pred = w.
# Depois salve w.item() em updated_w e w.grad.item() em grad_after_backward.
loss = None
updated_w = None
grad_after_backward = None
