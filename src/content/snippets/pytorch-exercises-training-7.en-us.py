# Exercise 3: one train step (1D regression)
def train_step(w, b, x, y, lr):
    y_hat = w * x + b
    error = y_hat - y

    grad_w = 2 * error * x
    grad_b = 2 * error

    new_w = w - lr * grad_w
    new_b = b - lr * grad_b
    return new_w, new_b

print(train_step(1.0, 0.0, 2.0, 5.0, 0.1))
