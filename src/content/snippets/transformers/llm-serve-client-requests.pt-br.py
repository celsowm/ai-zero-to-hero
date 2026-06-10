# pip install requests
import requests

# Aponta para o servidor local — mesma API compatível com OpenAI
response = requests.post(
    "http://localhost:8000/v1/chat/completions",
    headers={"Content-Type": "application/json"},
    json={
        "model": "Qwen/Qwen3.5-0.8B",
        "messages": [
            {"role": "system", "content": "Você é um assistente útil."},
            {"role": "user", "content": "O que é um transformer?"},
        ],
        "max_tokens": 150,
        "temperature": 0.7,
    },
)

data = response.json()
print(data["choices"][0]["message"]["content"])
print(f"Tokens usados: {data['usage']['total_tokens']}")

# Para trocar de motor: mude apenas a URL
# vLLM:   http://localhost:8000/v1/chat/completions
# Ollama: http://localhost:11434/v1/chat/completions
# OpenAI: https://api.openai.com/v1/chat/completions (requer header Authorization)
