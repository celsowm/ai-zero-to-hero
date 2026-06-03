from openai import OpenAI

# Point the client to the local server — same interface as the real OpenAI
client = OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="local",  # local server ignores the key; any string works
)

response = client.chat.completions.create(
    model="Qwen/Qwen3-0.5B",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "What is a transformer?"},
    ],
    max_tokens=150,
    temperature=0.7,
)

print(response.choices[0].message.content)
print(f"Tokens used: {response.usage.total_tokens}")

# To swap engines: change only base_url
# vLLM:   base_url="http://localhost:8000/v1"
# Ollama: base_url="http://localhost:11434/v1"
# OpenAI: base_url="https://api.openai.com/v1", api_key="sk-..."
