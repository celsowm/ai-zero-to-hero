import os
from transformers import AutoTokenizer, AutoModelForCausalLM

# --- Onde o modelo fica na máquina? ---
# Por padrão, Hugging Face salva em ~/.cache/huggingface/hub/
# Cada modelo ganha uma pasta com hash único

cache_dir = os.path.expanduser("~/.cache/huggingface/hub")
print(f"Cache padrão: {cache_dir}")
print(f"Existe? {os.path.exists(cache_dir)}")

# Se existir cache, listar modelos baixados
if os.path.exists(cache_dir):
    repos = [d for d in os.listdir(cache_dir) if d.startswith("models--")]
    print(f"Modelos em cache: {len(repos)}")
    for repo in repos[:3]:
        print(f"  - {repo.replace('models--', '').replace('--', '/')}")

# --- Download em path customizado ---
# Útil para: ambientes restritos, múltiplas versões, CI/CD
custom_cache = "./meus-modelos"

# tokenizer = AutoTokenizer.from_pretrained(
#     "gpt2",
#     cache_dir=custom_cache,
#     local_files_only=False  # força download se não tiver em cache
# )

# model = AutoModelForCausalLM.from_pretrained(
#     "gpt2",
#     cache_dir=custom_cache
# )

print()
print("Para baixar em um path customizado:")
print('  AutoTokenizer.from_pretrained("gpt2", cache_dir="./meus-modelos")')
print('  AutoModelForCausalLM.from_pretrained("gpt2", cache_dir="./meus-modelos")')

# --- SafeTensors ---
# Formato moderno de armazenamento de pesos (mais seguro que .bin/.pt)
# Arquivo: model.safetensors (em vez de pytorch_model.bin)
# Vantagens: carregamento mais rápido, sem execução de código arbitrário

print()
print("SafeTensors:")
print("  - Arquivo: model.safetensors (substitui pytorch_model.bin)")
print("  - Mais rápido: mmap direto para memória, sem deserialização")
print("  - Mais seguro: não executa código arbitrário durante o load")
print("  - Padrão no Hub desde 2023")
