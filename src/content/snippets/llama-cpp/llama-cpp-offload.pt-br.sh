# Exemplo: começar com auto-fit antes de travar um -ngl manual
llama-server -hf Jackrong/Qwopus3.6-27B-v2-GGUF:Q4_K_M \
  --fit on \
  --fit-target 1536 \
  --fit-ctx 4096 \
  -c 8192 \
  -ub 1024
