# Zero-shot Chain of Thought: the magic phrase
question = "A restaurant has 15 tables. At the tables near the window (1/3 of the total), there are 4 seats each. At the others, there are 6 seats. If 60% of the seats are occupied, how many customers are there?"

# Without CoT - direct answer
prompt_direct = f"Answer directly: {question}"

# With zero-shot CoT - "Let's think step by step"
prompt_cot = f"""{question}

Let's think step by step."""

print("=== Zero-shot CoT ===")
print(f"Question: {question}")
print(f"\nDirect prompt:\n{prompt_direct}")
print(f"\nCoT prompt:\n{prompt_cot}")
print(f"\nThe phrase 'Let's think step by step' forces the model to generate intermediate reasoning.")
