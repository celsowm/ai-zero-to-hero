import json
import requests

ENDPOINT = "http://localhost:8000"
MODELS_URL = f"{ENDPOINT}/v1/models"
CHAT_COMPLETIONS_URL = f"{ENDPOINT}/v1/chat/completions"

PROCESSOS = [
    {
        "numero": "PGE/000123/2026",
        "especializada": "PG04",
        "nome_especializada": "Public Employee Actions",
        "assunto": "Claim for functional compensation",
        "autor": "Joao da Silva",
        "status": "in progress",
    },
    {
        "numero": "PGE/000456/2026",
        "especializada": "PG04",
        "nome_especializada": "Public Employee Actions",
        "assunto": "Mandamus on career progression",
        "autor": "Maria Oliveira",
        "status": "awaiting response",
    },
    {
        "numero": "PGE/000789/2026",
        "especializada": "PG13",
        "nome_especializada": "Cabinet",
        "assunto": "Internal administrative inquiry",
        "autor": "State Department of Finance",
        "status": "completed",
    },
    {
        "numero": "PGE/000999/2026",
        "especializada": "PG04",
        "nome_especializada": "Public Employee Actions",
        "assunto": "Ordinary public employee lawsuit",
        "autor": "Carlos Pereira",
        "status": "under review",
    },
]


def obter_model_id():
    response = requests.get(
        MODELS_URL,
        headers={"Accept": "application/json"},
        timeout=30,
    )

    response.raise_for_status()
    data = response.json()

    models = data.get("data", [])

    if not models:
        raise RuntimeError("No model was returned by the /v1/models route")

    model_id = models[0].get("id")

    if not model_id:
        raise RuntimeError("The first returned model does not have an 'id' field")

    return model_id


MODEL = obter_model_id()

print("\n--- DETECTED MODEL ID ---")
print(MODEL)


def listar_processos(especializada=None, status=None, autor=None):
    resultados = PROCESSOS

    if especializada:
        resultados = [
            p for p in resultados
            if p["especializada"].lower() == especializada.lower()
        ]

    if status:
        resultados = [
            p for p in resultados
            if p["status"].lower() == status.lower()
        ]

    if autor:
        resultados = [
            p for p in resultados
            if autor.lower() in p["autor"].lower()
        ]

    return {
        "total": len(resultados),
        "processos": resultados,
    }


def chamar_llama_cpp(messages, tools=None, tool_choice=None):
    payload = {
        "model": MODEL,
        "messages": messages,
        "temperature": 0,
    }

    if tools is not None:
        payload["tools"] = tools

    if tool_choice is not None:
        payload["tool_choice"] = tool_choice

    response = requests.post(
        CHAT_COMPLETIONS_URL,
        headers={"Content-Type": "application/json"},
        json=payload,
        timeout=120,
    )

    response.raise_for_status()
    return response.json()


tools = [
    {
        "type": "function",
        "function": {
            "name": "listar_processos",
            "description": (
                "Lists cases from the internal case system. "
                "Cases use the PGE/number/year format."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "especializada": {
                        "type": "string",
                        "description": (
                            "Department code. "
                            "Use PG13 for Cabinet and PG04 for Public Employee Actions."
                        ),
                    },
                    "status": {
                        "type": "string",
                        "description": (
                            "Case status, for example: in progress, completed, "
                            "under review, or awaiting response."
                        ),
                    },
                    "autor": {
                        "type": "string",
                        "description": "Name of the case author.",
                    },
                },
                "required": [],
            },
        },
    }
]


messages = [
    {
        "role": "user",
        "content": "List only the case numbers from pg04 in descending order",
    },
]


primeira_resposta = chamar_llama_cpp(
    messages=messages,
    tools=tools,
    tool_choice="auto",
)

print("\n--- RAW LLAMA.CPP RESPONSE ---")
print(json.dumps(primeira_resposta, ensure_ascii=False, indent=2))

assistant_message = primeira_resposta["choices"][0]["message"]
messages.append(assistant_message)

tool_calls = assistant_message.get("tool_calls")

if not tool_calls:
    print("\n--- MODEL DID NOT CALL A TOOL ---")
    print(assistant_message.get("content"))
    raise SystemExit


for tool_call in tool_calls:
    function_name = tool_call["function"]["name"]
    raw_arguments = tool_call["function"].get("arguments") or "{}"

    try:
        arguments = json.loads(raw_arguments)
    except json.JSONDecodeError:
        print("\nError decoding tool arguments:")
        print(raw_arguments)
        raise

    print("\n--- TOOL CALLED BY THE MODEL ---")
    print("Name:", function_name)
    print("Arguments:", arguments)

    if function_name == "listar_processos":
        result = listar_processos(**arguments)
    else:
        raise ValueError(f"Unknown tool: {function_name}")

    print("\n--- PYTHON TOOL RESULT ---")
    print(json.dumps(result, ensure_ascii=False, indent=2))

    messages.append(
        {
            "role": "tool",
            "tool_call_id": tool_call["id"],
            "content": json.dumps(result, ensure_ascii=False),
        }
    )


segunda_resposta = chamar_llama_cpp(messages=messages)

print("\n--- RAW FINAL RESPONSE ---")
print(json.dumps(segunda_resposta, ensure_ascii=False, indent=2))

print("\n--- FINAL MODEL ANSWER ---")
print(segunda_resposta["choices"][0]["message"]["content"])
