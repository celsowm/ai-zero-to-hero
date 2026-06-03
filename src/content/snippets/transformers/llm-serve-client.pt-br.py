from openai import OpenAI

# Aponta o cliente para o servidor local — mesma interface da OpenAI real
client = OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="local",  # servidor local ignora a chave; qualquer string funciona
)

response = client.chat.completions.create(
    model="Qwen/Qwen3-0.5B",
    messages=[
        {"role": "system", "content": "Você é um assistente útil."},
        {"role": "user", "content": "O que é um transformer?"},
    ],
    max_tokens=150,
    temperature=0.7,
)

print(response.choices[0].message.content)
print(f"Tokens usados: {response.usage.total_tokens}")

# Para trocar de motor: mude apenas base_url
# vLLM:   base_url="http://localhost:8000/v1"
# Ollama: base_url="http://localhost:11434/v1"
# OpenAI: base_url="https://api.openai.com/v1", api_key="sk-..."
