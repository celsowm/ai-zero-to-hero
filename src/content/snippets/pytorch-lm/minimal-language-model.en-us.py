import torch
import torch.nn.functional as F
from torch import nn

class TinyLM(nn.Module):
    def __init__(self, vocab_size: int, n_embd: int) -> None:
        super().__init__()
        self.wte = nn.Embedding(vocab_size, n_embd)
        self.lm_head = nn.Linear(n_embd, vocab_size)

    def forward(self, idx: torch.Tensor, targets: torch.Tensor | None = None):
        logits = self.lm_head(self.wte(idx))
        loss = None if targets is None else F.cross_entropy(logits.view(-1, logits.size(-1)), targets.view(-1))
        return logits, loss
