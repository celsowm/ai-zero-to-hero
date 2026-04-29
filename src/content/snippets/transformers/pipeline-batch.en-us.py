from transformers import pipeline

# Pipeline with batch inference — processes multiple prompts at once
# This is more efficient than calling the model individually for each text
generator = pipeline("text-generation", model="gpt2", batch_size=4)

# List of prompts to process in batch
prompts = [
    "The sun rose on the horizon when",
    "Modern technology allows us to",
    "In the future, computers will be able to",
    "Data science has revealed that",
]

# Batch execution — returns list of results in the same order
results = generator(prompts, max_length=40, do_sample=True)

for prompt, res in zip(prompts, results):
    print(f"Prompt: {prompt}")
    print(f"  → {res[0]['generated_text']}")
    print()
