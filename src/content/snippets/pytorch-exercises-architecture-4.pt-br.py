import torch
import torch.nn as nn

# Esqueleto recorrente: entrada, corpo repetido e saída.
V, C, num_layers = 20, 8, 3

# TODO: crie um ModuleDict chamado 'transformer' com:
# - 'wte': nn.Embedding(V, C)
# - 'blocks': nn.ModuleList com num_layers blocos, cada bloco sendo nn.Sequential(
#       nn.LayerNorm(C),
#       nn.Linear(C, C),
#       nn.Dropout(0.1),
#   )
# - 'lm_head': nn.Linear(C, V)
transformer = None

# O validador checará o esqueleto.
is_module_dict = isinstance(transformer, nn.ModuleDict)
num_blocks = len(transformer['blocks']) if is_module_dict and 'blocks' in transformer else 0
has_lm_head = isinstance(transformer.get('lm_head') if is_module_dict else None, nn.Linear)
