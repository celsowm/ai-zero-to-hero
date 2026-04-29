from openai import OpenAI

client = OpenAI()

# Declaração de ferramentas disponíveis
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Obtém a temperatura e condições climáticas atuais para uma cidade específica",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "Nome da cidade (ex: 'São Paulo', 'Tokyo')",
                    },
                    "unit": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"],
                        "description": "Unidade de temperatura",
                    },
                },
                "required": ["city"],
            },
        },
    }
]

# Envio com tools
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Qual a temperatura em São Paulo?"}],
    tools=tools,
)
