from transformers import AutoModelForCausalLM

# Carregando com offload automático entre GPU e CPU
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3-70B",
    device_map="auto",
    max_memory={
        "cuda:0": "20GB", # Limite na GPU
        "cpu": "64GB"     # Resto na RAM do sistema
    }
)
