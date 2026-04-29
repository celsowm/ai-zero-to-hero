import json
from openai import OpenAI

client = OpenAI()

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Obtém o clima atual para uma cidade",
            "parameters": {
                "type": "object",
                "properties": {"city": {"type": "string"}},
                "required": ["city"],
            },
        },
    }
]

def execute_tool(name: str, args: dict) -> str:
    """Executa ferramenta pelo nome."""
    if name == "get_weather":
        return f"23°C, ensolarado em {args['city']}"
    return f"Erro: ferramenta {name} não encontrada"

def chat_with_tools(user_input: str) -> str:
    """Loop completo de Tool Calling."""
    messages = [{"role": "user", "content": user_input}]
    
    # 1. Enviar ao modelo
    response = client.chat.completions.create(
        model="gpt-4o", messages=messages, tools=TOOLS,
    )
    choice = response.choices[0]
    
    # 2. Verificar se quer usar tools
    if choice.finish_reason != "tool_calls":
        return choice.message.content
    
    # 3. Executar cada tool solicitada
    for tc in choice.message.tool_calls:
        args = json.loads(tc.function.arguments)
        result = execute_tool(tc.function.name, args)
        messages.append({
            "role": "tool",
            "tool_call_id": tc.id,
            "content": result,
        })
    
    # 4. Gerar resposta final
    final = client.chat.completions.create(
        model="gpt-4o", messages=messages, tools=TOOLS,
    )
    return final.choices[0].message.content

# Teste
print(chat_with_tools("Qual o clima em São Paulo?"))
# Output: "A temperatura atual em São Paulo é 23°C com céu ensolarado."
