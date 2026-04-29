from openai import OpenAI
import time

client = OpenAI()

TOOLS_MAP = {
    "get_weather": lambda city: f"23°C em {city}",
    "calculate": lambda expr: str(eval(expr)),
}

def handle_tool_call(tool_call, max_retries=3):
    """Executa ferramenta com tratamento de erro e retry."""
    import json
    name = tool_call.function.name
    args = json.loads(tool_call.function.arguments)
    
    for attempt in range(max_retries):
        try:
            if name not in TOOLS_MAP:
                return f"Erro: ferramenta '{name}' não encontrada"
            
            result = TOOLS_MAP[name](**args)
            return result
        
        except TypeError as e:
            return f"Erro: parâmetros inválidos — {e}"
        
        except TimeoutError:
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)  # Exponential backoff
                continue
            return "Erro: timeout após 3 tentativas"
        
        except Exception as e:
            return f"Erro inesperado: {e}"
    
    return "Erro: falha permanente após retries"
