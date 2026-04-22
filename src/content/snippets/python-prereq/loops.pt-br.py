dados = [
    (160, 20, 55.0),
    (165, 24, 59.0),
    (170, 28, 64.0),
]
beta_0, beta_1, beta_2 = -21.0, 0.4, 0.6
soma_erros = 0.0
for altura, idade, y_real in dados:
    y_previsto = beta_0 + beta_1 * altura + beta_2 * idade
    erro = y_previsto - y_real
    soma_erros += erro
erro_medio = soma_erros / len(dados)
print(f"erro medio: {erro_medio:.2f}")
