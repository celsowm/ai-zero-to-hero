import math

def softmax(scores):
    # calcule os exponenciais
    exps = [math.exp(s) for s in scores]
    # some os exponenciais
    sum_exps = 
    # normalize
    return 

# teste: scores de 'people' para ['We', 'the', 'people']
scores = [0.5, 0.2, 1.8]
weights = softmax(scores)
print(f"Pesos: {[round(w, 4) for w in weights]}")
print(f"Soma: {sum(weights)}")