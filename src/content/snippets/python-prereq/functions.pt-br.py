# função de predição simples
def prever_peso(altura, beta0, beta1):
    return beta0 + beta1 * altura

resultado = prever_peso(170, -21, 0.5)
print(resultado)
