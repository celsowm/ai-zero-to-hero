# Exemplo: mover parte das camadas para a GPU
llama-cli -hf unsloth/Qwen3-8B-GGUF:Q4_K_M \
  -ngl 35 \
  -c 8192 \
  -fa \
  -ub 1024 \
  -n 256 \
  -p "Explique GPU offload em uma frase."
