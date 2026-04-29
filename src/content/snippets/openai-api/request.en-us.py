# curl request to /v1/chat/completions
# Standard OpenAI API format — compatible with vLLM, Ollama, TGI, etc.

curl http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt2",
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "What is Python?"}
    ],
    "max_tokens": 100,
    "temperature": 0.7,
    "stream": false
  }'

# Key fields:
# model       — which model to use
# messages    — list of messages with role (system/user/assistant)
# max_tokens  — token limit in the response
# temperature — creativity (0=deterministic, 1=creative)
# stream      — true for SSE, false for complete response
