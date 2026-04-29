# OpenAI API with Reasoning

from openai import OpenAI
client = OpenAI()

# Enable reasoning with effort control
response = client.chat.completions.create(
    model="o3-mini",
    messages=[
        {"role": "user", "content": "A triangle has sides 3, 4, 5. What is the area?"}
    ],
    reasoning_effort="medium",  # low, medium, high
    max_completion_tokens=8192  # thinking needs space
)

# Parse response
content = response.choices[0].message.content
thinking = ""
answer = ""

for block in content:
    if block["type"] == "thinking":
        thinking += block["thinking"]
    elif block["type"] == "text":
        answer += block["text"]

print("=== THINKING ===")
print(thinking)
print("\n=== ANSWER ===")
print(answer)

# Usage
u = response.usage
print(f"\nTokens: {u.prompt_tokens} input + {u.reasoning_tokens} thinking + {u.completion_tokens} output = {u.total_tokens} total")
