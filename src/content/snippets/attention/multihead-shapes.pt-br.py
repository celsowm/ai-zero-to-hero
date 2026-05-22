import torch
import torch.nn.functional as F

B, T, C = 2, 3, 768
H = 12
D = C // H
x = torch.randn(B, T, C)

qkv = torch.randn(B, T, 3 * C)
q, k, v = qkv.split(C, dim=-1)

q = q.view(B, T, H, D).transpose(1, 2)
k = k.view(B, T, H, D).transpose(1, 2)
v = v.view(B, T, H, D).transpose(1, 2)

y = F.scaled_dot_product_attention(q, k, v, is_causal=True)
y = y.transpose(1, 2).contiguous().view(B, T, C)

print("entrada:", x.shape)
print("por head:", q.shape)
print("saída:", y.shape)
