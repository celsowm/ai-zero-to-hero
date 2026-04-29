from openai import OpenAI

# Basic streaming — stream=True enables Server-Sent Events (SSE)
# The server sends tokens one by one instead of waiting for the full response
client = OpenAI(api_key="sk-...", base_url="http://localhost:8000/v1")

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Write a short poem"}],
    stream=True,  # enable streaming
)

# response is an iterable — each item is an SSE chunk
for chunk in response:
    # delta contains the newly generated text in this chunk
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)

print()  # final newline
