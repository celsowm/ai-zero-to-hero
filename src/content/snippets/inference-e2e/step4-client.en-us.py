from openai import OpenAI

# Step 4: OpenAI API client — connect to a compatible server
# Can point to real OpenAI or a local server (e.g., vLLM, Ollama)
client = OpenAI(
    api_key="your-key-here",             # not needed for local servers
    base_url="http://localhost:8000/v1", # server URL
)

response = client.chat.completions.create(
    model="gpt2",
    messages=[{"role": "user", "content": "Explain what machine learning is"}],
    max_tokens=100,
    temperature=0.7,
)

print(response.choices[0].message.content)
