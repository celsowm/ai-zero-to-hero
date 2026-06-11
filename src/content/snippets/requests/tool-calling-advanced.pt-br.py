import json
import requests

API_URL = "http://localhost:8080/v1/chat/completions"
HEADERS = {"Content-Type": "application/json"}

tools = [
    {
        "type": "function",
        "function": {
            "name": "lookup_customer",
            "description": "Consulta dados do cliente",
            "parameters": {
                "type": "object",
                "properties": {"customer_name": {"type": "string"}},
                "required": ["customer_name"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "schedule_callback",
            "description": "Agenda um retorno",
            "parameters": {
                "type": "object",
                "properties": {"date_time": {"type": "string"}},
                "required": ["date_time"]
            }
        }
    }
]

messages = [
    {
        "role": "system",
        "content": "Você é um assistente de suporte. Use tools quando precisar consultar ou registrar dados."
    },
    {
        "role": "user",
        "content": "Ana quer cancelar e precisa de um retorno amanhã às 10h."
    }
]

for _ in range(3):
    response = requests.post(
        API_URL,
        json={"model": "gpt-4.1-mini", "messages": messages, "tools": tools, "tool_choice": "auto"},
        headers=HEADERS,
        timeout=30,
    )
    response.raise_for_status()
    message = response.json()["choices"][0]["message"]
    if not message.get("tool_calls"):
        print(message["content"])
        break
    messages.append(message)
    for tool_call in message["tool_calls"]:
        args = json.loads(tool_call["function"]["arguments"])
        if tool_call["function"]["name"] == "lookup_customer":
            tool_result = {"customer_id": "C-17", "plano": "pro", "tickets_abertos": 2}
        else:
            tool_result = {"callback_id": "cb_91", "agendado_para": args["date_time"]}
        messages.append(
            {
                "role": "tool",
                "tool_call_id": tool_call["id"],
                "content": json.dumps(tool_result, ensure_ascii=False),
            }
        )
