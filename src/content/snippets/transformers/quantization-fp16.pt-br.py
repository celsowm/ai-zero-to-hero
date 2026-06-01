import torch
from transformers import AutoModelForCausalLM

model_id = "Qwen/Qwen3.5-0.8B"

# FP16: 2 bytes por peso. Metade da memória, perda mínima de qualidade.
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    torch_dtype=torch.float16,
    device_map="auto",
)

# Inspecionamos o dtype e o uso real de memória.
print(f"Dtype: {model.dtype}")
print(f"VRAM: {model.get_memory_footprint() / 1e9:.2f} GB")
