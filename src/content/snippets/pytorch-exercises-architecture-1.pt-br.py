import torch
import torch.nn as nn

# TODO: Defina a classe SimpleMLP herdando de nn.Module
class SimpleMLP:
    pass

# Instancie o modelo em 'model'
model = None

# O validador verificará estas variáveis:
is_module = isinstance(model, nn.Module)
in_features = getattr(getattr(model, 'linear', None), 'in_features', 0) if is_module else 0
