from openai import OpenAI

client = OpenAI()

# Usar tool calling APENAS para extração de dados
# A "ferramenta" é na verdade um schema de parsing
tools = [
    {
        "type": "function",
        "function": {
            "name": "extract_entities",
            "description": "Extrai entidades nomeadas de um texto: pessoas, locais, datas, valores",
            "parameters": {
                "type": "object",
                "properties": {
                    "persons": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "Nomes de pessoas mencionadas",
                    },
                    "locations": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "Locais mencionados",
                    },
                    "dates": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "Datas mencionadas",
                    },
                    "amounts": {
                        "type": "array",
                        "items": {"type": "number"},
                        "description": "Valores monetários mencionados",
                    },
                },
                "required": ["persons", "locations"],
            },
        },
    }
]

text = "João viajou para São Paulo em 15 de março e gastou R$ 2.500."

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": f"Extraia entidades: {text}"}],
    tools=tools,
    tool_choice={"type": "function", "function": {"name": "extract_entities"}},  # FORÇA uso da tool
)

# O modelo retorna JSON estruturado como tool_call
import json
tc = response.choices[0].message.tool_calls[0]
entities = json.loads(tc.function.arguments)
print(json.dumps(entities, indent=2))
# {
#   "persons": ["João"],
#   "locations": ["São Paulo"],
#   "dates": ["15 de março"],
#   "amounts": [2500]
# }
