import torch

B, T, C = 2, 4, 8

token_ids = torch.tensor([
    [10, 11, 12, 13],
    [20, 21, 22, 23],
], dtype=torch.long)

hidden_states = torch.randn(B, T, C)
logits = torch.randn(B, T, 50)

print(token_ids.shape)     # (B, T)
print(hidden_states.shape) # (B, T, C)
print(logits.shape)        # (B, T, V)
