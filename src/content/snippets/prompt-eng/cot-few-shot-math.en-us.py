# Chain of Thought Few-Shot: examples with step-by-step reasoning
cot_examples = [
    {
        "q": "A hall has 25 rows with 12 chairs each. If 2/3 of the chairs are occupied, how many are empty?",
        "a": "First, I calculate the total chairs: 25 × 12 = 300.\nIf 2/3 are occupied, 1/3 are empty.\n1/3 of 300 = 300/3 = 100.\nAnswer: 100 empty chairs."
    },
    {
        "q": "Maria is twice as old as João. In 5 years, she will be 35. How old is João now?",
        "a": "If Maria will be 35 in 5 years, she is 30 now.\nMaria is twice João's age, so João is 30/2 = 15.\nAnswer: João is 15 years old."
    },
]

# CoT few-shot prompt
prompt = "Solve step by step:\n\n"
for ex in cot_examples:
    prompt += f"Question: {ex['q']}\nAnswer: {ex['a']}\n\n"
prompt += "Question: A building has 8 floors with 6 apartments each. If 3/4 are occupied, how many empty apartments?\nAnswer:"

print("Chain of Thought Few-Shot Prompt:")
print(prompt)
