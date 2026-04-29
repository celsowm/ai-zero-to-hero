from openai import OpenAI

client = OpenAI()

# Tool declarations
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Gets current temperature and weather conditions for a specific city",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "City name (e.g., 'São Paulo', 'Tokyo')",
                    },
                    "unit": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"],
                        "description": "Temperature unit",
                    },
                },
                "required": ["city"],
            },
        },
    }
]

# Send with tools
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "What's the temperature in São Paulo?"}],
    tools=tools,
)
