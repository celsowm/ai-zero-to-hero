import torch
import torch.nn as nn

# Contrato: entrada (B, T, C) e saída (B, T, V).
B, T, C, V = 2, 3, 4, 5
x = torch.randn(B, T, C)

# TODO: crie uma camada Linear que projeta C -> V.
projection = None

# TODO: aplique a camada em x para obter logits.
logits = None

# O validador checará estes contratos.
logits_shape = list(logits.shape) if logits is not None else []
weight_shape = list(projection.weight.shape) if projection is not None else []
