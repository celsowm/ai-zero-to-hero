from transformers import AutoModelForCausalLM, AutoTokenizer

model_name = "gpt2"
prompt = "We the people"

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

inputs = tokenizer(prompt, return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=20)

generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(generated_text)
