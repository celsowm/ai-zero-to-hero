import torch
import torch.nn.functional as F

tokens = ["We", "the", "people"]
q = torch.tensor([[1.0, 0.2], [0.1, 1.0], [0.8, 0.6]])
k = torch.tensor([[0.9, 0.1], [0.0, 1.1], [1.0, 0.4]])
v = torch.tensor([[1.0, 0.0], [0.0, 1.0], [1.0, 1.0]])
dk = q.shape[-1]

attention_logits = q @ k.T / torch.sqrt(torch.tensor(dk))
mascara_causal = torch.triu(torch.ones(3, 3), diagonal=1).bool()
attention_logits = attention_logits.masked_fill(mascara_causal, float("-inf"))

indice_query = tokens.index("people")
people_attention_logits = attention_logits[indice_query]
attention_weights = F.softmax(people_attention_logits, dim=-1)
contexto = attention_weights @ v

print(tokens)
print(attention_weights.round(decimals=2))
print(contexto.round(decimals=2))
