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
attention_logits = q[indice_query] @ k.T / torch.sqrt(torch.tensor(C))
attention_weights = F.softmax(attention_logits, dim=-1)
contexto = attention_weights @ v

print("x:", x.shape, "qkv:", qkv.shape)
print("q/k/v:", q.shape, k.shape, v.shape)
print("attention_logits:", attention_logits.round(decimals=2))
print("attention_weights:", attention_weights.round(decimals=2))
print("contexto:", contexto.round(decimals=2))
