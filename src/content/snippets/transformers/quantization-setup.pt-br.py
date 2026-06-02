# Instale os três pacotes necessários
# pip install transformers>=4.40 bitsandbytes>=0.43 accelerate>=0.27

import torch
from transformers import AutoModelForCausalLM

# 1. Verificar GPU
print("GPU disponível:", torch.cuda.is_available())
if torch.cuda.is_available():
    print("VRAM total:", round(torch.cuda.get_device_properties(0).total_memory / 1e9, 1), "GB")

# 2. Carregar modelo base (FP32) para medir o baseline de memória
model_id = "Qwen/Qwen3-0.6B"
model = AutoModelForCausalLM.from_pretrained(model_id, device_map="auto")
baseline_gb = model.get_memory_footprint() / 1e9
print(f"Baseline FP32: {baseline_gb:.2f} GB")

# 3. Verificar bitsandbytes
import bitsandbytes as bnb
print("bitsandbytes:", bnb.__version__)
