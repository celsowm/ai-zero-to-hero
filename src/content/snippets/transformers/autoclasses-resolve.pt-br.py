from transformers import AutoModel, AutoTokenizer, AutoConfig, pipeline

# AutoModel resolve automaticamente a classe correta
model_name = "gpt2"

# A tríade principal
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name)
config = AutoConfig.from_pretrained(model_name)

print(f"Model class: {model.__class__.__name__}")
print(f"Config: {config.model_type}")

# Pipeline de alto nível para uso rápido
generator = pipeline("text-generation", model=model_name)
result = generator("Era uma vez", max_new_tokens=20)
print(result[0]["generated_text"])
