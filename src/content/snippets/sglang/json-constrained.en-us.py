import requests

# sglang JSON constrained output — guided_decode with JSON schema
# The model is forced to generate only valid JSON following the schema
schema = {
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "age": {"type": "integer"},
        "skills": {"type": "array", "items": {"type": "string"}},
    },
    "required": ["name", "age", "skills"],
}

response = requests.post(
    "http://localhost:30000/generate",
    json={
        "text": "Create a developer profile:",
        "sampling_params": {
            "guided_json": schema,
            "max_new_tokens": 128,
        },
    },
)

# Result is valid JSON — can be parsed directly
import json
result = json.loads(response.json()["text"])
print(f"Name: {result['name']}, Age: {result['age']}")
print(f"Skills: {result['skills']}")
