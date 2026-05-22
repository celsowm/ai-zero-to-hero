import torch

# Logits de exemplo
logits = torch.tensor([1.0, 4.5, 0.7, 2.2, 3.8])
k = 3

# 1. Encontre o valor de corte (cutoff) usando torch.topk
# cutoff deve ser o menor valor entre os top-k
cutoff = torch.topk(logits, k).values[-1]

# TODO: Crie 'filtered' como uma cópia de logits. 
# Substitua todos os valores menores que o cutoff por float("-inf")
filtered = None
