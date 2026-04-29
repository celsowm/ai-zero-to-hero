import requests

# sglang Regex constrained output — guided_decode com regex pattern
# O modelo é forçado a seguir um formato exato de texto
# Padrão para extrair: ID, nome, nota (ex: "ID: 42, Nome: Ana, Nota: 9.5")
regex_pattern = r"ID: \d+, Nome: [A-Za-z ]+, Nota: \d+\.\d"

response = requests.post(
    "http://localhost:30000/generate",
    json={
        "text": "Gere um registro de aluno no formato ID: X, Nome: Y, Nota: Z",
        "sampling_params": {
            "guided_regex": regex_pattern,
            "max_new_tokens": 64,
        },
    },
)

# A saída sempre bate com o regex — sem need de validação extra
output = response.json()["text"]
print(f"Registro gerado: {output}")
