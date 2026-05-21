import torch
from torch import nn

# V = tamanho do vocabulário (quantos tokens)
# C = dimensão do embedding (largura vetorial por token)
V, C = 1000, 16
embedding = nn.Embedding(V, C)

# A tabela de embedding é treinável — gradientes passam por ela
print("Shape da tabela de embedding:", embedding.weight.shape)
print("Requer gradiente:", embedding.weight.requires_grad)

# Lookup: cada ID inteiro pega sua linha da tabela
idx = torch.tensor([[10, 25, 42], [7, 8, 9]])
tok_vectors = embedding(idx)

print("Shape de idx:", idx.shape)            # (2, 3)
print("Shape dos vetores:", tok_vectors.shape)  # (2, 3, 16)
print("Token 42 primeiras dims:", tok_vectors[0, 2, :4])

# Internamente: one-hot @ W sem construir a matriz one-hot gigante
# One-hot do token 42 seria um vetor de 1000 elementos com um único 1
# Embedding simplesmente indexa direto a 42ª linha
