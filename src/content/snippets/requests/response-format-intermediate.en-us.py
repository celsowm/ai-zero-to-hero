import json
import requests

API_URL = "http://localhost:8080/v1/chat/completions"
HEADERS = {"Content-Type": "application/json"}

payload = {
    "model": "gpt-4.1-mini",
    "messages": [
        {
            "role": "user",
            "content": "Turn this architecture note into structured JSON: The product uses Next.js 14 and TypeScript in the frontend, Tailwind CSS for styling, FastAPI in Python on the backend, PostgreSQL for persistence, Redis for caching, and Docker plus GitHub Actions for delivery."
        }
    ],
    "response_format": {
        "type": "json_schema",
        "json_schema": {
            "name": "tech_stack_detailed",
            "schema": {
                "type": "object",
                "properties": {
                    "project": {"type": "string"},
                    "frontend": {
                        "type": "object",
                        "properties": {
                            "framework": {"type": "string"},
                            "language": {"type": "string"},
                            "styling": {"type": "array", "items": {"type": "string"}}
                        },
                        "required": ["framework", "language", "styling"],
                        "additionalProperties": False
                    },
                    "backend": {
                        "type": "object",
                        "properties": {
                            "framework": {"type": "string"},
                            "language": {"type": "string"},
                            "supporting_tools": {"type": "array", "items": {"type": "string"}}
                        },
                        "required": ["framework", "language", "supporting_tools"],
                        "additionalProperties": False
                    },
                    "data_layer": {
                        "type": "object",
                        "properties": {
                            "database": {"type": "string"},
                            "cache": {"type": "string"}
                        },
                        "required": ["database", "cache"],
                        "additionalProperties": False
                    },
                    "delivery": {
                        "type": "array",
                        "items": {"type": "string"}
                    }
                },
                "required": ["project", "frontend", "backend", "data_layer", "delivery"],
                "additionalProperties": False
            }
        }
    }
}

response = requests.post(API_URL, json=payload, headers=HEADERS, timeout=30)
response.raise_for_status()
content = response.json()["choices"][0]["message"]["content"]
stack = json.loads(content)
print(stack["frontend"]["framework"])
print(stack["backend"]["framework"])
print(stack["data_layer"]["database"])
