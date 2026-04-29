# Many-shot: performance curve with more examples
import matplotlib.pyplot as plt
import numpy as np

# Data: accuracy vs number of examples (Anthropic, 2024)
n_examples = [0, 1, 2, 5, 10, 25, 50, 100, 200]
accuracy = [42, 48, 55, 63, 68, 74, 78, 82, 85]

plt.figure(figsize=(10, 6))
plt.plot(n_examples, accuracy, 'b-o', linewidth=2, markersize=8)
plt.axvline(x=5, color='r', linestyle='--', label='Typical few-shot (5)')
plt.axvline(x=100, color='g', linestyle='--', label='Many-shot (100)')
plt.xlabel('Number of examples in prompt')
plt.ylabel('Accuracy (%)')
plt.title('In-Context Learning: Accuracy vs Examples')
plt.legend()
plt.grid(True, alpha=0.3)
plt.savefig('many-shot-curve.png', dpi=150)
print("Chart saved: many-shot-curve.png")
print(f"Accuracy with 0 examples: {accuracy[0]}%")
print(f"Accuracy with 100 examples: {accuracy[7]}%")
print(f"Gain: +{accuracy[7] - accuracy[0]}pp")
