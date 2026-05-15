import torch
import torch.nn as nn

# Test tensor with varying values
z = torch.tensor([-2.0, -0.5, 0.0, 0.5, 2.0])

# ReLU: The gold standard for hidden layers
# Cuts negatives (zero) and keeps positives
relu = nn.ReLU()
print(f"ReLU: {relu(z)}")

# GELU: The standard for Transformers (GPT/BERT)
# Smooth, allows small gradients for negative values near zero
gelu = nn.GELU()
print(f"GELU: {gelu(z)}")
