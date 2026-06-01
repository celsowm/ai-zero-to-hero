from transformers import pipeline, set_seed

# GPT-2 is a text-completion model.
# It learned to continue a piece of text, not to answer a question.
generator = pipeline("text-generation", model="gpt2")
set_seed(42)

prompt = "Q: What is the capital of Brazil?\nA:"

# GPT-2 will just continue writing more questions and fake answers.
out = generator(prompt, max_new_tokens=40, do_sample=False)
print("--- GPT-2 OUTPUT ---")
print(out[0]["generated_text"])
print("-------------------")
# Notice: no actual answer — it keeps writing new Q/A pairs.
