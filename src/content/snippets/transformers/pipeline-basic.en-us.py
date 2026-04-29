from transformers import pipeline

# Basic text generation pipeline
# The pipeline() function abstracts model, tokenizer, and generation loop
generator = pipeline("text-generation", model="gpt2")

# Generate text from a prompt
result = generator("Once upon a time,", max_length=50, do_sample=True)
print(result[0]["generated_text"])
