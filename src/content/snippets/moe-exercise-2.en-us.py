def calculate_moe_output(weight, expert_output):
    # multiplique cada elemento de expert_output pelo peso
    return [val * weight for val in expert_output]

# Teste
weight = 0.8
output = [1.0, 2.0, -1.0]
result = calculate_moe_output(weight, output)
print(f"Saída Gated: {result}")