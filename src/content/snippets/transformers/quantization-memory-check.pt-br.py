# Comparação rápida de VRAM para um modelo 7B:
# FP32: 28 GB  |  FP16: 14 GB  |  INT8: 7 GB  |  NF4: ~4 GB

from transformers import AutoModelForCausalLM
model = AutoModelForCausalLM.from_pretrained("gpt2")  # 124M → ~250MB FP32
print(f"Model size: {model.get_memory_footprint() / 1e6:.0f} MB")
