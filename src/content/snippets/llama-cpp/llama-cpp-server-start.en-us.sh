./llama-server \
  -hf unsloth/gemma-4-E4B-it-GGUF:Q4_K_M \
  --host 127.0.0.1 \
  --port 8000 \
  -ngl 999 \
  -c 8192