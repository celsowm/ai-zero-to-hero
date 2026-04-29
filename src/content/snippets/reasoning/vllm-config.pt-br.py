# vLLM config para Reasoning Models

# vLLM suporta reasoning models mas precisa de ajustes

# 1. Instalar vLLM com suporte ao modelo
# pip install vllm

# 2. Serve com max_tokens aumentado (reasoning gera muitos tokens)
# Default e 2048, mas thinking pode precisar de 8192+
vllm serve meta-llama/Llama-3-70B \
    --max-model-len 16384 \
    --max-num-batched-tokens 32768 \
    --gpu-memory-utilization 0.95 \
    --enable-chunked-prefill \
    --max-num-seqs 128

# 3. Client com vLLM (OpenAI-compatible)
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="not-needed"
)

response = client.chat.completions.create(
    model="meta-llama/Llama-3-70B",
    messages=[{"role": "user", "content": "Resolva: integral de x^2 de 0 a 3"}],
    max_tokens=8192,  # Importante: aumentar para reasoning
    temperature=0.7
)

print(f"Generated {response.usage.total_tokens} tokens")
print(response.choices[0].message.content)

# Notas importantes:
# - PagedAttention funciona normalmente com thinking tokens
# - Continuous batching pode ser mais lento com reasoning (mais tokens por request)
# - Ajustar --max-num-seqs para evitar OOM com thinking longo
