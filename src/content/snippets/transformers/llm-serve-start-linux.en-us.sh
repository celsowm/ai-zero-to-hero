# 1. Install serving dependencies
pip install pillow transformers[serving]

# 2. Start the server (model loads once, stays in memory)
transformers serve Qwen/Qwen3.5-0.8B \
  --quantization bnb-4bit \
  --port 8000

# 3. Check server is up
curl http://localhost:8000/health

# 4. List available models
curl http://localhost:8000/v1/models

# 5. Make a chat request
curl http://localhost:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "Qwen/Qwen3.5-0.8B",
    "messages": [{"role": "user", "content": "What is an LLM?"}],
    "max_tokens": 100
  }'
