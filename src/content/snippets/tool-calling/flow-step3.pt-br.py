import json
from openai import OpenAI

client = OpenAI()

# Passo 3: Executar ferramenta e enviar resultado
messages = [
    {"role": "user", "content": "Qual a temperatura em São Paulo agora?"},
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

# Simula execução da tool
def get_weather(city: str) -> str:
    return "23°C, ensolarado"

# Executa e adiciona resultado
for tc in messages[1]["tool_calls"]:
    args = json.loads(tc["function"]["arguments"])
    result = get_weather(args["city"])
    messages.append({
        "role": "tool",
        "tool_call_id": tc["id"],  # VINCULA ao tool_call original!
        "content": result,
    })

# Envia de volta ao modelo para resposta final
final = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    tools=[{"type": "function", "function": {"name": "get_weather", "description": "Obtém clima", "parameters": {"type": "object", "properties": {"city": {"type": "string"}}, "required": ["city"]}}],
)

print(final.choices[0].message.content)
# Output: "A temperatura atual em São Paulo é 23°C com céu ensolarado."
