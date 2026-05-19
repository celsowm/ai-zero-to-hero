import torch
from torch import nn

X = torch.tensor([[52.0, 14.0, 210.0]])

model = nn.Sequential(
    nn.Linear(3, 8),
    nn.Sigmoid(),
    nn.Linear(8, 1),
)

with torch.no_grad():
    y_hat = model(X)

print("prediction:", float(y_hat.item()))
