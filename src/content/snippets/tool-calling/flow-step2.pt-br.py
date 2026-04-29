from openai import OpenAI

client = OpenAI()

# Passo 2: Modelo responde com tool_call
# A resposta do modelo vem com finish_reason="tool_calls"
messages = [
    {"role": "user", "content": "Qual a temperatura em São Paulo agora?"}
]

response = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    tools=[{"type": "function", "function": {"name": "get_weather", "description": "Obtém clima", "parameters": {"type": "object", "properties": {"city": {"type": "string"}}, "required": ["city"]}}],
)

# Inspeção da resposta
choice = response.choices[0]
print(f"finish_reason: {choice.finish_reason}")

if choice.finish_reason == "tool_calls":
    for tool_call in choice.message.tool_calls:
        print(f"Tool: {tool_call.function.name}")
        print(f"Args: {tool_call.function.arguments}")
        # Output: get_weather, {"city": "São Paulo"}
