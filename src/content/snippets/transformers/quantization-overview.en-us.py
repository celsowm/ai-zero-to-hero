from transformers import AutoModelForCausalLM

model_id = "Qwen/Qwen3.5-0.8B"

# FP32: each weight takes 4 bytes.
model_fp32 = AutoModelForCausalLM.from_pretrained(model_id, device_map="auto")
print(f"FP32: {model_fp32.get_memory_footprint() / 1e9:.2f} GB")

# Quantization reduces how many bits each weight uses (16, 8, or 4).
# The resulting model fits in the same GPU at a fraction of the space.
# FP16 ≈ 1.6 GB  |  INT8 ≈ 0.8 GB  |  NF4 ≈ 0.4 GB
