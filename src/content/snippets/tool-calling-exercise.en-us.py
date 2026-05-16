# Tool Calling Loop com BUGs
import json

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Gets weather for a city",
            "parameters": {
                "type": "object",
                "properties": {"city": {"type": "string"}},
                "required": ["city"],
            },
        },
    }
]

# Simulated LLM responses
responses = [
    {
        "role": "assistant",
        "tool_calls": [{
            "id": "call_123",
            "type": "function",
            "function": {
                "name": "get_weather",
                "arguments": '{"city": "Sao Paulo"}',  # string JSON!
            },
        }],
    },
    {"role": "assistant", "content": "Sao Paulo: 23C, sunny"},
]

def mock_tool_result(city: str) -> str:
    return f"23C, sunny in {city}"

messages = [{"role": "user", "content": "Weather in Sao Paulo?"}]

# BUG 1: arguments is a string, not parsed
# BUG 2: wrong key for linking result
for resp in responses:
    if "tool_calls" in resp:
        for tc in resp["tool_calls"]:
            args = tc["function"]["arguments"]  # BUG: not parsed!
            city = args.get("city", "unknown")   # BUG: args is str!
            result = mock_tool_result(city)
            messages.append({
                "role": "tool",
                "id": tc["id"],  # BUG: should be tool_call_id!
                "content": result,
            })

print("Messages:", json.dumps(messages, indent=2))
