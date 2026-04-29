import json
from openai import OpenAI

client = OpenAI()

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Gets current weather for a city",
            "parameters": {
                "type": "object",
                "properties": {"city": {"type": "string"}},
                "required": ["city"],
            },
        },
    }
]

def execute_tool(name: str, args: dict) -> str:
    """Executes a tool by name."""
    if name == "get_weather":
        return f"23°C, sunny in {args['city']}"
    return f"Error: tool {name} not found"

def chat_with_tools(user_input: str) -> str:
    """Complete Tool Calling loop."""
    messages = [{"role": "user", "content": user_input}]
    
    # 1. Send to model
    response = client.chat.completions.create(
        model="gpt-4o", messages=messages, tools=TOOLS,
    )
    choice = response.choices[0]
    
    # 2. Check if it wants to use tools
    if choice.finish_reason != "tool_calls":
        return choice.message.content
    
    # 3. Execute each requested tool
    for tc in choice.message.tool_calls:
        args = json.loads(tc.function.arguments)
        result = execute_tool(tc.function.name, args)
        messages.append({
            "role": "tool",
            "tool_call_id": tc.id,
            "content": result,
        })
    
    # 4. Generate final response
    final = client.chat.completions.create(
        model="gpt-4o", messages=messages, tools=TOOLS,
    )
    return final.choices[0].message.content

# Test
print(chat_with_tools("What's the weather in São Paulo?"))
# Output: "The current weather in São Paulo is 23°C with sunny skies."
