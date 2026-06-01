from transformers import AutoModelForCausalLM, BitsAndBytesConfig, AutoTokenizer
import torch

model_id = "Qwen/Qwen3.5-0.8B"

# NF4: 4 bits por peso. Os 16 níveis seguem os quantiles de uma N(0,1).
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_use_double_quant=True,
    bnb_4bit_compute_dtype=torch.float16,
)

tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    quantization_config=bnb_config,
    device_map="auto",
)
print(f"VRAM: {model.get_memory_footprint() / 1e9:.2f} GB")

# Inferência funciona normalmente com o modelo quantizado.
inputs = tokenizer("O que é quantização?", return_tensors="pt").to(model.device)
outputs = model.generate(**inputs, max_new_tokens=30)
print(tokenizer.decode(outputs[0], skip_special_tokens=True))
