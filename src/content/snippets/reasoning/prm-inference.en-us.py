# Process Reward Model (PRM) - evaluating each step quality

from transformers import pipeline

# PRM evaluates each reasoning step: good/bad/neutral
prm = pipeline(
    "text-classification",
    model="openbmb/PRM-LLaMA-3-8B",
    device=0
)

# Reasoning trace split into steps
steps = [
    "First, I identify that the equation is quadratic: 3x^2 + 12x - 4 = 0",
    "I use Bhaskara's formula: x = (-b +/- sqrt(b^2 - 4ac)) / 2a",
    "Where a=3, b=12, c=-4",
    "I calculate the discriminant: b^2 - 4ac = 144 - 4(3)(-4) = 144 + 48 = 192",
    "sqrt(192) = sqrt(64 * 3) = 8 * sqrt(3)",
    "x = (-12 +/- 8*sqrt(3)) / 6",
    "Simplifying: x = -2 +/- (4*sqrt(3))/3"
]

# Evaluate each step
for i, step in enumerate(steps):
    result = prm(f"Step {i+1}: {step}")
    label = result[0]["label"]  # good / bad
    score = result[0]["confidence"]
    status = "OK" if label == "good" and score > 0.8 else "ALERT"
    print(f"[{status}] Step {i+1}: {label} ({score:.2f})")

# PRM can be used as reward in RL to improve the model
