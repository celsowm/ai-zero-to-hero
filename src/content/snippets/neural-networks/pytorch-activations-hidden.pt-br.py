import torch
import torch.nn as nn

# Tensor de teste com valores variados
z = torch.tensor([-2.0, -0.5, 0.0, 0.5, 2.0])

# ReLU: O padrão ouro para camadas ocultas
# Corta negativos (zero) e mantém positivos
relu = nn.ReLU()
print(f"ReLU: {relu(z)}")

# GELU: O padrão para Transformers (GPT/BERT)
# Suave, permite gradientes pequenos em valores negativos próximos de zero
gelu = nn.GELU()
print(f"GELU: {gelu(z)}")
