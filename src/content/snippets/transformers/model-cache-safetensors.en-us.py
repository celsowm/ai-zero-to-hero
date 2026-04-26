import os
from transformers import AutoTokenizer, AutoModelForCausalLM

# --- Where does the model live on disk? ---
# By default, Hugging Face saves to ~/.cache/huggingface/hub/
# Each model gets a uniquely hashed folder

cache_dir = os.path.expanduser("~/.cache/huggingface/hub")
print(f"Default cache: {cache_dir}")
print(f"Exists? {os.path.exists(cache_dir)}")

# If cache exists, list downloaded models
if os.path.exists(cache_dir):
    repos = [d for d in os.listdir(cache_dir) if d.startswith("models--")]
    print(f"Models in cache: {len(repos)}")
    for repo in repos[:3]:
        print(f"  - {repo.replace('models--', '').replace('--', '/')}")

# --- Custom download path ---
# Useful for: restricted environments, multiple versions, CI/CD
custom_cache = "./my-models"

# tokenizer = AutoTokenizer.from_pretrained(
#     "gpt2",
#     cache_dir=custom_cache,
#     local_files_only=False  # force download if not cached
# )

# model = AutoModelForCausalLM.from_pretrained(
#     "gpt2",
#     cache_dir=custom_cache
# )

print()
print("To download to a custom path:")
print('  AutoTokenizer.from_pretrained("gpt2", cache_dir="./my-models")')
print('  AutoModelForCausalLM.from_pretrained("gpt2", cache_dir="./my-models")')

# --- SafeTensors ---
# Modern weight storage format (safer than .bin/.pt)
# File: model.safetensors (replaces pytorch_model.bin)
# Benefits: faster loading, no arbitrary code execution

print()
print("SafeTensors:")
print("  - File: model.safetensors (replaces pytorch_model.bin)")
print("  - Faster: direct mmap into memory, no deserialization")
print("  - Safer: no arbitrary code execution during load")
print("  - Hub default since 2023")
