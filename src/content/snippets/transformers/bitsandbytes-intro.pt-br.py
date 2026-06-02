import torch
import bitsandbytes as bnb

# Verificar que bitsandbytes encontrou CUDA
print(f"bitsandbytes: {bnb.__version__}")
print(f"CUDA disponível: {torch.cuda.is_available()}")

# O que bitsandbytes oferece:
# 1. Operadores INT8 para inferência (llm.int8())
# 2. Operadores NF4 para inferência (QLoRA)
# 3. Otimizadores 8-bit (Adam, SGD) para treino eficiente

# BitsAndBytesConfig é importada via transformers, não via bnb diretamente:
from transformers import BitsAndBytesConfig

# Config INT8 — bitsandbytes faz o resto dentro do from_pretrained
cfg_int8 = BitsAndBytesConfig(load_in_8bit=True)

# Config NF4 — o padrão recomendado para inferência
cfg_nf4 = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_use_double_quant=True,
    bnb_4bit_compute_dtype=torch.float16,
)

print("Configs criadas. Prontos para quantizar.")
