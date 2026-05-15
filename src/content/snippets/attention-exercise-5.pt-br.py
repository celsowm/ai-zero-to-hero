import math

def softmax(scores):
    # compute exponentials
    exps = [math.exp(s) for s in scores]
    # sum exponentials
    sum_exps = 
    # normalize
    return 

# test: scores from 'people' to ['We', 'the', 'people']
scores = [0.5, 0.2, 1.8]
weights = softmax(scores)
print(f"Weights: {[round(w, 4) for w in weights]}")
print(f"Sum: {sum(weights)}")