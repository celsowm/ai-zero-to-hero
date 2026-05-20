# Exercise 1: nn.Linear forward
def linear_forward(x, w, b):
    out = []
    for neuron_weights, bias in zip(w, b):
        z = 0.0
        for xi, wi in zip(x, neuron_weights):
            z += xi * wi
        out.append(z + bias)
    return out

print(linear_forward([2.0, 1.0], [[0.5, -1.0], [1.0, 2.0]], [0.1, -0.2]))
