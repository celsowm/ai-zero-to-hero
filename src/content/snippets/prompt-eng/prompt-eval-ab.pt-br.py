# Avaliação A/B de prompts
import json

# Prompt A: curto
prompt_a = "Resuma este texto: {text}"

# Prompt B: estruturado
prompt_b = """Resuma o texto abaixo em exatamente 3 parágrafos:
1. Ideia principal
2. Pontos de apoio
3. Conclusão

Texto: {text}"""

# Simula métricas de avaliação
results = {
    "prompt_a": {"accuracy": 72, "format_score": 45, "avg_length": 85},
    "prompt_b": {"accuracy": 88, "format_score": 92, "avg_length": 120},
}

print("=== Avaliação A/B de Prompts ===")
print(f"{'Métrica':<15} | {'Prompt A':<10} | {'Prompt B':<10}")
print("-" * 40)
for metric in ["accuracy", "format_score", "avg_length"]:
    print(f"{metric:<15} | {results['prompt_a'][metric]:<10} | {results['prompt_b'][metric]:<10}")
print(f"\nVencedor: Prompt B (melhor em accuracy e format_score)")
