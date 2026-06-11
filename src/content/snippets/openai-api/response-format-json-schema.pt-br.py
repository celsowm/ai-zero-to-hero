import json
from openai import OpenAI

client = OpenAI(base_url="http://localhost:8080/v1", api_key="sk-no-key-required")

request = {
    "model": "gpt-4.1-mini",
    "messages": [{"role": "user", "content": "Extraia um evento do texto."}],
    "response_format": {
        "type": "json_schema",
        "json_schema": {
            "name": "calendar_event",
            "schema": {
                "type": "object",
                "properties": {
                    "title": {"type": "string"},
                    "date": {"type": "string"},
                    "participants": {"type": "array", "items": {"type": "string"}}
                },
                "required": ["title", "date", "participants"],
                "additionalProperties": False
            }
        }
    }
}

response = client.chat.completions.create(**request)

# O modelo devolve JSON válido no content quando obedece ao schema.
event = json.loads(response.choices[0].message.content)

print(event["title"])
print(event["date"])
print(event["participants"])
