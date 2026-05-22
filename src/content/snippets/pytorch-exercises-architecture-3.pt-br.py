import torch
import torch.nn as nn

# Mini modelo de linguagem: idx (B,T) -> H (B,T,C) -> logits (B,T,V).
B, T, V, C = 2, 3, 11, 4
idx = torch.tensor([
    [1, 2, 3],
    [4, 5, 6],
], dtype=torch.long)

class TinyLM(nn.Module):
    def __init__(self):
        super().__init__()
        # TODO: crie self.wte como nn.Embedding(V, C).
        self.wte = None
        # TODO: crie self.lm_head como nn.Linear(C, V).
        self.lm_head = None

    def forward(self, idx):
        # TODO: aplique embedding e depois lm_head.
        H = None
        logits = None
        return logits

model = TinyLM()
logits = model(idx)

# O validador checará estes contratos.
logits_shape = list(logits.shape) if logits is not None else []
is_module = isinstance(model, nn.Module)
