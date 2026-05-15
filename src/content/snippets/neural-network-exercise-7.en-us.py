import math

def sigmoid(x):
    return 1 / (1 + math.exp(-x))

def layer_forward(inputs, weight_matrix, biases):
    activations = []
    for i in range(len(weight_matrix)):
        # complete: calculate z for neuron i
        z = sum(x * w for x, w in zip(inputs, weight_matrix[i])) + biases[i]
        # add activation to list
        
    return activations

# test
x = [1.0, 0.5]
w_matrix = [[0.2, 0.8], [-0.5, 0.1]]
b = [0.0, 0.0]
print(f"Layer activations: {layer_forward(x, w_matrix, b)}")