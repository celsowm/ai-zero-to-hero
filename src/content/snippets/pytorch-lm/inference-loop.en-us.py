import torch
from torch import nn

# Tiny LM-style model: embedding + linear head producing per-token logits.
vocab_size, embed_dim = 32, 16
model = nn.Sequential(
    nn.Embedding(vocab_size, embed_dim),
    nn.Linear(embed_dim, vocab_size),
)

# Pretend prefix of token IDs (B=1, T=3).
context = torch.tensor([[5, 11, 7]])
eos_id = 0

# Switch to inference mode: no dropout, no graph building.
model.eval()
with torch.no_grad():
    for _ in range(5):
        logits = model(context)            # (B, T, V)
        last = logits[:, -1, :]            # only the last position matters
        next_id = last.argmax(dim=-1, keepdim=True)
        context = torch.cat([context, next_id], dim=1)
        if next_id.item() == eos_id:
            break

print("generated:", context.tolist())
