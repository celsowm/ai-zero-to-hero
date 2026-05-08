import math

exemplos = [
    (1.0, 0.6),   # modelo disse 0.6, resposta era 1 (errou por pouco)
    (1.0, 0.9),   # modelo disse 0.9, resposta era 1 (quase acertou)
    (1.0, 0.01),  # modelo disse 0.01, resposta era 1 (errou com confiança)
    (0.0, 0.4),   # modelo disse 0.4, resposta era 0 (errou por pouco)
    (0.0, 0.1),   # modelo disse 0.1, resposta era 0 (quase acertou)
    (0.0, 0.99),  # modelo disse 0.99, resposta era 0 (errou com confiança)
]

def bce_loss(resposta, probabilidade):
    """Binary Cross Entropy para um único exemplo."""
    epsilon = 1e-7  # evita log(0)
    if resposta == 1.0:
        return -math.log(probabilidade + epsilon)
    else:
        return -math.log(1.0 - probabilidade + epsilon)

print(f"{'Resposta':>8} | {'p (modelo)':>10} | {'Loss':>8} | Interpretação")
print("-" * 60)
for resposta, p in exemplos:
    loss = bce_loss(resposta, p)
    if resposta == 1 and p < 0.3:
        nota = "Errou com confiança!"
    elif resposta == 0 and p > 0.7:
        nota = "Errou com confiança!"
    elif resposta == 1 and p > 0.7:
        nota = "Quase acertou"
    elif resposta == 0 and p < 0.3:
        nota = "Quase acertou"
    else:
        nota = "Errou por pouco"
    print(f"{resposta:>8.0f} | {p:>10.2f} | {loss:>8.4f} | {nota}")
