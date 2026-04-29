# vLLM config for Reasoning Models

# vLLM supports reasoning models but needs adjustments

# 1. Install vLLM with model support
# pip install vllm

# 2. Serve with increased max_tokens (reasoning generates many tokens)
# Default is 2048, but thinking may need 8192+
vllm serve meta-llama/Llama-3-70B \
    --max-model-len 16384 \
    --max-num-batched-tokens 32768 \
    --gpu-memory-utilization 0.95 \
    --enable-chunked-prefill \
    --max-num-seqs 128

# 3. Client with vLLM (OpenAI-compatible)
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="not-needed"
)

response = client.chat.completions.create(
    model="meta-llama/Llama-3-70B",
    messages=[{"role": "user", "content": "Solve: integral of x^2 from 0 to 3"}],
    max_tokens=8192,  # Important: increase for reasoning
    temperature=0.7
)

print(f"Generated {response.usage.total_tokens} tokens")
print(response.choices[0].message.content)

# Important notes:
# - PagedAttention works normally with thinking tokens
# - Continuous batching may be slower with reasoning (more tokens per request)
# - Adjust --max-num-seqs to avoid OOM with long thinking
