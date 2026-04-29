# Estrutura da Response com Reasoning

from openai import OpenAI
import json
client = OpenAI()

response = client.chat.completions.create(
    model="o3-mini",
    messages=[{"role": "user", "content": "Quanto e 15% de 240?"}],
    reasoning_effort="medium"
)

# Estrutura da resposta
msg = response.choices[0].message

# Content vem como lista de blocos (OpenAI v1.0+)
for block in msg.content:
    if block["type"] == "thinking":
        print("[PENSANDO]", block["thinking"])
    elif block["type"] == "text":
        print("[RESPOSTA]", block["text"])

# Ou acessar direto via parsed
parsed = json.loads(msg.model_dump_json())
print(json.dumps(parsed, indent=2))

# Usage com breakdown
usage = response.usage
print(f"Input tokens: {usage.prompt_tokens}")
print(f"Thinking tokens: {usage.reasoning_tokens}")
print(f"Output tokens: {usage.completion_tokens}")
print(f"Total tokens: {usage.total_tokens}")

# Nota: reasoning_tokens sao cobrados como output tokens
