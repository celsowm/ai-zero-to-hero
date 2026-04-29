from openai import OpenAI
import time

client = OpenAI()

TOOLS_MAP = {
    "get_weather": lambda city: f"23°C in {city}",
    "calculate": lambda expr: str(eval(expr)),
}

def handle_tool_call(tool_call, max_retries=3):
    """Executes tool with error handling and retry."""
    import json
    name = tool_call.function.name
    args = json.loads(tool_call.function.arguments)
    
    for attempt in range(max_retries):
        try:
            if name not in TOOLS_MAP:
                return f"Error: tool '{name}' not found"
            
            result = TOOLS_MAP[name](**args)
            return result
        
        except TypeError as e:
            return f"Error: invalid parameters — {e}"
        
        except TimeoutError:
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)  # Exponential backoff
                continue
            return "Error: timeout after 3 attempts"
        
        except Exception as e:
            return f"Unexpected error: {e}"
    
    return "Error: permanent failure after retries"
