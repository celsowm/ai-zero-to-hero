import requests

API_URL = "http://localhost:8080/v1/chat/completions"
HEADERS = {"Content-Type": "application/json"}

payload = {
    "model": "gpt-4.1-mini",
    "messages": [
        {"role": "user", "content": "Reserve a meeting for tomorrow at 3 PM."}
    ],
    "tools": [
        {
            "type": "function",
            "function": {
                "name": "create_calendar_event",
                "description": "Create a calendar event",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "title": {"type": "string"},
                        "date": {"type": "string"},
                        "time": {"type": "string"}
                    },
                    "required": ["title", "date", "time"],
                    "additionalProperties": False
                }
            }
        }
    ],
    "tool_choice": "auto"
}

response = requests.post(API_URL, json=payload, headers=HEADERS, timeout=30)
response.raise_for_status()
data = response.json()
tool_call = data["choices"][0]["message"]["tool_calls"][0]
print(tool_call["function"]["name"])
print(tool_call["function"]["arguments"])
