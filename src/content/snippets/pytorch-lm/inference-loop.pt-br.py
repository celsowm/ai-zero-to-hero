import torch
from torch import nn

# Modelo minusculo no estilo LM: embedding + linear que produz logits por token.
vocab_size, embed_dim = 32, 16
model = nn.Sequential(
    nn.Embedding(vocab_size, embed_dim),
    nn.Linear(embed_dim, vocab_size),
)

# Prefixo simulado de IDs de tokens (B=1, T=3).
context = torch.tensor([[5, 11, 7]])
eos_id = 0

# Modo inferencia: sem dropout, sem construir grafo.
model.eval()
with torch.no_grad():
    for _ in range(5):
        logits = model(context)            # (B, T, V)
        last = logits[:, -1, :]            # so a ultima posicao decide
        next_id = last.argmax(dim=-1, keepdim=True)
        context = torch.cat([context, next_id], dim=1)
        if next_id.item() == eos_id:
            break

print("gerado:", context.tolist())
