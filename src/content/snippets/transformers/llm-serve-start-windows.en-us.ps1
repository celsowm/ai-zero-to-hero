# 1. Install serving dependencies
pip install pillow transformers[serving]

# 2. Start the server (model loads once, stays in memory)
transformers serve Qwen/Qwen3.5-0.8B `
  --quantization bnb-4bit `
  --port 8000

# 3. Check server is up
Invoke-RestMethod -Uri "http://localhost:8000/health"

# 4. List available models
Invoke-RestMethod -Uri "http://localhost:8000/v1/models"

# 5. Make a chat request (using Invoke-RestMethod in PowerShell)
$body = @{
  model = "Qwen/Qwen3.5-0.8b"
  messages = @(
    @{
      role = "user"
      content = "What is an LLM?"
    }
  )
  max_tokens = 300
} | ConvertTo-Json -Depth 10

$response = Invoke-RestMethod `
  -Uri "http://localhost:8000/v1/chat/completions" `
  -Method Post `
  -ContentType "application/json; charset=utf-8" `
  -Body ([System.Text.Encoding]::UTF8.GetBytes($body))

$response.choices[0].message.content
