from openai import OpenAI

client = OpenAI()

# Pergunta que requer múltiplas ferramentas independentes
messages = [{"role": "user", "content": "Compare o clima: SP, RJ e BH"}]

tools = [{"type": "function", "function": {"name": "get_weather", "description": "Obtém clima de uma cidade", "parameters": {"type": "object", "properties": {"city": {"type": "string"}}, "required": ["city"]}}]

response = client.chat.completions.create(
    model="gpt-4o", messages=messages, tools=tools,
)

# O modelo retorna 3 tool_calls simultâneos!
for tc in response.choices[0].message.tool_calls:
    print(f"Tool: {tc.function.name}, Args: {tc.function.arguments}")
# get_weather({"city": "São Paulo"})
# get_weather({"city": "Rio de Janeiro"})
# get_weather({"city": "Belo Horizonte"})
