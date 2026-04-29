# Response Structure with Reasoning

from openai import OpenAI
import json
client = OpenAI()

response = client.chat.completions.create(
    model="o3-mini",
    messages=[{"role": "user", "content": "What is 15% of 240?"}],
    reasoning_effort="medium"
)

# Response structure
msg = response.choices[0].message

# Content comes as list of blocks (OpenAI v1.0+)
for block in msg.content:
    if block["type"] == "thinking":
        print("[THINKING]", block["thinking"])
    elif block["type"] == "text":
        print("[ANSWER]", block["text"])

# Or access directly via parsed
parsed = json.loads(msg.model_dump_json())
print(json.dumps(parsed, indent=2))

# Usage with breakdown
usage = response.usage
print(f"Input tokens: {usage.prompt_tokens}")
print(f"Thinking tokens: {usage.reasoning_tokens}")
print(f"Output tokens: {usage.completion_tokens}")
print(f"Total tokens: {usage.total_tokens}")

# Note: reasoning_tokens are billed as output tokens
