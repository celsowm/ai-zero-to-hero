import torch
import torch.nn as nn

# Logits (raw output from a model)
logits = torch.tensor([2.0, 1.0, 0.1])

# Sigmoid: For binary classification (yes/no)
# Transforms each value independently to [0, 1]
sigmoid = nn.Sigmoid()
print(f"Sigmoid: {sigmoid(logits)}")

# Softmax: For multi-class classification
# Transforms the list into a distribution that sums to 1.0
softmax = nn.Softmax(dim=0)
probs = softmax(logits)
print(f"Softmax: {probs}")
print(f"Sum: {probs.sum():.1f}")
