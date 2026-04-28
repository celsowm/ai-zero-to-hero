# region: rag-hallucination
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("gpt2")
tokenizer = AutoTokenizer.from_pretrained("gpt2")

# Pergunta sobre algo específico que o modelo não conhece
prompt = "What is the chemical formula for Unobtainium?"

inputs = tokenizer(prompt, return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=30, do_sample=False)
print(tokenizer.decode(outputs[0], skip_special_tokens=True))
# Unobtainium NÃO existe. Mas o modelo vai inventar uma fórmula.
# Isso é "hallucinação": gerar texto plausível mas factualmente errado.
# Sem verificação externa, não há como o modelo saber que está inventando.
# endregion
