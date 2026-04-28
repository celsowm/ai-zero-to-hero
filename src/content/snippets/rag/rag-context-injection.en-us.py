# @region rag-context-injection
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("gpt2")
tokenizer = AutoTokenizer.from_pretrained("gpt2")

# Documents retrieved by vector search
context = [
    "The 2022 World Cup was held in Qatar.",
    "Argentina defeated France in the final 4-2 on penalties.",
    "Lionel Messi was elected the best player of the tournament.",
]

question = "Who won the 2022 World Cup?"

# Build prompt with injected context
prompt = (
    "Instruction: Answer the question using ONLY the information from the context.\n"
    + "\n".join(f"Source {i+1}: {c}" for i, c in enumerate(context))
    + f"\nQuestion: {question}\nAnswer:"
)

inputs = tokenizer(prompt, return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=50, do_sample=False)
print(tokenizer.decode(outputs[0], skip_special_tokens=True))
# The model now has access to sources. The answer is grounded, not invented.
# @endregion
