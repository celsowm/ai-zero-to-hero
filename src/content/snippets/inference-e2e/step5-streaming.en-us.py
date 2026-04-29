from openai import OpenAI

# Step 5: Streaming with SSE — receive response token by token
client = OpenAI(base_url="http://localhost:8000/v1", api_key="local")

# stream=True enables Server-Sent Events (SSE)
response = client.chat.completions.create(
    model="gpt2",
    messages=[{"role": "user", "content": "Tell me a short story"}],
    max_tokens=100,
    stream=True,
)

# Iterate over SSE chunks — each chunk contains one token or delta
for chunk in response:
    if chunk.choices[0].delta.content is not None:
        # end="" prints without newline, showing text in real time
        print(chunk.choices[0].delta.content, end="", flush=True)

print()  # final newline
