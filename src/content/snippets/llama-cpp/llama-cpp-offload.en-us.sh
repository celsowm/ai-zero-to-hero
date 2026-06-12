# Example: start with auto-fit before locking a manual -ngl
llama-cli -hf Jackrong/Qwopus3.6-27B-v2-GGUF:Q4_K_M \
  --fit on \
  --fit-target 1536 \
  --fit-ctx 4096 \
  -c 8192 \
  -ub 1024 \
  -n 256 \
  -p "Explain GPU offload in one sentence."
