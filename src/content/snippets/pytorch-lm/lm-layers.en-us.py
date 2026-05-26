import torch
from torch import nn

class TinyStackedLM(nn.Module):
    def __init__(self, vocab_size: int, n_embd: int, num_layers: int) -> None:
        super().__init__()
        self.wte = nn.Embedding(vocab_size, n_embd)
        self.blocks = nn.ModuleList([
            nn.Sequential(
                nn.LayerNorm(n_embd),
                nn.Linear(n_embd, n_embd),
            )
            for _ in range(num_layers)
        ])
        self.lm_head = nn.Linear(n_embd, vocab_size)

    def forward(self, idx: torch.Tensor) -> torch.Tensor:
        x = self.wte(idx)
        for block in self.blocks:
            x = block(x)
        return self.lm_head(x)

model = TinyStackedLM(vocab_size=32, n_embd=16, num_layers=2)
idx = torch.tensor([[1, 4, 7], [2, 5, 9]], dtype=torch.long)
logits = model(idx)

print("idx:", idx.shape)
print("logits:", logits.shape)
