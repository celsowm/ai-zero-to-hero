# region: rag-memory-limit
from transformers import AutoModelForCausalLM, AutoTokenizer

model_name = "gpt2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Pergunta sobre um evento pós-treino (GPT-2 treinado em 2021)
question = "Who won the FIFA World Cup in 2022?"

inputs = tokenizer(question, return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=50, do_sample=False)
answer = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(answer)
# O modelo responde com base nos pesos congelados do treino.
# Ele NÃO sabe sobre a Copa de 2022 — o conhecimento está "congelado"
# na data do último dado de treino. Sem acesso externo, ele "chuta".
# endregion
