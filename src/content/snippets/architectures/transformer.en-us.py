# @region e2e
# 1. INPUT (Embeddings for 3 tokens)
# Each row is a vector representing a word
embeddings = [
    [1.0, 0.0, 0.5], # "The"
    [0.0, 1.0, 0.2], # "cat"
    [0.5, 0.5, 1.0]  # "runs"
]

# 2. ATTENTION LOGIC (Simplified)
def scaled_dot_product_attention(query, keys, values):
    # Calculate affinity scores between Query and all Keys
    scores = []
    for k in keys:
        # Dot Product: measures how well words match
        dot = sum(q * ki for q, ki in zip(query, k))
        scores.append(dot)
    
    # Simplified Softmax (converts scores to 0-1 weights)
    exps = [2.718 ** s for s in scores]
    total = sum(exps)
    weights = [e / total for e in exps]
    
    # Blend 'Values' based on weights
    context = [0.0] * len(values[0])
    for i, w in enumerate(weights):
        for d in range(len(values[i])):
            context[d] += w * values[i][d]
    return context

# 3. EXECUTION (For the "cat" token)
cat_context = scaled_dot_product_attention(
    query=embeddings[1], 
    keys=embeddings, 
    values=embeddings
)
print(f"Context Vector (Cat): {cat_context}")
# @end
