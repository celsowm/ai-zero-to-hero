from transformers import AutoModelForCausalLM, BitsAndBytesConfig

# INT8 with automatic outlier detection
bnb_config = BitsAndBytesConfig(
    load_in_8bit=True,
    llm_int8_threshold=6.0,  # columns with |value| > 6σ stay in FP16
)

model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-7b-hf",
    quantization_config=bnb_config,
    device_map="auto",
)
print(f"VRAM: ~7 GB for 7B model")
