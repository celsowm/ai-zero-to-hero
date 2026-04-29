# curl request para /v1/chat/completions
# Formato padrão da OpenAI API — compatível com vLLM, Ollama, TGI, etc.

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

# Campos principais:
# model       — nome do modelo a usar
# messages    — lista de mensagens com role (system/user/assistant)
# max_tokens  — limite de tokens na resposta
# temperature — criatividade (0=determinístico, 1=criativo)
# stream      — true para SSE, false para resposta completa
