def calculate_moe_output(weight, expert_output):
    # multiply each element of expert_output by the weight
    return [val * weight for val in expert_output]

# Test
weight = 0.8
output = [1.0, 2.0, -1.0]
result = calculate_moe_output(weight, output)
print(f"Gated Output: {result}")