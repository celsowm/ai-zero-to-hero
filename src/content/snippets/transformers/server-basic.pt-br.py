# transformers server OpenAI-compatible
# Execute no terminal:
#   transformers serve gpt2 --port 8000
#
# Isso inicia um servidor local que responde no formato OpenAI API:
#
# curl http://localhost:8000/v1/chat/completions \
#   -H "Content-Type: application/json" \
#   -d '{
#     "model": "gpt2",
#     "messages": [{"role": "user", "content": "Hello, tell me a story"}],
#     "max_tokens": 50
#   }'
#
# Útil para testar integrações sem precisar de uma chave de API externa.
