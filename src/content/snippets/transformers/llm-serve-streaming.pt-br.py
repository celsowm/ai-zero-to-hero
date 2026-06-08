from openai import OpenAI

# 1. Configurar o cliente para o servidor local
client = OpenAI(base_url="http://localhost:8000/v1", api_key="zero-to-hero")

# 2. Fazer requisição com stream=True
response = client.chat.completions.create(
    model="Qwen/Qwen3-0.5B",
    messages=[{"role": "user", "content": "Explique streaming em 2 frases."}],
    stream=True  # Ativa o envio incremental
)

# 3. Processar os chunks em tempo real
print("Resposta: ", end="", flush=True)
for chunk in response:
    # Cada chunk contém apenas um pedaço do texto (delta)
    content = chunk.choices[0].delta.content
    if content:
        print(content, end="", flush=True)
print("\n[Fim]")
