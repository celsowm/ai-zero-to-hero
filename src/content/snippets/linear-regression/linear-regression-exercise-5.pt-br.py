# Gradient Descent 1D: encontrando o mínimo de f(w) = w²
# Gradiente: df/dw = 2*w
# Atualização: w = w - lr * 2*w

w = 5.0
lr = 0.1

for passo in range(1, 6):
    gradiente = 2 * w
    w = w - lr * gradiente
    print(f"Passo {passo}: w = {w:.4f}")
