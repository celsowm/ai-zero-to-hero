# A/B evaluation of prompts
import json

# Prompt A: short
prompt_a = "Summarize this text: {text}"

# Prompt B: structured
prompt_b = """Summarize the text below in exactly 3 paragraphs:
1. Main idea
2. Supporting points
3. Conclusion

Text: {text}"""

# Simulates evaluation metrics
results = {
    "prompt_a": {"accuracy": 72, "format_score": 45, "avg_length": 85},
    "prompt_b": {"accuracy": 88, "format_score": 92, "avg_length": 120},
}

print("=== A/B Prompt Evaluation ===")
print(f"{'Metric':<15} | {'Prompt A':<10} | {'Prompt B':<10}")
print("-" * 40)
for metric in ["accuracy", "format_score", "avg_length"]:
    print(f"{metric:<15} | {results['prompt_a'][metric]:<10} | {results['prompt_b'][metric]:<10}")
print(f"\nWinner: Prompt B (better in accuracy and format_score)")
