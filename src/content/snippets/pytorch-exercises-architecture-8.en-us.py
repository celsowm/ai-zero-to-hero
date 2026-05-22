import torch
import torch.nn as nn

# TODO: Create a network ending with Softmax(dim=-1)
# Hint: nn.Sequential(nn.Linear(2, 2), nn.Softmax(dim=-1))
net = None

test_input = torch.randn(1, 2)
probs = net(test_input) if net else torch.tensor([0.0])

# Validator checks if sum is ~1.0
sums_to_one = torch.allclose(probs.sum(), torch.tensor(1.0), atol=1e-3)
