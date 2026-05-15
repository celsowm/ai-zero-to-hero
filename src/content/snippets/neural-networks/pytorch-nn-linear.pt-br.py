import torch.nn as nn
import torch

# Criando uma única camada
camada = nn.Linear(in_features=4, out_features=3)

# Pesos e bias são parâmetros que requerem gradiente
print(camada.weight.shape) # torch.Size([3, 4])
print(camada.bias.shape)   # torch.Size([3])

# Agrupando em uma rede completa
model = nn.Sequential(
    nn.Linear(4, 3),
    nn.ReLU(),
    nn.Linear(3, 1),
    nn.Sigmoid()
)
