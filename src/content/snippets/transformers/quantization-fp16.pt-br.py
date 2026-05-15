import torch
from transformers import AutoModelForCausalLM

# FP16 nativo — simples e direto
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-7b-hf",
    torch_dtype=torch.float16,
    device_map="auto",
)

# Verify
print(f"Dtype: {model.dtype}")  # torch.float16
print(f"VRAM: {model.get_memory_footprint() / 1e9:.1f} GB")  # ~14 GB
