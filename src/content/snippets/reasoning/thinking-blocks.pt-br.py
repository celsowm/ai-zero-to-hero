# Estrutura de Thinking Blocks na resposta

from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
    model="o3-mini",
    messages=[
        {"role": "user", "content": "Quanto e 347 x 23?"}
    ],
    reasoning_effort="medium"
)

# A resposta vem com thinking blocks no content
message = response.choices[0].message

# Content estruturado:
content = message.content
# [
#   {
#     "type": "thinking",
#     "thinking": "Vou multiplicar passo a passo...\n347 x 23 = 347 x (20 + 3)\n= 347 x 20 + 347 x 3\n= 6940 + 1041\n= 7981"
#   },
#   {
#     "type": "text",
#     "text": "347 x 23 = 7981"
#   }
# ]

print(f"Tokens usados: {response.usage.total_tokens}")
print(f"Thinking tokens: {response.usage.reasoning_tokens}")
print(f"Output tokens: {response.usage.completion_tokens}")
