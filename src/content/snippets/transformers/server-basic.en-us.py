# transformers server OpenAI-compatible
# Run in the terminal:
#   transformers-cli serve --model gpt2 --port 8000
#
# This starts a local server that responds in the OpenAI API format:
#
# curl http://localhost:8000/v1/chat/completions \
#   -H "Content-Type: application/json" \
#   -d '{
#     "model": "gpt2",
#     "messages": [{"role": "user", "content": "Hello, tell me a story"}],
#     "max_tokens": 50
#   }'
#
# Useful for testing integrations without needing an external API key.
