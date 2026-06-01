from transformers import AutoModelForCausalLM

model_id = "Qwen/Qwen3.5-0.8B"

# FP32: cada peso ocupa 4 bytes.
model_fp32 = AutoModelForCausalLM.from_pretrained(model_id, device_map="auto")
print(f"FP32: {model_fp32.get_memory_footprint() / 1e9:.2f} GB")

# Quantizar reduz quantos bits cada peso usa (16, 8 ou 4).
# O modelo resultante cabe na mesma GPU em uma fração do espaço.
# FP16 ≈ 1.6 GB  |  INT8 ≈ 0.8 GB  |  NF4 ≈ 0.4 GB
