# @region e2e
# 1. ENTRADAS (Features Tabulares)
# Age, Pressure, Cholesterol, Smoker
patient = [0.45, 0.60, 0.52, 1.0]

# 2. PARAMETERS (Weights and Biases)
# Weights for 3 hidden neurons (each looks at 4 inputs)
hidden_weights = [
    [0.2, -0.3, 0.5, 0.1],  # Neuron 1
    [0.1, 0.2, -0.1, 0.4],  # Neuron 2
    [-0.4, 0.5, 0.1, -0.2]  # Neuron 3
]
hidden_biases = [0.1, -0.2, 0.05]

# 3. PROCESSING LOGIC (Forward)
def layer_forward(inputs, weights, biases):
    outputs = []
    for w, b in zip(weights, biases):
        # Total Weighted Sum (Dense Connection)
        z = sum(x * weight for x, weight in zip(inputs, w)) + b
        # Sigmoid Activation
        outputs.append(1 / (1 + (2.718 ** -z)))
    return outputs

# 4. EXECUTION
result = layer_forward(patient, hidden_weights, hidden_biases)
print(f"Hidden Layer Activations: {result}")
# @end
