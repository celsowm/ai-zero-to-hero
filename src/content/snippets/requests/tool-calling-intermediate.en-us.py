import json
import requests

API_URL = "http://localhost:8080/v1/chat/completions"
HEADERS = {"Content-Type": "application/json"}

def dispatch_tool(tool_call):
    name = tool_call["function"]["name"]
    args = json.loads(tool_call["function"]["arguments"])
    if name == "search_docs":
        return {"results": [{"title": "API docs", "url": f'https://example.com/docs?q={args["query"]}'}]}
    if name == "create_ticket":
        return {"ticket_id": "T-2048", "status": "open", "priority": args["priority"]}
    raise ValueError(f"Unknown tool: {name}")

payload = {
    "model": "gpt-4.1-mini",
    "messages": [
        {"role": "user", "content": "Find the error and create a ticket with high priority."}
    ],
    "tools": [
        {
            "type": "function",
            "function": {
                "name": "search_docs",
                "description": "Search internal docs",
                "parameters": {
                    "type": "object",
                    "properties": {"query": {"type": "string"}},
                    "required": ["query"]
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "create_ticket",
                "description": "Create a support ticket",
                "parameters": {
                    "type": "object",
                    "properties": {"priority": {"type": "string"}},
                    "required": ["priority"]
                }
            }
        }
    ],
    "tool_choice": "auto"
}

response = requests.post(API_URL, json=payload, headers=HEADERS, timeout=30)
response.raise_for_status()
message = response.json()["choices"][0]["message"]
tool_call = message["tool_calls"][0]
tool_result = dispatch_tool(tool_call)
print(json.dumps(tool_result, ensure_ascii=False, indent=2))
