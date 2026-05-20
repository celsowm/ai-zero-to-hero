# Exercício 4: next-token decode (argmax)
def next_token(logits):
    best_i = 0
    best_v = logits[0]
    for i, v in enumerate(logits):
        if v > best_v:
            best_i = i
            best_v = v
    return best_i

print(next_token([1.0, 2.5, 0.7, 2.2]))
