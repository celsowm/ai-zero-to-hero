import torch
import torch.nn.functional as F

tokens = ["We", "the", "people"]
q = torch.tensor([[1.0, 0.2], [0.1, 1.0], [0.8, 0.6]])
k = torch.tensor([[0.9, 0.1], [0.0, 1.1], [1.0, 0.4]])
v = torch.tensor([[1.0, 0.0], [0.0, 1.0], [1.0, 1.0]])
dk = q.shape[-1]

attention_logits = q @ k.T / torch.sqrt(torch.tensor(dk))
causal_mask = torch.triu(torch.ones(3, 3), diagonal=1).bool()
attention_logits = attention_logits.masked_fill(causal_mask, float("-inf"))

query_index = tokens.index("people")
people_attention_logits = attention_logits[query_index]
attention_weights = F.softmax(people_attention_logits, dim=-1)
context = attention_weights @ v

print(tokens)
print(attention_weights.round(decimals=2))
print(context.round(decimals=2))
