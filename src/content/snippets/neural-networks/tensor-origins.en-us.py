import torch

# Scalar (0D): a single number
loss = torch.tensor(0.42)

# Vector (1D): list of numbers
embedding = torch.tensor([0.2, -0.5, 0.8, -0.1])

# Matrix (2D): table — most common in neural networks
weights = torch.tensor([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])

# 3D tensor: sequence with batch [batch=2, position=3, content=4]
sequence = torch.randn(2, 3, 4)

# 4D tensor: image batch [batch=2, channels=3, height=28, width=28]
batch = torch.randn(2, 3, 28, 28)

# Explicit shape reading for each rank
print("loss.shape:", loss.shape)            # torch.Size([])
print("embedding.shape:", embedding.shape)  # torch.Size([4])
print("weights.shape:", weights.shape)      # torch.Size([3, 4])
print("sequence.shape:", sequence.shape)    # torch.Size([2, 3, 4])
print("batch.shape:", batch.shape)          # torch.Size([2, 3, 28, 28])
