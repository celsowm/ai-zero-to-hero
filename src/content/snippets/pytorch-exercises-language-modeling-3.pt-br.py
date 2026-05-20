# Exercício 3: cross-entropy de um token
import math

def token_cross_entropy(probs, target_idx):
    # BUG: sinal invertido
    return math.log(probs[target_idx])

print(round(token_cross_entropy([0.1, 0.7, 0.2], 1), 6))
