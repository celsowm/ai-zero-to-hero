# region init
import math

# Cada linha de dados é ([x1, x2, x3, x4], alvo).
# As tres primeiras colunas sao features normalizadas; a ultima e a flag binaria de fumante.
dados = [
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

w1 = [
    [0.35, -0.10, 0.25, 0.05],
    [0.10, 0.40, -0.15, 0.20],
    [-0.20, 0.15, 0.30, 0.25],
]
b1 = [0.05, -0.10, 0.08]
w2 = [0.45, -0.20, 0.35]
b2 = -0.12
# Estes pesos ficam fixos aqui para o visual bater exatamente com os cards.
# Em um treino real, o mais comum seria começar com inicializacao aleatoria.
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

# region backprop
def backpropagate(h, y_hat, alvo, w2):
    delta_out = (y_hat - alvo) * dsigmoid(y_hat)
    delta_h = [
        dsigmoid(h[j]) * w2[j] * delta_out
        for j in range(3)
    ]
    return delta_out, delta_h
# endregion

# region update
for epoca in range(600):
    for x, alvo in dados:
        h, y_hat = forward(x)
        delta_out, delta_h = backpropagate(h, y_hat, alvo, w2)
        for j in range(3):
            w2[j] -= 0.5 * delta_out * h[j]
        b2 -= 0.5 * delta_out
        for j in range(3):
            for i in range(4):
                w1[j][i] -= 0.5 * delta_h[j] * x[i]
            b1[j] -= 0.5 * delta_h[j]
# endregion

# region finalize
# snapshot final que a proxima etapa vai reutilizar
parametros_finais = {
    "w1": w1,
    "b1": b1,
    "w2": w2,
    "b2": b2,
}

print("\nParametros finais:")
print(parametros_finais)
# endregion
