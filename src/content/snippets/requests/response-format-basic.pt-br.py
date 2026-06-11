import json
import requests

API_URL = "http://localhost:8080/v1/chat/completions"
HEADERS = {"Content-Type": "application/json"}

payload = {
    "model": "gpt-4.1-mini",
    "messages": [
        {
            "role": "user",
            "content": "Extraia o tech stack desta nota: Construímos o painel com React e Vite no frontend, FastAPI no backend, PostgreSQL para dados e Docker para desenvolvimento local."
        }
    ],
    "response_format": {
        "type": "json_schema",
        "json_schema": {
            "name": "tech_stack_basic",
            "schema": {
                "type": "object",
                "properties": {
                    "project": {"type": "string"},
                    "technologies": {
                        "type": "array",
                        "items": {"type": "string"}
                    }
                },
                "required": ["project", "technologies"],
                "additionalProperties": False
            }
        }
    }
}

response = requests.post(API_URL, json=payload, headers=HEADERS, timeout=30)
response.raise_for_status()
content = response.json()["choices"][0]["message"]["content"]
stack = json.loads(content)
print(stack["project"])
print(", ".join(stack["technologies"]))
