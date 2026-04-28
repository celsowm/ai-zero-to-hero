from transformers import AutoModelForCausalLM, AutoTokenizer
from huggingface_hub import login

# Fazer login no Hub (necessário para push)
login()  # ou: huggingface-cli login

model_name = "gpt2-finetuned-pt"
model = AutoModelForCausalLM.from_pretrained("./meu-modelo")
tokenizer = AutoTokenizer.from_pretrained("./meu-modelo")

# Push para o Hub
repo_id = f"seu-username/{model_name}"
model.push_to_hub(repo_id)
tokenizer.push_to_hub(repo_id)

# O modelo agora está disponível em:
# https://huggingface.co/seu-username/gpt2-finetuned-pt

# Outros podem usar diretamente:
# from transformers import pipeline
# gen = pipeline("text-generation", model="seu-username/gpt2-finetuned-pt")
