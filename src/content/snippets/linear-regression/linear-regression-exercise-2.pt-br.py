# Fix the Bug: Gradient Descent ao contrário?
# Este código tenta encontrar o mínimo de f(w) = w²
# usando Gradient Descent, mas algo está errado...

def f(w):
    return w ** 2

def gradiente(w):
    return 2 * w

w = 5.0
lr = 0.2

print("Com o BUG:")
for passo in range(1, 6):
    grad = gradiente(w)
    # BUG: sinal errado na atualização!
    w = w + lr * grad  # <-- encontre e corrija
    print(f"  Passo {passo}: w = {w:.4f}")

print("\nCorrigido:")
w = 5.0
for passo in range(1, 6):
    grad = gradiente(w)
    # CORRIGIDO:
    w = w - lr * grad
    print(f"  Passo {passo}: w = {w:.4f}")
