import torch
import torch.nn.functional as F
from torch import nn

torch.manual_seed(0)

text = "I like pytorch . I like AI ."
tokens = text.split()
vocab = sorted(set(tokens))
stoi = {token: i for i, token in enumerate(vocab)}
itos = {i: token for token, i in stoi.items()}

idx = torch.tensor([[stoi[token] for token in tokens]], dtype=torch.long)
x = idx[:, :-1]
y = idx[:, 1:]

class TinyBigramLM(nn.Module):
    def __init__(self, vocab_size: int, n_embd: int) -> None:
        super().__init__()
        self.wte = nn.Embedding(vocab_size, n_embd)
        self.lm_head = nn.Linear(n_embd, vocab_size)

    def forward(self, idx: torch.Tensor, targets: torch.Tensor | None = None):
        token_vectors = self.wte(idx)          # (B, T) -> (B, T, C)
        logits = self.lm_head(token_vectors)  # (B, T, C) -> (B, T, V)

        loss = None
        if targets is not None:
            B, T, V = logits.shape
            loss = F.cross_entropy(logits.reshape(B * T, V), targets.reshape(B * T))
        return logits, loss

    @torch.no_grad()
    def generate(self, idx: torch.Tensor, max_new_tokens: int) -> torch.Tensor:
        for _ in range(max_new_tokens):
            logits, _ = self(idx)
            next_logits = logits[:, -1, :]
            probs = F.softmax(next_logits, dim=-1)
            next_id = torch.multinomial(probs, num_samples=1)
            idx = torch.cat([idx, next_id], dim=1)
        return idx

model = TinyBigramLM(vocab_size=len(vocab), n_embd=8)
optimizer = torch.optim.AdamW(model.parameters(), lr=0.1)

_, loss_before = model(x, y)
for step in range(80):
    logits, loss = model(x, y)
    optimizer.zero_grad(set_to_none=True)
    loss.backward()
    optimizer.step()

_, loss_after = model(x, y)
prompt = torch.tensor([[stoi["I"]]], dtype=torch.long)
generated = model.generate(prompt, max_new_tokens=6)

print("loss before:", round(loss_before.item(), 4))
print("loss after:", round(loss_after.item(), 4))
print("generated:", " ".join(itos[i] for i in generated[0].tolist()))
