# Exercise 2: MSE
def mse(pred, target):
    total = 0.0
    for p, t in zip(pred, target):
        total += (p - t) ** 2
    return total / len(pred)

print(mse([0.0, 2.0], [1.0, 0.0]))
