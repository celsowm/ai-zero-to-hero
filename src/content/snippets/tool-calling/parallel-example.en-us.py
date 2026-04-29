from openai import OpenAI

client = OpenAI()

# Question requiring multiple tools
messages = [{"role": "user", "content": "Compare weather: SP, RJ and BH"}]

tools = [{"type": "function", "function": {"name": "get_weather", "description": "Gets weather for a city", "parameters": {"type": "object", "properties": {"city": {"type": "string"}}, "required": ["city"]}}]

response = client.chat.completions.create(
    model="gpt-4o", messages=messages, tools=tools,
)

# Model returns 3 simultaneous tool_calls!
for tc in response.choices[0].message.tool_calls:
    print(f"Tool: {tc.function.name}, Args: {tc.function.arguments}")
# get_weather({"city": "São Paulo"})
# get_weather({"city": "Rio de Janeiro"})
# get_weather({"city": "Belo Horizonte"})
