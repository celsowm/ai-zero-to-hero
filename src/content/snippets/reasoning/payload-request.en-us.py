# Request Payload with Reasoning

from openai import OpenAI
client = OpenAI()

# Request with reasoning_effort
response = client.chat.completions.create(
    model="o3-mini",
    messages=[
        {"role": "system", "content": "You are a math assistant."},
        {"role": "user", "content": "Solve: 3x^2 + 12x - 4 = 0"}
    ],
    reasoning_effort="high",        # low, medium, high
    max_completion_tokens=4096,     # Include thinking tokens
    temperature=1.0,                # Thinking uses fixed temp
    store=False                     # Don't save to history
)

# reasoning_effort controls thinking depth:
# - low: fast thinking, few tokens
# - medium: balance between speed and depth
# - high: deep thinking, many tokens (up to 10x more)

print(f"Model: {response.model}")
print(f"Total tokens: {response.usage.total_tokens}")
