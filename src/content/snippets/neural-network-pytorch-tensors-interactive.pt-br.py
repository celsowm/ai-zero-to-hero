import torch

# Escalar (0D)
scalar = torch.tensor(3.14)

# Vetor (1D)
vector = torch.tensor([1.0, 2.0, 3.0, 4.0])

# Matriz (2D)
matrix = torch.zeros(3, 4)

# Tensor 3D
tensor3d = torch.randn(2, 3, 4)

# Operações vetorizadas
y = vector * 2 + 1  # broadcast automático
z = torch.matmul(matrix, matrix.T)

# Reshaping
batch = torch.randn(32, 3, 28, 28)  # 32 imagens RGB 28x28
flat = batch.view(32, -1)  # achat: 32 x 2352
