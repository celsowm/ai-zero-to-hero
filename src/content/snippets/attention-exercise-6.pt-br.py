def weighted_sum(weights, values):
    # weights: list of attention weights (already sum to 1)
    # values: list of value vectors (one per token)
    # output: resulting weighted vector
    dim = len(values[0])
    output = [0.0] * dim
    for i in range(len(values)):
        for j in range(dim):
            output[j] += 
    return output

# test
weights = [0.1, 0.3, 0.6]
values = [
    [1.0, 0.0],  # 'We'
    [0.5, 1.0],  # 'the'
    [0.0, 2.0],  # 'people'
]
result = weighted_sum(weights, values)
print(f"Context: {[round(v, 3) for v in result]}")