import torch

# Parâmetro w
w = torch.tensor(1.0, requires_grad=True)
values = [2.0, 3.0, 1.5]

# TODO: Para cada item em values, calcule loss = w e chame .backward()
# O objetivo é acumular 1.0 no gradiente de w a cada passo

# Salve o valor final do gradiente em 'final_grad'
final_grad = w.grad
