# Payload de Request com Reasoning

from openai import OpenAI
client = OpenAI()

# Request com reasoning_effort
response = client.chat.completions.create(
    model="o3-mini",
    messages=[
        {"role": "system", "content": "Voce e um assistente matematico."},
        {"role": "user", "content": "Resolva: 3x^2 + 12x - 4 = 0"}
    ],
    reasoning_effort="high",        # low, medium, high
    max_completion_tokens=4096,     # Incluir thinking tokens
    temperature=1.0,                # Thinking usa temp fixo
    store=False                     # Nao salvar no history
)

# O reasoning_effort controla a profundidade do pensamento:
# - low: pensamento rapido, poucos tokens
# - medium: equilibrio entre velocidade e profundidade
# - high: pensamento profundo, muitos tokens (ate 10x mais)

print(f"Modelo: {response.model}")
print(f"Total tokens: {response.usage.total_tokens}")
