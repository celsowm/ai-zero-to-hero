from openai import OpenAI

# Streaming básico — stream=True habilita Server-Sent Events (SSE)
# O servidor envia tokens um por um em vez de esperar a resposta completa
client = OpenAI(api_key="sk-...", base_url="http://localhost:8000/v1")

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Escreva um poema curto"}],
    stream=True,  # habilitar streaming
)

# response é um iterável — cada item é um chunk SSE
for chunk in response:
    # delta contém o novo texto gerado neste chunk
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)

print()  # nova linha ao final
