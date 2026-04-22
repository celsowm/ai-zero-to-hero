# prever peso usando altura e idade

dados = [
    (160, 20, 55),
    (165, 24, 59),
    (170, 28, 64),
    (175, 32, 68),
    (180, 36, 72),
]

def prever(altura, idade, beta_0, beta_1, beta_2):
    return beta_0 + beta_1 * altura + beta_2 * idade


def mse(dados, beta_0, beta_1, beta_2):
    soma = 0
    for altura, idade, y in dados:
        y_hat = prever(altura, idade, beta_0, beta_1, beta_2)
        erro = y_hat - y
        soma += erro ** 2
    return soma / len(dados)


def treinar_regressao_linear(dados, epochs=10000, lr=0.00001):
    beta_0 = 0.0
    beta_1 = 0.0
    beta_2 = 0.0
    n = len(dados)

    for epoch in range(epochs):
        grad_beta_0 = 0.0
        grad_beta_1 = 0.0
        grad_beta_2 = 0.0

        for altura, idade, y in dados:
            y_hat = prever(altura, idade, beta_0, beta_1, beta_2)
            erro = y_hat - y
            grad_beta_0 += 2 * erro
            grad_beta_1 += 2 * erro * altura
            grad_beta_2 += 2 * erro * idade

        grad_beta_0 /= n
        grad_beta_1 /= n
        grad_beta_2 /= n

        beta_0 -= lr * grad_beta_0
        beta_1 -= lr * grad_beta_1
        beta_2 -= lr * grad_beta_2

    return beta_0, beta_1, beta_2


beta_0, beta_1, beta_2 = treinar_regressao_linear(dados)

print("\nModelo final:")
print(f"peso = {beta_0:.4f} + {beta_1:.4f} * altura + {beta_2:.4f} * idade")
