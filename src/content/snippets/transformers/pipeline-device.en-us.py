from transformers import pipeline
import torch

# Pipeline with device_map="auto" to automatically use GPU when available
# If GPU is available, model is loaded onto it; otherwise falls back to CPU
generator = pipeline(
    "text-generation",
    model="gpt2",
    device_map="auto",
)

# Generation leveraging GPU acceleration
result = generator(
    "The future of artificial intelligence",
    max_length=60,
    do_sample=True,
    temperature=0.8,
)
print(result[0]["generated_text"])
