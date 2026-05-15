from transformers import AutoModelForCausalLM, BitsAndBytesConfig

# INT8 com detecção automática de outliers
bnb_config = BitsAndBytesConfig(
    load_in_8bit=True,
    llm_int8_threshold=6.0,  # colunas com |valor| > 6σ ficam em FP16
)

model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-7b-hf",
    quantization_config=bnb_config,
    device_map="auto",
)
print(f"VRAM: ~7 GB para 7B model")
