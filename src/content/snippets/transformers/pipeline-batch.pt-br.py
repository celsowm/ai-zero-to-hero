from transformers import pipeline

# Pipeline com batch inference — processa múltiplos prompts de uma vez
# Isso é mais eficiente que chamar o modelo individualmente para cada texto
gerador = pipeline("text-generation", model="gpt2", batch_size=4)

# Lista de prompts para processar em batch
prompts = [
    "O sol nascia no horizonte quando",
    "A tecnologia moderna permite que",
    "No futuro, os computadores poderão",
    "A ciência dos dados revelou que",
]

# Execução em batch — retorna lista de resultados na mesma ordem
resultados = gerador(prompts, max_length=40, do_sample=True)

for prompt, res in zip(prompts, resultados):
    print(f"Prompt: {prompt}")
    print(f"  → {res[0]['generated_text']}")
    print()
