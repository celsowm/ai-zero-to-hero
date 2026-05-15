import math

def sigmoid(x):
    return 1 / (1 + math.exp(-x))

def relu(z):
    return max(0, z)

valores = [-5.0, -2.0, -0.5, 0.0, 0.5, 2.0, 5.0]

print(f"{'x':>6} | {'sigmoid(x)':>10} | {'relu(x)':>8}")
print("-" * 30)
for x in valores:
    print(f"{x:>6.1f} | {sigmoid(x):>10.4f} | {relu(x):>8.4f}")

print("\
Observe:")
print("- sigmoid: sempre entre 0 e 1 (suave)")
print("- relu: 0 para negativos, identidade para positivos")