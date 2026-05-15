from transformers import AutoModelForCausalLM, BitsAndBytesConfig, pipeline
import torch

# Compare formats in practice
formats = [
    ("FP16", None),
    ("NF4", BitsAndBytesConfig(load_in_4bit=True,
                               bnb_4bit_quant_type="nf4",
                               bnb_4bit_use_double_quant=True)),
]

prompt = "Explain what machine learning is"

for name, config in formats:
    model = AutoModelForCausalLM.from_pretrained(
        "gpt2",
        quantization_config=config,
        torch_dtype=torch.float16 if config is None else None,
        device_map="auto",
    )
    gen = pipeline("text-generation", model=model, tokenizer="gpt2")
    print(f"\n--- {name} ---")
    print(gen(prompt, max_new_tokens=30)[0]["generated_text"])
