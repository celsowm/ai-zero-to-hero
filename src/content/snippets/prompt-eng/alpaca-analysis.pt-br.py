# Análise de padrões do dataset Alpaca (52K instruções)
import json

# Exemplo de entrada do Alpaca
alpaca_sample = {
    "instruction": "Classify the following list of animals into mammals and reptiles.",
    "input": "dog, lizard, cat, snake, whale, turtle",
    "output": "Mammals: dog, cat, whale\nReptiles: lizard, snake, turtle"
}

# Análise de padrões encontrados nos 52K prompts
patterns = {
    "instruções verbais diretas": "Classify, Explain, List, Write",
    "contexto explícito": "Given the following..., Based on...",
    "formato de saída especificado": "as a list, in JSON format, as a table",
    "restrições claras": "in 3 sentences, under 100 words, with examples"
}

print("=== Padrões do Dataset Alpaca (52K) ===")
for i, (pattern, desc) in enumerate(patterns.items(), 1):
    print(f"{i}. {pattern}: {desc}")
print(f"\nExemplo Alpaca:")
print(f"Instruction: {alpaca_sample['instruction']}")
print(f"Input: {alpaca_sample['input']}")
print(f"Output: {alpaca_sample['output']}")
