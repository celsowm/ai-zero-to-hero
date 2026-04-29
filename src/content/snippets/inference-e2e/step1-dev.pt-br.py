from transformers import AutoModel, AutoTokenizer
import torch

# Step 1: Dev setup — carregar modelo e tokenizer com AutoModel
# device_map="auto" coloca o modelo na GPU se disponível
model_name = "gpt2"

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name, device_map="auto")

# Preparar entrada e fazer inferência
texto = "O futuro da tecnologia é"
inputs = tokenizer(texto, return_tensors="pt").to(model.device)

with torch.no_grad():
    outputs = model(**inputs)
    # last_hidden_state: (batch, seq_len, hidden_size)
    print("Shape da saída:", outputs.last_hidden_state.shape)
