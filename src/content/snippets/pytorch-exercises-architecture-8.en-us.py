import torch
import torch.nn as nn

# Recurring skeleton: entry, repeated body, and output.
V, C, num_layers = 20, 8, 3

# TODO: create a ModuleDict called 'transformer' with:
# - 'wte': nn.Embedding(V, C)
# - 'blocks': nn.ModuleList with num_layers blocks, each block being nn.Sequential(
#       nn.LayerNorm(C),
#       nn.Linear(C, C),
#       nn.Dropout(0.1),
#   )
# - 'lm_head': nn.Linear(C, V)
transformer = None

# Validator checks the skeleton.
is_module_dict = isinstance(transformer, nn.ModuleDict)
num_blocks = len(transformer['blocks']) if is_module_dict and 'blocks' in transformer else 0
has_lm_head = isinstance(transformer.get('lm_head') if is_module_dict else None, nn.Linear)
