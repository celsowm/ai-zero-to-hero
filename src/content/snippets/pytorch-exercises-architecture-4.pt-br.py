import torch
import torch.nn as nn

# TODO: Crie uma rede que termina com Softmax(dim=-1)
# Dica: nn.Sequential(nn.Linear(2, 2), nn.Softmax(dim=-1))
net = None

test_input = torch.randn(1, 2)
probs = net(test_input) if net else torch.tensor([0.0])

# O validador checará se a soma é ~1.0
sums_to_one = torch.allclose(probs.sum(), torch.tensor(1.0), atol=1e-3)
