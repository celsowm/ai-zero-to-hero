import torch

# Duas sequências com 5 posições cada: shape (B=2, T=5).
tokens = torch.tensor([
    [10, 11, 12, 13, 14],
    [20, 21, 22, 23, 24],
], dtype=torch.long)

# TODO: Crie x e y para treino de próximo token.
# x: todas as posições exceto a última.
# y: todas as posições exceto a primeira.
x = None
y = None
