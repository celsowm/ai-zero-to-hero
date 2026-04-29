from openai import OpenAI

# Step 4: Client OpenAI API — conectar a servidor compatível
# Pode apontar para OpenAI real ou servidor local (ex: vLLM, Ollama)
client = OpenAI(
    api_key="sua-chave-aqui",          # não necessária para servidores locais
    base_url="http://localhost:8000/v1",  # URL do servidor
)

response = client.chat.completions.create(
    model="gpt2",
    messages=[{"role": "user", "content": "Explique o que é machine learning"}],
    max_tokens=100,
    temperature=0.7,
)

print(response.choices[0].message.content)
