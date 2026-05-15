import torch.nn as nn
import torch

# Creating a single layer
layer = nn.Linear(in_features=4, out_features=3)

# Weights and bias are parameters that require gradients
print(layer.weight.shape) # torch.Size([3, 4])
print(layer.bias.shape)   # torch.Size([3])

# Grouping into a full network
model = nn.Sequential(
    nn.Linear(4, 3),
    nn.ReLU(),
    nn.Linear(3, 1),
    nn.Sigmoid()
)
