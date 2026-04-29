# Analysis of Alpaca dataset patterns (52K instructions)
import json

# Sample Alpaca entry
alpaca_sample = {
    "instruction": "Classify the following list of animals into mammals and reptiles.",
    "input": "dog, lizard, cat, snake, whale, turtle",
    "output": "Mammals: dog, cat, whale\nReptiles: lizard, snake, turtle"
}

# Analysis of patterns found in the 52K prompts
patterns = {
    "direct verbal instructions": "Classify, Explain, List, Write",
    "explicit context": "Given the following..., Based on...",
    "specified output format": "as a list, in JSON format, as a table",
    "clear constraints": "in 3 sentences, under 100 words, with examples"
}

print("=== Alpaca Dataset Patterns (52K) ===")
for i, (pattern, desc) in enumerate(patterns.items(), 1):
    print(f"{i}. {pattern}: {desc}")
print(f"\nAlpaca Example:")
print(f"Instruction: {alpaca_sample['instruction']}")
print(f"Input: {alpaca_sample['input']}")
print(f"Output: {alpaca_sample['output']}")
