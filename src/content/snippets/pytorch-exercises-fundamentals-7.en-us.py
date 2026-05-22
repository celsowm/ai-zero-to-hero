import torch

# Two sequences with 5 positions each: shape (B=2, T=5).
tokens = torch.tensor([
    [10, 11, 12, 13, 14],
    [20, 21, 22, 23, 24],
], dtype=torch.long)

# TODO: Create x and y for next-token training.
# x: all positions except the last one.
# y: all positions except the first one.
x = None
y = None
