# predict weight using height and age

data = [
    (160, 20, 55),
    (165, 24, 59),
    (170, 28, 64),
    (175, 32, 68),
    (180, 36, 72),
]

def predict(height, age, beta_0, beta_1, beta_2):
    return beta_0 + beta_1 * height + beta_2 * age


def mse(data, beta_0, beta_1, beta_2):
    total = 0
    for height, age, y in data:
        y_hat = predict(height, age, beta_0, beta_1, beta_2)
        error = y_hat - y
        total += error ** 2
    return total / len(data)


def train_linear_regression(data, epochs=10000, lr=0.00001):
    beta_0 = 0.0
    beta_1 = 0.0
    beta_2 = 0.0
    n = len(data)

    for epoch in range(epochs):
        grad_beta_0 = 0.0
        grad_beta_1 = 0.0
        grad_beta_2 = 0.0

        for height, age, y in data:
            y_hat = predict(height, age, beta_0, beta_1, beta_2)
            error = y_hat - y
            grad_beta_0 += 2 * error
            grad_beta_1 += 2 * error * height
            grad_beta_2 += 2 * error * age

        grad_beta_0 /= n
        grad_beta_1 /= n
        grad_beta_2 /= n

        beta_0 -= lr * grad_beta_0
        beta_1 -= lr * grad_beta_1
        beta_2 -= lr * grad_beta_2

    return beta_0, beta_1, beta_2


beta_0, beta_1, beta_2 = train_linear_regression(data)

print("\nFinal model:")
print(f"weight = {beta_0:.4f} + {beta_1:.4f} * height + {beta_2:.4f} * age")
