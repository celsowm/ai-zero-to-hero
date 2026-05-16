import torch

# PyTorch CPU: Optimized kernel
size = 1_000_000
a = torch.ones(size)
b = torch.ones(size) * 2

# Dispatcher chooses the best kernel (MKL/OpenMP)
c = a + b
