from openai import OpenAI

client = OpenAI()

# Use tool calling ONLY for data extraction
# The "tool" is actually a parsing schema
tools = [
    {
        "type": "function",
        "function": {
            "name": "extract_entities",
            "description": "Extracts named entities from text: people, locations, dates, amounts",
            "parameters": {
                "type": "object",
                "properties": {
                    "persons": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "Names of people mentioned",
                    },
                    "locations": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "Locations mentioned",
                    },
                    "dates": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "Dates mentioned",
                    },
                    "amounts": {
                        "type": "array",
                        "items": {"type": "number"},
                        "description": "Monetary values mentioned",
                    },
                },
                "required": ["persons", "locations"],
            },
        },
    }
]

text = "João traveled to São Paulo on March 15 and spent R$ 2,500."

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": f"Extract entities: {text}"}],
    tools=tools,
    tool_choice={"type": "function", "function": {"name": "extract_entities"}},  # FORCES tool use
)

# Model returns structured JSON as tool_call
import json
tc = response.choices[0].message.tool_calls[0]
entities = json.loads(tc.function.arguments)
print(json.dumps(entities, indent=2))
# {
#   "persons": ["João"],
#   "locations": ["São Paulo"],
#   "dates": ["March 15"],
#   "amounts": [2500]
# }
