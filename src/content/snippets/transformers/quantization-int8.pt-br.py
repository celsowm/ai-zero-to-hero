from transformers import AutoModelForCausalLM, BitsAndBytesConfig

model_id = "Qwen/Qwen3.5-0.8B"

# INT8: 1 byte por peso. llm.int8() detecta outliers e os mantém em FP16.
bnb_config = BitsAndBytesConfig(
    load_in_8bit=True,
    llm_int8_threshold=6.0,
)

model = AutoModelForCausalLM.from_pretrained(
    model_id,
    quantization_config=bnb_config,
    device_map="auto",
)
print(f"VRAM: {model.get_memory_footprint() / 1e9:.2f} GB")
