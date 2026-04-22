def prever_peso(altura, idade, beta_0, beta_1, beta_2):
    return beta_0 + beta_1 * altura + beta_2 * idade
beta_0 = -21.0
beta_1 = 0.4
beta_2 = 0.6
peso_previsto = prever_peso(172, 29, beta_0, beta_1, beta_2)
print(f"peso previsto: {peso_previsto:.2f}")
