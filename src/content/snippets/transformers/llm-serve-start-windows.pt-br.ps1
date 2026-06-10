# 1. Instalar as dependências de serving
pip install pillow transformers[serving]

# 2. Iniciar o servidor (carrega o modelo uma vez, fica na memória)
transformers serve Qwen/Qwen3.5-0.8B `
  --quantization bnb-4bit `
  --port 8000

# 3. Verificar que o servidor está no ar
Invoke-RestMethod -Uri "http://localhost:8000/health"

# 4. Listar modelos disponíveis
Invoke-RestMethod -Uri "http://localhost:8000/v1/models"

# 5. Fazer uma requisição de chat (usando Invoke-RestMethod no PowerShell)
Invoke-RestMethod -Uri "http://localhost:8000/v1/chat/completions" `
  -Method Post `
  -ContentType "application/json" `
  -Body @'
{
  "model": "Qwen/Qwen3.5-0.8B",
  "messages": [{"role": "user", "content": "O que é um LLM?"}],
  "max_tokens": 100
}
'@
