# Reasoning dataset data point example

dataset_example = {
    "problem": "A train travels at 60 km/h. How long does it take to travel 180 km?",
    "reasoning_trace": """First, I identify the quantities:
- Speed: 60 km/h
- Distance: 180 km
- Time: ?

I use the formula: time = distance / speed
time = 180 km / 60 km/h
time = 3 hours

Checking: 60 km/h x 3h = 180 km. Correct.""",
    "answer": "3 hours",
    "step_labels": [
        {"step": "Identify quantities", "quality": "good"},
        {"step": "Choose formula", "quality": "good"},
        {"step": "Calculate 180/60", "quality": "good"},
        {"step": "Verify result", "quality": "good"}
    ]
}

print(f"Problem: {dataset_example['problem']}")
print(f"Answer: {dataset_example['answer']}")
print(f"Steps: {len(dataset_example['step_labels'])} evaluated steps")
