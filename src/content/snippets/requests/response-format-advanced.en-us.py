import json
import requests

API_URL = "http://localhost:8080/v1/chat/completions"
HEADERS = {"Content-Type": "application/json"}


def is_valid(stack):
    return all(
        key in stack
        for key in ["project", "frontend", "backend", "data_layer", "delivery"]
    )


messages = [
    {
        "role": "user",
        "content": "Convert this migration note into strict JSON: We are moving Atlas Shop to Next.js 14 with TypeScript and Tailwind CSS on the frontend, FastAPI in Python on the backend, PostgreSQL 16 for persistence, Redis 7 for caching, and Docker plus GitHub Actions for deployment."
    }
]

for attempt in range(3):
    response = requests.post(
        API_URL,
        json={
            "model": "gpt-4.1-mini",
            "messages": messages,
            "response_format": {
                "type": "json_schema",
                "json_schema": {
                    "name": "tech_stack_strict",
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
        },
        headers=HEADERS,
        timeout=30,
    )
    response.raise_for_status()
    content = response.json()["choices"][0]["message"]["content"]
    stack = json.loads(content)
    if is_valid(stack):
        print(stack["project"])
        print(stack["frontend"]["framework"])
        print(stack["backend"]["framework"])
        break
    messages.append(
        {
            "role": "user",
            "content": "Return valid JSON only, with project, frontend, backend, data_layer, and delivery."
        }
    )
