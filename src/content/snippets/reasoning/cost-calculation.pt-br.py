# Calculo de custo com Reasoning

from openai import OpenAI
client = OpenAI()

# Precos por 1M de tokens (Out 2024)
PRICES = {
    "gpt-4o": {"input": 2.50, "output": 10.00},
    "o3-mini": {"input": 1.10, "output": 4.40},  # thinking cobrado como output
    "o1": {"input": 15.00, "output": 60.00},
}

def calculate_cost(model: str, prompt_tokens: int, reasoning_tokens: int, output_tokens: int) -> float:
    """Calcula custo total incluindo thinking tokens"""
    pricing = PRICES[model]
    input_cost = (prompt_tokens / 1_000_000) * pricing["input"]
    # Thinking tokens sao cobrados como output tokens
    reasoning_cost = (reasoning_tokens / 1_000_000) * pricing["output"]
    output_cost = (output_tokens / 1_000_000) * pricing["output"]
    return input_cost + reasoning_cost + output_cost

# Exemplo: problema de matematica
response = client.chat.completions.create(
    model="o3-mini",
    messages=[{"role": "user", "content": "Resolva: integral de x^2 de 0 a 3"}],
    reasoning_effort="high"
)

u = response.usage
cost = calculate_cost("o3-mini", u.prompt_tokens, u.reasoning_tokens, u.completion_tokens)

print(f"Input: {u.prompt_tokens} tokens")
print(f"Thinking: {u.reasoning_tokens} tokens")
print(f"Output: {u.completion_tokens} tokens")
print(f"Custo total: ${cost:.4f}")

# Comparacao: mesmo problema com GPT-4o (sem reasoning)
# GPT-4o usaria menos tokens mas poderia errar a resposta
