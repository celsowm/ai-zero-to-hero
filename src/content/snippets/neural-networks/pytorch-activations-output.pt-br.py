import torch
import torch.nn as nn

# Logits (saída bruta de um modelo)
logits = torch.tensor([2.0, 1.0, 0.1])

# Sigmoid: Para classificação binária (sim/não)
# Transforma cada valor independentemente para [0, 1]
sigmoid = nn.Sigmoid()
print(f"Sigmoid: {sigmoid(logits)}")

# Softmax: Para classificação multi-classe
# Transforma a lista em uma distribuição que soma 1.0
softmax = nn.Softmax(dim=0)
probs = softmax(logits)
print(f"Softmax: {probs}")
print(f"Soma: {probs.sum():.1f}")
