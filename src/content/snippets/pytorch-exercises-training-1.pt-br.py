import torch

# Dados
x = torch.tensor([1.0, 2.0])
w = torch.tensor([[0.5, 0.5], [1.0, -1.0]])
b = torch.tensor([0.0, 0.0])

# 1. Projeção linear: x @ w.T + b
logits = x @ w.t() + b

# TODO: Calcule Softmax no último eixo e salve em 'probs'
probs = None
