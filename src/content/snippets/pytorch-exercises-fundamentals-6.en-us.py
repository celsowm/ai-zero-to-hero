import torch

# Token batch (B=2, T=4)
tokens = torch.tensor([[1, 2, 3, 4], [5, 6, 7, 8]])

# TODO: Create 'x' containing all positions except the last one of each row
# Hint: use [:, :-1] slicing
x = None
