import math

def attention_score(q, k):
    dk = len(k)
    dot_product = sum(qi * ki for qi, ki in zip(q, k))
    
    # BUG: dividing by dk instead of sqrt(dk)!
    return dot_product / dk

# Compare both versions:
q = [1, 0, 1]
k = [1, 2, 0]

buggy = attention_score(q, k)
correct = sum(qi * ki for qi, ki in zip(q, k)) / math.sqrt(len(k))

print(f"Bug (divides by dk={len(k)}): score = {buggy:.4f}")
print(f"Correct (divides by sqrt(dk)): score = {correct:.4f}")
print(f"\
Difference: {abs(buggy - correct):.4f}")