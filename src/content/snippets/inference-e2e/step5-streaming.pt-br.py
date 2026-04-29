from openai import OpenAI

# Step 5: Streaming com SSE — receber resposta token por token
client = OpenAI(base_url="http://localhost:8000/v1", api_key="local")

# stream=True habilita Server-Sent Events (SSE)
response = client.chat.completions.create(
    model="gpt2",
    messages=[{"role": "user", "content": "Conte uma história curta"}],
    max_tokens=100,
    stream=True,
)

# Iterar sobre chunks SSE — cada chunk contém um token ou delta
for chunk in response:
    if chunk.choices[0].delta.content is not None:
        # end="" imprime sem quebra de linha, mostrando texto em tempo real
        print(chunk.choices[0].delta.content, end="", flush=True)

print()  # nova linha ao final
