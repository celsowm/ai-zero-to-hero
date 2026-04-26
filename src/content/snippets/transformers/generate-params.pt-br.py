from transformers import AutoTokenizer, AutoModelForCausalLM

model_name = "gpt2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

prompt = "The future of AI is"
inputs = tokenizer(prompt, return_tensors="pt")

# --- Greedy (sem criatividade) ---
output_greedy = model.generate(**inputs, max_new_tokens=15, do_sample=False)
print("GREEDY (determinístico):")
print(tokenizer.decode(output_greedy[0], skip_special_tokens=True))
print()

# --- Sample com temperatura alta (caótico) ---
output_hot = model.generate(**inputs, max_new_tokens=15, do_sample=True, temperature=1.5)
print("SAMPLE (temperature=1.5, caótico):")
print(tokenizer.decode(output_hot[0], skip_special_tokens=True))
print()

# --- Sample com temperatura baixa (conservador) ---
output_cold = model.generate(**inputs, max_new_tokens=15, do_sample=True, temperature=0.3)
print("SAMPLE (temperature=0.3, conservador):")
print(tokenizer.decode(output_cold[0], skip_special_tokens=True))
print()

# --- Top-k (filtra top 50 tokens) ---
output_topk = model.generate(**inputs, max_new_tokens=15, do_sample=True, top_k=50)
print("TOP-K (k=50):")
print(tokenizer.decode(output_topk[0], skip_special_tokens=True))
print()

# --- Top-p / nucleus (filtra por probabilidade cumulativa) ---
output_topp = model.generate(**inputs, max_new_tokens=15, do_sample=True, top_p=0.9)
print("TOP-P (p=0.9, nucleus):")
print(tokenizer.decode(output_topp[0], skip_special_tokens=True))
