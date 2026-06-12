import json
import requests

ENDPOINT = "http://localhost:8000"
MODELS_URL = f"{ENDPOINT}/v1/models"
CHAT_COMPLETIONS_URL = f"{ENDPOINT}/v1/chat/completions"

PROCESSOS = [
    {
        "numero": "PGE/000123/2026",
        "especializada": "PG04",
        "nome_especializada": "Ações de Servidor Público",
        "assunto": "Ação de cobrança de vantagem funcional",
        "autor": "João da Silva",
        "status": "em andamento",
    },
    {
        "numero": "PGE/000456/2026",
        "especializada": "PG04",
        "nome_especializada": "Ações de Servidor Público",
        "assunto": "Mandado de segurança sobre progressão funcional",
        "autor": "Maria Oliveira",
        "status": "aguardando manifestação",
    },
    {
        "numero": "PGE/000789/2026",
        "especializada": "PG13",
        "nome_especializada": "Gabinete",
        "assunto": "Consulta administrativa interna",
        "autor": "Secretaria de Estado de Fazenda",
        "status": "concluído",
    },
    {
        "numero": "PGE/000999/2026",
        "especializada": "PG04",
        "nome_especializada": "Ações de Servidor Público",
        "assunto": "Ação ordinária de servidor público",
        "autor": "Carlos Pereira",
        "status": "em análise",
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
        raise RuntimeError("Nenhum modelo foi retornado pela rota /v1/models")

    model_id = models[0].get("id")

    if not model_id:
        raise RuntimeError("O primeiro modelo retornado não possui campo 'id'")

    return model_id


MODEL = obter_model_id()

print("\n--- MODEL ID DETECTADO ---")
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
                "Lista processos do PGE Digital. "
                "Os processos usam o formato PGE/numero/ano."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "especializada": {
                        "type": "string",
                        "description": (
                            "Código da especializada. "
                            "Use PG13 para Gabinete e PG04 para Ações de Servidor Público."
                        ),
                    },
                    "status": {
                        "type": "string",
                        "description": (
                            "Status do processo, por exemplo: em andamento, concluído, "
                            "em análise ou aguardando manifestação."
                        ),
                    },
                    "autor": {
                        "type": "string",
                        "description": "Nome do autor do processo.",
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
        "content": "Liste apenas os números dos processos da pg04 em ordem decrescente",
    },
]


primeira_resposta = chamar_llama_cpp(
    messages=messages,
    tools=tools,
    tool_choice="auto",
)

print("\n--- RESPOSTA BRUTA DO LLAMA.CPP ---")
print(json.dumps(primeira_resposta, ensure_ascii=False, indent=2))

assistant_message = primeira_resposta["choices"][0]["message"]
messages.append(assistant_message)

tool_calls = assistant_message.get("tool_calls")

if not tool_calls:
    print("\n--- O MODELO NÃO CHAMOU TOOL ---")
    print(assistant_message.get("content"))
    raise SystemExit


for tool_call in tool_calls:
    function_name = tool_call["function"]["name"]
    raw_arguments = tool_call["function"].get("arguments") or "{}"

    try:
        arguments = json.loads(raw_arguments)
    except json.JSONDecodeError:
        print("\nErro ao decodificar argumentos da tool:")
        print(raw_arguments)
        raise

    print("\n--- TOOL CHAMADA PELO MODELO ---")
    print("Nome:", function_name)
    print("Argumentos:", arguments)

    if function_name == "listar_processos":
        result = listar_processos(**arguments)
    else:
        raise ValueError(f"Tool desconhecida: {function_name}")

    print("\n--- RESULTADO DA TOOL PYTHON ---")
    print(json.dumps(result, ensure_ascii=False, indent=2))

    messages.append(
        {
            "role": "tool",
            "tool_call_id": tool_call["id"],
            "content": json.dumps(result, ensure_ascii=False),
        }
    )


segunda_resposta = chamar_llama_cpp(messages=messages)

print("\n--- RESPOSTA FINAL BRUTA ---")
print(json.dumps(segunda_resposta, ensure_ascii=False, indent=2))

print("\n--- RESPOSTA FINAL DO MODELO ---")
print(segunda_resposta["choices"][0]["message"]["content"])
