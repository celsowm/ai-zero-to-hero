# OpenAI API JSON response format
# Example response returned by /v1/chat/completions

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
                "content": "Python is a programming language..."
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

# Access response content:
# content = response["choices"][0]["message"]["content"]
# tokens  = response["usage"]["total_tokens"]
