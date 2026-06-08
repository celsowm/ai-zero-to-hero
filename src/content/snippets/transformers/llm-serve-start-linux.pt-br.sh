# 1. Instalar as dependências de serving
pip install transformers[serving]

# 2. Iniciar o servidor (carrega o modelo uma vez, fica na memória)
transformers serve Qwen/Qwen3-0.5B \
  --quantization bnb-4bit \
  --port 8000

# 3. Verificar que o servidor está no ar
curl http://localhost:8000/health

# 4. Listar modelos disponíveis
curl http://localhost:8000/v1/models

# 5. Fazer uma requisição de chat
curl http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "Qwen/Qwen3-0.5B",
    "messages": [{"role": "user", "content": "O que é um LLM?"}],
    "max_tokens": 100
  }'
