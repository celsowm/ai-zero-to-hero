from transformers import AutoTokenizer, AutoModelForCausalLM

model_name = "gpt2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

prompt = "The future of AI is"
inputs = tokenizer(prompt, return_tensors="pt")

# --- Greedy (no creativity) ---
output_greedy = model.generate(**inputs, max_new_tokens=15, do_sample=False)
print("GREEDY (deterministic):")
print(tokenizer.decode(output_greedy[0], skip_special_tokens=True))
print()

# --- Sample with high temperature (chaotic) ---
output_hot = model.generate(**inputs, max_new_tokens=15, do_sample=True, temperature=1.5)
print("SAMPLE (temperature=1.5, chaotic):")
print(tokenizer.decode(output_hot[0], skip_special_tokens=True))
print()

# --- Sample with low temperature (conservative) ---
output_cold = model.generate(**inputs, max_new_tokens=15, do_sample=True, temperature=0.3)
print("SAMPLE (temperature=0.3, conservative):")
print(tokenizer.decode(output_cold[0], skip_special_tokens=True))
print()

# --- Top-k (filter top 50 tokens) ---
output_topk = model.generate(**inputs, max_new_tokens=15, do_sample=True, top_k=50)
print("TOP-K (k=50):")
print(tokenizer.decode(output_topk[0], skip_special_tokens=True))
print()

# --- Top-p / nucleus (filter by cumulative probability) ---
output_topp = model.generate(**inputs, max_new_tokens=15, do_sample=True, top_p=0.9)
print("TOP-P (p=0.9, nucleus):")
print(tokenizer.decode(output_topp[0], skip_special_tokens=True))
