# E2E Reasoning App - Step 2: Reasoning Call

from openai import OpenAI
import time

client = OpenAI()

def call_reasoning(question: str, effort: str = "medium") -> dict:
    """Chama modelo de reasoning com configuracao."""
    start = time.time()
    
    response = client.chat.completions.create(
        model="o3-mini",
        messages=[{"role": "user", "content": question}],
        reasoning_effort=effort,
        max_completion_tokens=8192,
        timeout=60
    )
    
    elapsed = time.time() - start
    
    return {
        "raw_response": response.choices[0].message.content,
        "model": response.model,
        "tokens": response.usage.total_tokens,
        "reasoning_tokens": response.usage.reasoning_tokens,
        "latency": elapsed,
    }

# Teste
result = call_reasoning("Prove que a soma de dois numeros impares e par", effort="high")
print(f"Modelo: {result['model']}")
print(f"Tokens: {result['tokens']} (thinking: {result['reasoning_tokens']})")
print(f"Latencia: {result['latency']:.2f}s")
