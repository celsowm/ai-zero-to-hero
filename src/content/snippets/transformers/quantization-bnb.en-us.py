from transformers import AutoModelForCausalLM, BitsAndBytesConfig, AutoTokenizer
import torch

model_id = "meta-llama/Llama-2-7b-hf"

# Configuration for 4-bit quantization (NF4)
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16,
)

tokenizer = AutoTokenizer.from_pretrained(model_id)

# Load quantized model (~4GB VRAM for 7B)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    quantization_config=bnb_config,
    device_map="auto",
)

# Memory comparison:
# FP32: 28 GB | FP16: 14 GB | INT8: 7 GB | NF4: ~4 GB
print(f"Model device: {model.device}")
print(f"Memory footprint: ~4GB (NF4)")

# Normal generation with quantized model
inputs = tokenizer("What is the capital of France?", return_tensors="pt").to("cuda")
outputs = model.generate(**inputs, max_new_tokens=50)
print(tokenizer.decode(outputs[0], skip_special_tokens=True))
