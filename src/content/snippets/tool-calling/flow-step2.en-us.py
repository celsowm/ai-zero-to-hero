from openai import OpenAI

client = OpenAI()

# Step 2: Model responds with tool_call
# The model's response comes with finish_reason="tool_calls"
messages = [
    {"role": "user", "content": "What's the temperature in São Paulo now?"}
]

response = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    tools=[{"type": "function", "function": {"name": "get_weather", "description": "Gets weather", "parameters": {"type": "object", "properties": {"city": {"type": "string"}}, "required": ["city"]}}],
)

# Inspect response
choice = response.choices[0]
print(f"finish_reason: {choice.finish_reason}")

if choice.finish_reason == "tool_calls":
    for tool_call in choice.message.tool_calls:
        print(f"Tool: {tool_call.function.name}")
        print(f"Args: {tool_call.function.arguments}")
        # Output: get_weather, {"city": "São Paulo"}
