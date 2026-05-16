import torch

# PyTorch GPU: Massive parallelism
device = "cuda" if torch.cuda.is_available() else "cpu"
size = 1_000_000

a = torch.ones(size).to(device)
b = (torch.ones(size) * 2).to(device)

# Executed in parallel by thousands of CUDA cores
c = a + b
