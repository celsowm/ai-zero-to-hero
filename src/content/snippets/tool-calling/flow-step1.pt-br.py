from openai import OpenAI

client = OpenAI()

# Passo 1: Enviar pergunta com tools
messages = [
    {"role": "user", "content": "Qual a temperatura em São Paulo agora?"}
]

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Obtém clima atual de uma cidade",
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
