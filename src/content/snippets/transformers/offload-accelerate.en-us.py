from transformers import AutoModelForCausalLM

# Loading with automatic offload between GPU and CPU
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3-70B",
    device_map="auto",
    max_memory={
        "cuda:0": "20GB", # GPU Limit
        "cpu": "64GB"     # Rest in system RAM
    }
)
