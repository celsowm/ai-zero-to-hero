# Comparison: CoT (prompt) vs Reasoning Model (trained)

# 1. Chain of Thought - just prompt change
cot_prompt = """Solve step by step.

Question: If x + 5 = 12, what is the value of x?
Answer: To find x, I subtract 5 from both sides:
x + 5 - 5 = 12 - 5
x = 7
Answer: x = 7
"""

# Normal model with CoT prompt
# response = client.chat.completions.create(
#     model="gpt-4o",
#     messages=[{"role": "user", "content": cot_prompt}]
# )

# 2. Reasoning Model - thinking is native
reasoning_request = {
    "model": "o3-mini",
    "messages": [{"role": "user", "content": "If x + 5 = 12, what is the value of x?"}],
    "reasoning_effort": "medium"  # Thinking enabled via parameter
}

# The model generates thinking blocks automatically, no need for "step by step" prompt
# response = client.chat.completions.create(**reasoning_request)
# response.choices[0].message.content
# -> contains thinking blocks + final answer

print("CoT: thinking depends on prompt. Reasoning Model: thinking is native.")
