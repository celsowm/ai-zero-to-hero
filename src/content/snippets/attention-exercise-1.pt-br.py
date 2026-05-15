import math

def attention_score(q, k):
    dk = len(k)
    dot_product = sum(qi * ki for qi, ki in zip(q, k))
    
    # BUG: dividindo por dk em vez de sqrt(dk)!
    return dot_product / dk

# Compare as duas versões:
q = [1, 0, 1]
k = [1, 2, 0]

buggy = attention_score(q, k)
correct = sum(qi * ki for qi, ki in zip(q, k)) / math.sqrt(len(k))

print(f"Bug (divide por dk={len(k)}): score = {buggy:.4f}")
print(f"Correto (divide por sqrt(dk)): score = {correct:.4f}")
print(f"\
Diferença: {abs(buggy - correct):.4f}")