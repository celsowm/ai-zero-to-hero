from openai import OpenAI

# Streaming with practical usage — collect full response and metrics
client = OpenAI(api_key="sk-...", base_url="http://localhost:8000/v1")

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Explain transformers"}],
    stream=True,
)

# Collect chunks for later use
full_response = ""
token_count = 0

for chunk in response:
    delta = chunk.choices[0].delta
    if delta.content:
        full_response += delta.content
        token_count += 1
    # Show progress in real time
    print(delta.content or "", end="", flush=True)

print(f"\n\nTotal tokens received: {token_count}")
print(f"Response length: {len(full_response)} characters")
