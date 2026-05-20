import torch
import torch.nn as nn
import torch.nn.functional as F

torch.manual_seed(0)
vocab_size = 8
x = torch.tensor([[0, 1, 2, 3], [3, 4, 5, 6]], dtype=torch.long)
y = torch.tensor([[1, 2, 3, 4], [4, 5, 6, 7]], dtype=torch.long)

model = nn.Sequential(nn.Embedding(vocab_size, 16), nn.Linear(16, vocab_size))
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-1)

for step in range(4):
    logits = model(x)
    loss = F.cross_entropy(logits.view(-1, vocab_size), y.view(-1))
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
    print(f"step={step} loss={loss.item():.4f}")

with torch.no_grad():
    next_logits = model(x[:1, -1:])
    probs = next_logits.softmax(dim=-1)
    pred = probs.argmax(dim=-1)

print("next_token_pred:", pred.item())
