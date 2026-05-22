import torch
import torch.nn as nn

# Um modelo com Dropout muda comportamento entre train() e eval().
torch.manual_seed(7)
model = nn.Sequential(
    nn.Linear(4, 4),
    nn.Dropout(p=0.9),
)
x = torch.ones(1, 4)

# TODO: coloque o modelo em modo de avaliação.
# Depois rode a inferência dentro de torch.no_grad().
# Salve a saída em 'out' e salve 'is_training' como model.training.
out = None
is_training = None
