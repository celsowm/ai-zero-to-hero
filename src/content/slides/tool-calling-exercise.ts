import { defineSlide } from './_factory';

export const toolCallingExercise = defineSlide({
  id: 'tool-calling-exercise',
  type: 'exercise',
  content: {
    'pt-br': {
      title: 'Exercício: Fix the Bug — Tool Calling Loop',
      body: `O loop de Tool Calling abaixo tem **dois bugs**: o resultado não é vinculado corretamente e os argumentos não são parseados. Encontre e corrija.`,
    },
    'en-us': {
      title: 'Exercise: Fix the Bug — Tool Calling Loop',
      body: `The Tool Calling loop below has **two bugs**: the result is not properly linked and the arguments are not parsed. Find and fix them.`,
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      'pt-br': {
        title: 'Exercício: Fix the Bug — Tool Calling Loop',
        description: 'Encontre e corrija os bugs no loop de Tool Calling.',
        runButtonLabel: 'Executar',
        checkButtonLabel: 'Verificar',
        successMessage: 'Parabéns! Tool Calling Loop corrigido com sucesso!',
        errorMessage: 'Alguns testes falharam. Revise o código.',
        hintLabel: 'Dica',
        outputLabel: 'Saída',
        exercises: [
          {
            id: '1. tool_call_id missing e arguments não parseados',
            instructions: 'O loop de Tool Calling tem dois bugs: (1) a mensagem de resultado usa `id` ao invés de `tool_call_id`, quebrando o vínculo. (2) `tool_call["function"]["arguments"]` é uma string JSON mas é usada como dict. Corrija: use `tool_call_id=tool_call["id"]` e `json.loads(args_str)`.',
            starterCode: '# Tool Calling Loop com BUGs\nimport json\n\ntools = [\n    {\n        "type": "function",\n        "function": {\n            "name": "get_weather",\n            "description": "Gets weather for a city",\n            "parameters": {\n                "type": "object",\n                "properties": {"city": {"type": "string"}},\n                "required": ["city"],\n            },\n        },\n    }\n]\n\n# Simulated LLM responses\nresponses = [\n    {\n        "role": "assistant",\n        "tool_calls": [{\n            "id": "call_123",\n            "type": "function",\n            "function": {\n                "name": "get_weather",\n                "arguments": \'{"city": "Sao Paulo"}\',  # string JSON!\n            },\n        }],\n    },\n    {"role": "assistant", "content": "Sao Paulo: 23C, sunny"},\n]\n\ndef mock_tool_result(city: str) -> str:\n    return f"23C, sunny in {city}"\n\nmessages = [{"role": "user", "content": "Weather in Sao Paulo?"}]\n\n# BUG 1: arguments is a string, not parsed\n# BUG 2: wrong key for linking result\nfor resp in responses:\n    if "tool_calls" in resp:\n        for tc in resp["tool_calls"]:\n            args = tc["function"]["arguments"]  # BUG: not parsed!\n            city = args.get("city", "unknown")   # BUG: args is str!\n            result = mock_tool_result(city)\n            messages.append({\n                "role": "tool",\n                "id": tc["id"],  # BUG: should be tool_call_id!\n                "content": result,\n            })\n\nprint("Messages:", json.dumps(messages, indent=2))',
            validators: [
              {
                type: 'assertOutput',
                expected: 'tool_call_id',
              },
            ],
            hints: [
              'args = tc["function"]["arguments"] retorna uma string, não dict.',
              'Use json.loads(tc["function"]["arguments"]) para parsear.',
              'A chave correta é tool_call_id, não id.',
            ],
          },
        ],
      },
      'en-us': {
        title: 'Exercise: Fix the Bug — Tool Calling Loop',
        description: 'Find and fix the bugs in the Tool Calling loop.',
        runButtonLabel: 'Run',
        checkButtonLabel: 'Check',
        successMessage: 'Congratulations! Tool Calling Loop fixed successfully!',
        errorMessage: 'Some tests failed. Please review the code.',
        hintLabel: 'Hint',
        outputLabel: 'Output',
        exercises: [
          {
            id: '1. tool_call_id missing and arguments not parsed',
            instructions: 'The Tool Calling loop has two bugs: (1) the result message uses `id` instead of `tool_call_id`, breaking the link. (2) `tool_call["function"]["arguments"]` is a JSON string but is used as a dict. Fix: use `tool_call_id=tool_call["id"]` and `json.loads(args_str)`.',
            starterCode: '# Tool Calling Loop with BUGs\nimport json\n\ntools = [\n    {\n        "type": "function",\n        "function": {\n            "name": "get_weather",\n            "description": "Gets weather for a city",\n            "parameters": {\n                "type": "object",\n                "properties": {"city": {"type": "string"}},\n                "required": ["city"],\n            },\n        },\n    }\n]\n\n# Simulated LLM responses\nresponses = [\n    {\n        "role": "assistant",\n        "tool_calls": [{\n            "id": "call_123",\n            "type": "function",\n            "function": {\n                "name": "get_weather",\n                "arguments": \'{"city": "Sao Paulo"}\',  # string JSON!\n            },\n        }],\n    },\n    {"role": "assistant", "content": "Sao Paulo: 23C, sunny"},\n]\n\ndef mock_tool_result(city: str) -> str:\n    return f"23C, sunny in {city}"\n\nmessages = [{"role": "user", "content": "Weather in Sao Paulo?"}]\n\n# BUG 1: arguments is a string, not parsed\n# BUG 2: wrong key for linking result\nfor resp in responses:\n    if "tool_calls" in resp:\n        for tc in resp["tool_calls"]:\n            args = tc["function"]["arguments"]  # BUG: not parsed!\n            city = args.get("city", "unknown")   # BUG: args is str!\n            result = mock_tool_result(city)\n            messages.append({\n                "role": "tool",\n                "id": tc["id"],  # BUG: should be tool_call_id!\n                "content": result,\n            })\n\nprint("Messages:", json.dumps(messages, indent=2))',
            validators: [
              {
                type: 'assertOutput',
                expected: 'tool_call_id',
              },
            ],
            hints: [
              'args = tc["function"]["arguments"] returns a string, not a dict.',
              'Use json.loads(tc["function"]["arguments"]) to parse.',
              'The correct key is tool_call_id, not id.',
            ],
          },
        ],
      },
    },
  },
});
