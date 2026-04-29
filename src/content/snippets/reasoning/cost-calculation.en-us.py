# Cost calculation with Reasoning

from openai import OpenAI
client = OpenAI()

# Prices per 1M tokens (Oct 2024)
PRICES = {
    "gpt-4o": {"input": 2.50, "output": 10.00},
    "o3-mini": {"input": 1.10, "output": 4.40},  # thinking billed as output
    "o1": {"input": 15.00, "output": 60.00},
}

def calculate_cost(model: str, prompt_tokens: int, reasoning_tokens: int, output_tokens: int) -> float:
    """Calculate total cost including thinking tokens"""
    pricing = PRICES[model]
    input_cost = (prompt_tokens / 1_000_000) * pricing["input"]
    # Thinking tokens are billed as output tokens
    reasoning_cost = (reasoning_tokens / 1_000_000) * pricing["output"]
    output_cost = (output_tokens / 1_000_000) * pricing["output"]
    return input_cost + reasoning_cost + output_cost

# Example: math problem
response = client.chat.completions.create(
    model="o3-mini",
    messages=[{"role": "user", "content": "Solve: integral of x^2 from 0 to 3"}],
    reasoning_effort="high"
)

u = response.usage
cost = calculate_cost("o3-mini", u.prompt_tokens, u.reasoning_tokens, u.completion_tokens)

print(f"Input: {u.prompt_tokens} tokens")
print(f"Thinking: {u.reasoning_tokens} tokens")
print(f"Output: {u.completion_tokens} tokens")
print(f"Total cost: ${cost:.4f}")

# Comparison: same problem with GPT-4o (no reasoning)
# GPT-4o would use fewer tokens but might get the answer wrong
