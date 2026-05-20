# Exercício 4: zero_grad simplificado
def zero_grad(grads):
    # BUG: não zera todos os gradientes
    for name in grads:
        grads[name] = grads[name]
    return grads

print(zero_grad({'w': 1.5, 'b': -0.3}))
