import torch
import torch.nn as nn
import torch.nn.functional as F

# --- Quick comparison of activations ---
x = torch.tensor([-2.0, -1.0, 0.0, 1.0, 2.0])

# Sigmoid: compresses to [0, 1]
sigmoid_out = torch.sigmoid(x)
print("Sigmoid:", [round(v, 4) for v in sigmoid_out.tolist()])

# Tanh: compresses to [-1, 1]
tanh_out = torch.tanh(x)
print("Tanh:   ", [round(v, 4) for v in tanh_out.tolist()])

# ReLU: zeros negatives, keeps positives
relu_out = F.relu(x)
print("ReLU:   ", [round(v, 4) for v in relu_out.tolist()])

# GELU: smooth version of ReLU (used in Transformers)
gelu_out = F.gelu(x)
print("GELU:   ", [round(v, 4) for v in gelu_out.tolist()])

# Softmax: probability distribution (sum = 1)
logits = torch.tensor([2.0, 1.0, 0.1])
softmax_out = F.softmax(logits, dim=0)
print("Softmax:", [round(v, 4) for v in softmax_out.tolist()])
print("Softmax sum:", round(softmax_out.sum().item(), 4))  # 1.0

# --- How to use in a model ---
model = nn.Sequential(
    nn.Linear(10, 8),
    nn.ReLU(),       # modern activation for hidden layers
    nn.Linear(8, 3),
    # no activation here -> raw logits for CrossEntropyLoss
)
