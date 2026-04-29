from openai import OpenAI

client = OpenAI()

# Step 1: Send question with tools
messages = [
    {"role": "user", "content": "What's the temperature in São Paulo now?"}
]

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Gets current weather for a city",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {"type": "string"},
                },
                "required": ["city"],
            },
        },
    }
]

response = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    tools=tools,
)
