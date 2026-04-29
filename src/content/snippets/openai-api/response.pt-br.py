# Formato de resposta JSON da OpenAI API
# Exemplo de response retornado por /v1/chat/completions

response = {
    "id": "chatcmpl-123",
    "object": "chat.completion",
    "created": 1700000000,
    "model": "gpt2",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "Python é uma linguagem de programação..."
            },
            "finish_reason": "stop"  # "stop" | "length" | "tool_calls"
        }
    ],
    "usage": {
        "prompt_tokens": 15,
        "completion_tokens": 28,
        "total_tokens": 43
    }
}

# Acessar conteúdo da resposta:
# content = response["choices"][0]["message"]["content"]
# tokens  = response["usage"]["total_tokens"]
