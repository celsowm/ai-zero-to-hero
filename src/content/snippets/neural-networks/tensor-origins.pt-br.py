import torch

# Escalar (0D): um único número
loss = torch.tensor(0.42)

# Vetor (1D): lista de números
embedding = torch.tensor([0.2, -0.5, 0.8, -0.1])

# Matriz (2D): tabela — a mais comum em redes neurais
weights = torch.tensor([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]])

# Tensor 3D: sequência com batch [batch=2, posição=3, conteúdo=4]
sequence = torch.randn(2, 3, 4)

# Tensor 4D: batch de imagens [batch=2, canais=3, altura=28, largura=28]
batch = torch.randn(2, 3, 28, 28)

# Leitura explícita de shape para cada rank
print("loss.shape:", loss.shape)            # torch.Size([])
print("embedding.shape:", embedding.shape)  # torch.Size([4])
print("weights.shape:", weights.shape)      # torch.Size([3, 4])
print("sequence.shape:", sequence.shape)    # torch.Size([2, 3, 4])
print("batch.shape:", batch.shape)          # torch.Size([2, 3, 28, 28])

# ndim é a contagem de eixos em runtime, também chamada de rank
print("loss.ndim:", loss.ndim)              # 0
print("embedding.ndim:", embedding.ndim)    # 1
print("weights.ndim:", weights.ndim)        # 2
print("sequence.ndim:", sequence.ndim)      # 3
print("batch.ndim:", batch.ndim)            # 4
