from transformers import pipeline

# Pipeline básica de geração de texto
# A função pipeline() abstrai modelo, tokenizer e loop de geração
gerador = pipeline("text-generation", model="gpt2")

# Gera texto a partir de um prompt
resultado = gerador("Uma vez, há muito tempo,", max_length=50, do_sample=True)
print(resultado[0]["generated_text"])
