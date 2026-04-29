import requests

# sglang JSON constrained output — guided_decode com JSON schema
# O modelo é forçado a gerar apenas JSON válido seguindo o schema
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
        "text": "Crie um perfil de desenvolvedor:",
        "sampling_params": {
            "guided_json": schema,
            "max_new_tokens": 128,
        },
    },
)

# Resultado é JSON válido — pode ser parseado diretamente
import json
result = json.loads(response.json()["text"])
print(f"Nome: {result['name']}, Idade: {result['age']}")
print(f"Skills: {result['skills']}")
