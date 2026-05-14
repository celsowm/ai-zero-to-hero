import torch
import torch.nn as nn
import torch.nn.functional as F

# --- Comparacao rapida de ativacoes ---
x = torch.tensor([-2.0, -1.0, 0.0, 1.0, 2.0])

# Sigmoid: comprime para [0, 1]
sigmoid_out = torch.sigmoid(x)
print("Sigmoid:", [round(v, 4) for v in sigmoid_out.tolist()])

# Tanh: comprime para [-1, 1]
tanh_out = torch.tanh(x)
print("Tanh:   ", [round(v, 4) for v in tanh_out.tolist()])

# ReLU: zera negativos, mantem positivos
relu_out = F.relu(x)
print("ReLU:   ", [round(v, 4) for v in relu_out.tolist()])

# GELU: versao suave da ReLU (usada em Transformers)
gelu_out = F.gelu(x)
print("GELU:   ", [round(v, 4) for v in gelu_out.tolist()])

# Softmax: distribuicao de probabilidades (soma = 1)
logits = torch.tensor([2.0, 1.0, 0.1])
softmax_out = F.softmax(logits, dim=0)
print("Softmax:", [round(v, 4) for v in softmax_out.tolist()])
print("Soma softmax:", round(softmax_out.sum().item(), 4))  # 1.0

# --- Como usar em um modelo ---
model = nn.Sequential(
    nn.Linear(10, 8),
    nn.ReLU(),       # ativacao moderna para camadas intermediarias
    nn.Linear(8, 3),
    # sem ativacao aqui -> logits crus para CrossEntropyLoss
)
