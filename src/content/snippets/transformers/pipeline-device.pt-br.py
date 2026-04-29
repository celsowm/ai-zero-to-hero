from transformers import pipeline
import torch

# Pipeline com device_map="auto" para usar GPU automaticamente
# Se houver GPU disponível, o modelo é carregado nela; senão, usa CPU
gerador = pipeline(
    "text-generation",
    model="gpt2",
    device_map="auto",
)

# Geração aproveitando aceleração GPU
resultado = gerador(
    "O futuro da inteligência artificial",
    max_length=60,
    do_sample=True,
    temperature=0.8,
)
print(resultado[0]["generated_text"])
