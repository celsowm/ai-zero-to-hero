import torch

# Escalar (0D): um único número
loss = torch.tensor(0.42)

# Vetor (1D): lista de números
embedding = torch.tensor([0.2, -0.5, 0.8])

# Matriz (2D): tabela — a mais comum em redes neurais
weights = torch.tensor([[1, 2], [3, 4]])

# Tensor 4D: batch de imagens [batch=2, canais=3, altura=28, largura=28]
batch = torch.randn(2, 3, 28, 28)
