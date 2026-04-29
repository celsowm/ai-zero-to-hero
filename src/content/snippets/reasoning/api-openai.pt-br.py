# OpenAI API com Reasoning

from openai import OpenAI
client = OpenAI()

# Habilitar reasoning com effort control
response = client.chat.completions.create(
    model="o3-mini",
    messages=[
        {"role": "user", "content": "Um triangulo tem lados 3, 4, 5. Qual a area?"}
    ],
    reasoning_effort="medium",  # low, medium, high
    max_completion_tokens=8192  # thinking precisa de espaco
)

# Parse da resposta
content = response.choices[0].message.content
thinking = ""
answer = ""

for block in content:
    if block["type"] == "thinking":
        thinking += block["thinking"]
    elif block["type"] == "text":
        answer += block["text"]

print("=== PENSAMENTO ===")
print(thinking)
print("\n=== RESPOSTA ===")
print(answer)

# Usage
u = response.usage
print(f"\nTokens: {u.prompt_tokens} input + {u.reasoning_tokens} thinking + {u.completion_tokens} output = {u.total_tokens} total")
