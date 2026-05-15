import math

def sigmoid(x):
    return 1 / (1 + math.exp(-x))

def layer_forward(inputs, weight_matrix, biases):
    activations = []
    for i in range(len(weight_matrix)):
        # complete: calcule z para o neurônio i
        z = sum(x * w for x, w in zip(inputs, weight_matrix[i])) + biases[i]
        # adicione a ativação à lista
        
    return activations

# teste
x = [1.0, 0.5]
w_matrix = [[0.2, 0.8], [-0.5, 0.1]]
b = [0.0, 0.0]
print(f"Ativações da camada: {layer_forward(x, w_matrix, b)}")