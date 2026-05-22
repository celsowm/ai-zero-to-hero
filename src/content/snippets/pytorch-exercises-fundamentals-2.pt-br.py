import torch

# Batch de tokens (B=2, T=4)
tokens = torch.tensor([[1, 2, 3, 4], [5, 6, 7, 8]])

# TODO: Crie 'x' contendo todas as posições exceto a última de cada linha
# Dica: use fatiamento [:, :-1]
x = None
