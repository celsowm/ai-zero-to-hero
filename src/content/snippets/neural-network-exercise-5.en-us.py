import math

def sigmoid(x):
    return 1 / (1 + math.exp(-x))

def neuron(inputs, weights, bias):
    z = sum(x * w for x, w in zip(inputs, weights)) + bias
    return sigmoid(z)

def forward_2layer(x, w_hidden, b_hidden, w_out, b_out):
    # camada oculta
    hidden = []
    for i in range(len(w_hidden)):
        h = neuron(x, w_hidden[i], b_hidden[i])
        hidden.append(h)
    
    # camada de saída
    output = 
    
    return hidden, output

# teste
x = [1.0, 0.5]
w_h = [[0.2, 0.8], [-0.5, 0.1]]
b_h = [0.0, 0.0]
w_o = [0.5, -0.3]
b_o = 0.1
h, o = forward_2layer(x, w_h, b_h, w_o, b_o)
print(f"Oculta: {[round(v,4) for v in h]}")
print(f"Saída: {round(o, 4)}")