from openai import OpenAI

# Streaming com uso prático — coletar resposta completa e métricas
client = OpenAI(api_key="sk-...", base_url="http://localhost:8000/v1")

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Explique transformers"}],
    stream=True,
)

# Coletar chunks para uso posterior
full_response = ""
token_count = 0

for chunk in response:
    delta = chunk.choices[0].delta
    if delta.content:
        full_response += delta.content
        token_count += 1
    # Mostrar progresso em tempo real
    print(delta.content or "", end="", flush=True)

print(f"\n\nTotal de tokens recebidos: {token_count}")
print(f"Tamanho da resposta: {len(full_response)} caracteres")
