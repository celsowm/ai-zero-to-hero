import torch

# PyTorch CPU: Kernel otimizado
size = 1_000_000
a = torch.ones(size)
b = torch.ones(size) * 2

# Dispatcher escolhe o melhor kernel (MKL/OpenMP)
c = a + b
