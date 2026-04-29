# Zero-shot: no examples
from openai import OpenAI

client = OpenAI()

# Bad prompt - too vague
response_bad = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Tell me about gradient descent"}]
)

# Good prompt - specific
prompt_good = """Explain gradient descent as if I were a programming student.
Use the analogy of descending a foggy mountain.
Include: (1) what it is, (2) why it's important in ML, (3) example with learning rate = 0.01"""

response_good = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": prompt_good}]
)

print(f"Vague zero-shot: {response_bad.choices[0].message.content[:50]}...")
print(f"Good zero-shot: {response_good.choices[0].message.content[:50]}...")
