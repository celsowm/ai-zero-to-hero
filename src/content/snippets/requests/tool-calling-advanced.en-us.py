import json
import requests

API_URL = "http://localhost:8080/v1/chat/completions"
HEADERS = {"Content-Type": "application/json"}

tools = [
    {
        "type": "function",
        "function": {
            "name": "lookup_customer",
            "description": "Look up customer data",
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
            "description": "Schedule a follow-up callback",
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
        "content": "You are a support assistant. Use tools when you need to look up or record data."
    },
    {
        "role": "user",
        "content": "Ana wants to cancel and needs a follow-up tomorrow at 10 AM."
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
            tool_result = {"customer_id": "C-17", "plan": "pro", "open_tickets": 2}
        else:
            tool_result = {"callback_id": "cb_91", "scheduled_for": args["date_time"]}
        messages.append(
            {
                "role": "tool",
                "tool_call_id": tool_call["id"],
                "content": json.dumps(tool_result, ensure_ascii=False),
            }
        )
