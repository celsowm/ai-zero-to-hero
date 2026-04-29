import json
from openai import OpenAI

client = OpenAI()

# Step 3: Execute tool and send result
messages = [
    {"role": "user", "content": "What's the temperature in São Paulo now?"},
    {
        "role": "assistant",
        "tool_calls": [{
            "id": "call_abc123",
            "type": "function",
            "function": {
                "name": "get_weather",
                "arguments": '{"city": "São Paulo"}',
            },
        }],
    },
]

# Simulate tool execution
def get_weather(city: str) -> str:
    return "23°C, sunny"

# Execute and add result
for tc in messages[1]["tool_calls"]:
    args = json.loads(tc["function"]["arguments"])
    result = get_weather(args["city"])
    messages.append({
        "role": "tool",
        "tool_call_id": tc["id"],  # LINKS to original tool_call!
        "content": result,
    })

# Send back to model for final answer
final = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    tools=[{"type": "function", "function": {"name": "get_weather", "description": "Gets weather", "parameters": {"type": "object", "properties": {"city": {"type": "string"}}, "required": ["city"]}}],
)

print(final.choices[0].message.content)
# Output: "The current temperature in São Paulo is 23°C with sunny skies."
