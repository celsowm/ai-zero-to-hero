# Exercise 3: single-token cross-entropy
import math

def token_cross_entropy(probs, target_idx):
    # BUG: wrong sign
    return math.log(probs[target_idx])

print(round(token_cross_entropy([0.1, 0.7, 0.2], 1), 6))
