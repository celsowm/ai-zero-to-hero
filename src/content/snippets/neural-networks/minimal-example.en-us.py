# region init
import math
import random

random.seed(0)

data = [
    ([0.35, 0.60, 0.58, 0.0], 0),
    ([0.42, 0.65, 0.62, 0.0], 0),
    ([0.48, 0.70, 0.68, 0.0], 0),
    ([0.58, 0.78, 0.82, 1.0], 1),
    ([0.67, 0.84, 0.88, 1.0], 1),
    ([0.73, 0.90, 0.93, 1.0], 1),
]

def sigmoid(x):
    return 1 / (1 + math.exp(-x))

def dsigmoid(y):
    return y * (1 - y)

w1 = [[random.uniform(-1, 1) for _ in range(4)] for _ in range(3)]
b1 = [0.0, 0.0, 0.0]
w2 = [random.uniform(-1, 1) for _ in range(3)]
b2 = 0.0
# endregion

# region forward
def forward(x):
    h = []
    for j in range(3):
        z = sum(w1[j][i] * x[i] for i in range(4)) + b1[j]
        h.append(sigmoid(z))
    z_out = sum(w2[j] * h[j] for j in range(3)) + b2
    y_hat = sigmoid(z_out)
    return h, y_hat
# endregion

for epoch in range(600):
    for x, target in data:
        h, y_hat = forward(x)

# region backprop
        delta_out = (y_hat - target) * dsigmoid(y_hat)
        delta_h = [
            dsigmoid(h[j]) * w2[j] * delta_out
            for j in range(3)
        ]
# endregion

# region update
        for j in range(3):
            w2[j] -= 0.5 * delta_out * h[j]
        b2 -= 0.5 * delta_out
        for j in range(3):
            for i in range(4):
                w1[j][i] -= 0.5 * delta_h[j] * x[i]
            b1[j] -= 0.5 * delta_h[j]
# endregion

# region finalize
# final_parameters is the snapshot that the next slide reuses
final_parameters = {
    "w1": w1,
    "b1": b1,
    "w2": w2,
    "b2": b2,
}

print("\nFinal parameters:")
print(final_parameters)
# endregion
