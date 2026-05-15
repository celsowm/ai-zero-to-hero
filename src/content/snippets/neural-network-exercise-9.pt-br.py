import math

def sigmoid(x):
    return 1 / (1 + math.exp(-x))

def relu(z):
    return max(0, z)

values = [-5.0, -2.0, -0.5, 0.0, 0.5, 2.0, 5.0]

print(f"{'x':>6} | {'sigmoid(x)':>10} | {'relu(x)':>8}")
print("-" * 30)
for x in values:
    print(f"{x:>6.1f} | {sigmoid(x):>10.4f} | {relu(x):>8.4f}")

print("\
Observe:")
print("- sigmoid: always between 0 and 1 (smooth)")
print("- relu: 0 for negatives, identity for positives")