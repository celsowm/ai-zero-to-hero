import torch

# Scalar (0D)
scalar = torch.tensor(3.14)

# Vector (1D)
vector = torch.tensor([1.0, 2.0, 3.0, 4.0])

# Matrix (2D)
matrix = torch.zeros(3, 4)

# 3D Tensor
tensor3d = torch.randn(2, 3, 4)

# Vectorized operations
y = vector * 2 + 1  # broadcast automático
z = torch.matmul(matrix, matrix.T)

# Reshaping
batch = torch.randn(32, 3, 28, 28)  # 32 imagens RGB 28x28
flat = batch.view(32, -1)  # achat: 32 x 2352
