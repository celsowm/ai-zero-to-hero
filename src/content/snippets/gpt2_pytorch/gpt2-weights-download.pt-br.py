# 1. Instalar dependências
# pip install transformers torch safetensors

from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch
from safetensors.torch import save_file
import os

# 2. Baixar modelo e tokenizer do HuggingFace Hub
MODEL_NAME = "gpt2"
print(f"Baixando {MODEL_NAME} do HuggingFace Hub...")
tokenizer = GPT2Tokenizer.from_pretrained(MODEL_NAME)
model = GPT2LMHeadModel.from_pretrained(MODEL_NAME)
model.eval()

# 3. Inspect — ver os shapes de cada tensor
print(f"Total de parâmetros: {model.num_parameters():,}")
print("State dict keys:")
for k, v in model.state_dict().items():
    print(f"  {k:50s} {tuple(v.shape)}")

# 4. Salvar em formato PyTorch (.pt)
OUTPUT_PT = "gpt2_weights.pt"
torch.save(model.state_dict(), OUTPUT_PT)
print(f"Salvo {OUTPUT_PT} ({os.path.getsize(OUTPUT_PT) / 1e6:.0f}MB)")

# 5. (Opcional) Salvar em .safetensors — mais seguro e rápido
OUTPUT_SF = "gpt2_weights.safetensors"
save_file(model.state_dict(), OUTPUT_SF)
print(f"Salvo {OUTPUT_SF} ({os.path.getsize(OUTPUT_SF) / 1e6:.0f}MB)")

# 6. Verificar — carregar de volta
loaded = torch.load(OUTPUT_PT, weights_only=True)
assert loaded.keys() == model.state_dict().keys()
print("Verificado: pesos carregados com sucesso!")
