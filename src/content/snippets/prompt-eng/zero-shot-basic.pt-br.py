# Zero-shot: sem exemplos
from openai import OpenAI

client = OpenAI()

# Prompt ruim - muito vago
response_bad = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Me fala sobre gradient descent"}]
)

# Prompt bom - específico
prompt_good = """Explique gradient descent como se eu fosse um estudante de programação.
Use a analogia de descer uma montanha com neblina.
Inclua: (1) o que é, (2) por que é importante em ML, (3) exemplo com learning rate = 0.01"""

response_good = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": prompt_good}]
)

print(f"Zero-shot vago: {response_bad.choices[0].message.content[:50]}...")
print(f"Zero-shot bom: {response_good.choices[0].message.content[:50]}...")
