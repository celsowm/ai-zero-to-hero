# @region validation
import torch

# 1. Verifica disponibilidade de aceleração
cuda_disponivel = torch.cuda.is_available()
mps_disponivel = hasattr(torch.backends, "mps") and torch.backends.mps.is_available()

# 2. Define o dispositivo de execução (Device)
# Prioridade: NVIDIA (CUDA) -> Apple (MPS) -> Processador (CPU)
if cuda_disponivel:
    device = "cuda"
elif mps_disponivel:
    device = "mps"
else:
    device = "cpu"

# 3. Cria um tensor diretamente no hardware escolhido
# Isso evita o gargalo de transferir dados da CPU para a GPU depois
x = torch.tensor([1.0, 2.0, 3.0], device=device)

print(f"Hardware em uso: {device.upper()}")
print(f"Resultado do cálculo: {x * 2}")
# @end
