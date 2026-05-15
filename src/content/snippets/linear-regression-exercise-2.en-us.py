def update_w(w, gradient, lr):
    # BUG: esta função está fazendo w divergir!
    # Encontre e corrija o sinal errado.
    return w + lr * gradient

w = 5.0
lr = 0.1
print("Com o BUG:")
for i in range(5):
    grad = 2 * w
    w = update_w(w, grad, lr)
    print(f"  Passo {i+1}: w = {w:.4f}")

# Agora corrija a função e rode de novo:
w = 5.0
print("\
Corrigido:")
for i in range(5):
    grad = 2 * w
    w = update_w(w, grad, lr)
    print(f"  Passo {i+1}: w = {w:.4f}")