# Many-shot: curva de performance com mais exemplos
import matplotlib.pyplot as plt
import numpy as np

# Dados: accuracy vs número de exemplos (Anthropic, 2024)
n_examples = [0, 1, 2, 5, 10, 25, 50, 100, 200]
accuracy = [42, 48, 55, 63, 68, 74, 78, 82, 85]

plt.figure(figsize=(10, 6))
plt.plot(n_examples, accuracy, 'b-o', linewidth=2, markersize=8)
plt.axvline(x=5, color='r', linestyle='--', label='Few-shot típico (5)')
plt.axvline(x=100, color='g', linestyle='--', label='Many-shot (100)')
plt.xlabel('Número de exemplos no prompt')
plt.ylabel('Accuracy (%)')
plt.title('In-Context Learning: Accuracy vs Exemplos')
plt.legend()
plt.grid(True, alpha=0.3)
plt.savefig('many-shot-curve.png', dpi=150)
print("Gráfico salvo: many-shot-curve.png")
print(f"Accuracy com 0 exemplos: {accuracy[0]}%")
print(f"Accuracy com 100 exemplos: {accuracy[7]}%")
print(f"Ganho: +{accuracy[7] - accuracy[0]}pp")
