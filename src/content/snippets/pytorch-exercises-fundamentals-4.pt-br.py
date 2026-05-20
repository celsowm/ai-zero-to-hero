# Exercício 4: requires_grad/backward (versão simplificada)
def grad_square(x):
    # BUG: gradiente incorreto
    return x * x

print(grad_square(3.0))
