# ReAct cycle for: "What is the most populous country?"

steps = [
    {"type": "thought", "content": "I need to know the current population of the most populous countries."},
    {"type": "action", "content": 'search_data("most populous country 2024")'},
    {"type": "observation", "content": "Results: 1) India: 1.428M, 2) China: 1.425M, 3) USA: 339K"},
]

# Predict the next Thought before running!
next_thought = "???"

# Verify:
answer = "India surpassed China in 2023. With the data already obtained, I can answer directly: India is the most populous country with 1.428 billion."

for s in steps:
    print(f"{s['type'].upper()}: {s['content']}")

print(f"\nYour Thought: {next_thought}")
print(f"\nCorrect answer: {answer}")
