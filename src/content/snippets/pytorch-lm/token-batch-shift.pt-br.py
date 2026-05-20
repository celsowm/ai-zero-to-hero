import torch

idx = torch.tensor([[11, 42, 77, 9, 3], [5, 18, 6, 91, 2]], dtype=torch.long)

x = idx[:, :-1]
y = idx[:, 1:]

B, Tm1 = x.shape
V = 100
logits = torch.randn(B, Tm1, V)

logits_flat = logits.reshape(B * Tm1, V)
y_flat = y.reshape(B * Tm1)

print('idx:', idx.shape)
print('x:', x.shape)
print('y:', y.shape)
print('logits:', logits.shape)
print('logits_flat:', logits_flat.shape)
print('y_flat:', y_flat.shape)
