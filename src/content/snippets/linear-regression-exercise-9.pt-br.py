def predict(x):
    return 10 + 2 * x

data = [(3, 18), (5, 15), (7, 30), (1, 14)]

print("Errors:")
max_err = 0
worst_x = None
for x, y_real in data:
    y_hat = predict(x)
    error = abs(y_real - y_hat)
    print(f"  x={x}: y_hat={y_hat}, y_real={y_real}, error={error}")
    if error > max_err:
        max_err = error
        worst_x = x

print(f"\
Largest error: x={worst_x} with error={max_err}")