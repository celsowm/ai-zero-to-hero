import torch

idx = torch.tensor([[87, 101, 32]], dtype=torch.long)

for _ in range(20):
    idx_cond = idx[:, -model.config.block_size :]
    logits, _ = model(idx_cond)
    next_token_logits = logits[:, -1, :]
    probs = torch.softmax(next_token_logits / 0.8, dim=-1)
    next_id = torch.multinomial(probs, num_samples=1)
    idx = torch.cat((idx, next_id), dim=1)
