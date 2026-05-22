import torch

# Ponto de avaliação
x = torch.tensor(3.0, requires_grad=True)

# 1. Calcule y = x^2
y = x**2

# 2. Chame o backward
y.backward()

# TODO: Salve o valor numérico de x.grad em 'grad_val'
# Dica: use .item()
grad_val = None
