import torch
import torch.nn as nn

# Tiny language model: idx (B,T) -> H (B,T,C) -> logits (B,T,V).
B, T, V, C = 2, 3, 11, 4
idx = torch.tensor([
    [1, 2, 3],
    [4, 5, 6],
], dtype=torch.long)

class TinyLM(nn.Module):
    def __init__(self):
        super().__init__()
        # TODO: create self.wte as nn.Embedding(V, C).
        self.wte = None
        # TODO: create self.lm_head as nn.Linear(C, V).
        self.lm_head = None

    def forward(self, idx):
        # TODO: apply embedding and then lm_head.
        H = None
        logits = None
        return logits

model = TinyLM()
logits = model(idx)

# Validator checks these contracts.
logits_shape = list(logits.shape) if logits is not None else []
is_module = isinstance(model, nn.Module)
