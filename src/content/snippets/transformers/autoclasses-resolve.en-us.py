from transformers import AutoModel, AutoTokenizer, AutoConfig, pipeline

# AutoModel automatically resolves the correct class
model_name = "gpt2"

# The main trio
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)
config = AutoConfig.from_pretrained(model_name)

print(f"Model class: {model.__class__.__name__}")
print(f"Config: {config.model_type}")

# High-level pipeline for quick usage
generator = pipeline("text-generation", model=model_name)
result = generator("Once upon a time", max_new_tokens=20)
print(result[0]["generated_text"])
