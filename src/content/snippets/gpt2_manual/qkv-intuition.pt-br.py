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
peso_q = torch.eye(C)
peso_k = torch.tensor([
    [0.9, 0.0, 0.1, 0.2],
    [0.0, 1.1, 0.1, 0.0],
    [0.1, 0.0, 1.0, 0.2],
    [0.0, 0.2, 0.1, 1.0],
])
peso_v = torch.tensor([
    [1.0, 0.1, 0.0, 0.2],
    [0.0, 1.0, 0.3, 0.1],
    [0.2, 0.1, 1.0, 0.4],
    [0.0, 0.1, 0.2, 1.0],
])
with torch.no_grad():
    c_attn.weight.copy_(torch.cat([peso_q, peso_k, peso_v], dim=0))

qkv = c_attn(x)
q, k, v = qkv.split(C, dim=-1)

indice_query = tokens.index("people")
scores = q[indice_query] @ k.T / torch.sqrt(torch.tensor(C))
pesos = F.softmax(scores, dim=-1)
contexto = pesos @ v

print("x:", x.shape, "qkv:", qkv.shape)
print("q/k/v:", q.shape, k.shape, v.shape)
print("scores:", scores.round(decimals=2))
print("pesos:", pesos.round(decimals=2))
print("contexto:", contexto.round(decimals=2))
