# region: rag-hallucination
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("gpt2")
tokenizer = AutoTokenizer.from_pretrained("gpt2")

# Question about something specific the model doesn't know
prompt = "What is the chemical formula for Unobtainium?"

inputs = tokenizer(prompt, return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=30, do_sample=False)
print(tokenizer.decode(outputs[0], skip_special_tokens=True))
# Unobtainium does NOT exist. But the model will invent a formula.
# This is "hallucination": generating plausible but factually wrong text.
# Without external verification, there's no way for the model to know it's making things up.
# endregion
