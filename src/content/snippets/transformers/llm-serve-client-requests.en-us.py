# pip install requests
import requests

# Point to the local server — same OpenAI-compatible API
response = requests.post(
    "http://localhost:8000/v1/chat/completions",
    headers={"Content-Type": "application/json"},
    json={
        "model": "Qwen/Qwen3.5-0.8B",
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "What is a transformer?"},
        ],
        "max_tokens": 150,
        "temperature": 0.7,
    },
)

data = response.json()
print(data["choices"][0]["message"]["content"])
print(f"Tokens used: {data['usage']['total_tokens']}")

# To swap engines: change only the URL
# vLLM:   http://localhost:8000/v1/chat/completions
# Ollama: http://localhost:11434/v1/chat/completions
# OpenAI: https://api.openai.com/v1/chat/completions (requires Authorization header)
