import torch
import torch.nn as nn
import torch.nn.functional as F

tokens = ["We", "the", "people"]
C = 4
x = torch.tensor([
    [1.0, 0.0, 0.2, 0.1],
    [0.0, 1.0, 0.1, 0.3],
    [0.7, 0.4, 1.0, 0.2],
])

c_attn = nn.Linear(C, 3 * C, bias=False)
q_weight = torch.eye(C)
k_weight = torch.tensor([
    [0.9, 0.0, 0.1, 0.2],
    [0.0, 1.1, 0.1, 0.0],
    [0.1, 0.0, 1.0, 0.2],
    [0.0, 0.2, 0.1, 1.0],
])
v_weight = torch.tensor([
    [1.0, 0.1, 0.0, 0.2],
    [0.0, 1.0, 0.3, 0.1],
    [0.2, 0.1, 1.0, 0.4],
    [0.0, 0.1, 0.2, 1.0],
])
with torch.no_grad():
    c_attn.weight.copy_(torch.cat([q_weight, k_weight, v_weight], dim=0))

qkv = c_attn(x)
q, k, v = qkv.split(C, dim=-1)

query_index = tokens.index("people")
scores = q[query_index] @ k.T / torch.sqrt(torch.tensor(C))
weights = F.softmax(scores, dim=-1)
context = weights @ v

print("x:", x.shape, "qkv:", qkv.shape)
print("q/k/v:", q.shape, k.shape, v.shape)
print("scores:", scores.round(decimals=2))
print("weights:", weights.round(decimals=2))
print("context:", context.round(decimals=2))
