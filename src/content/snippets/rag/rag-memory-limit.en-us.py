# region: rag-memory-limit
from transformers import AutoModelForCausalLM, AutoTokenizer

model_name = "gpt2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Question about a post-training event (GPT-2 trained in 2021)
question = "Who won the FIFA World Cup in 2022?"

inputs = tokenizer(question, return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=50, do_sample=False)
answer = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(answer)
# The model answers based on frozen training weights.
# It does NOT know about the 2022 World Cup — knowledge is "frozen"
# at the last training data date. Without external access, it "guesses".
# endregion
