from openai import OpenAI

# 1. Setup client for the local server
client = OpenAI(base_url="http://localhost:8000/v1", api_key="zero-to-hero")

# 2. Make request with stream=True
response = client.chat.completions.create(
    model="Qwen/Qwen3-0.5B",
    messages=[{"role": "user", "content": "Explain streaming in 2 sentences."}],
    stream=True  # Enables incremental delivery
)

# 3. Process chunks in real-time
print("Response: ", end="", flush=True)
for chunk in response:
    # Each chunk contains only a piece of text (delta)
    content = chunk.choices[0].delta.content
    if content:
        print(content, end="", flush=True)
print("\n[End]")
