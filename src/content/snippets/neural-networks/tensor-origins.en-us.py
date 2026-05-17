import torch

# Scalar (0D): a single number
loss = torch.tensor(0.42)

# Vector (1D): list of numbers
embedding = torch.tensor([0.2, -0.5, 0.8])

# Matrix (2D): table — most common in neural networks
weights = torch.tensor([[1, 2], [3, 4]])

# 4D tensor: image batch [batch=2, channels=3, height=28, width=28]
batch = torch.randn(2, 3, 28, 28)
