import torch

# PyTorch GPU: Paralelismo massivo
device = "cuda" if torch.cuda.is_available() else "cpu"
size = 1_000_000

a = torch.ones(size).to(device)
b = (torch.ones(size) * 2).to(device)

# Executado em paralelo por milhares de núcleos CUDA
c = a + b
