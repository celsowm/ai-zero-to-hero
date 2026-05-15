# Experiment: Which prediction is most wrong?
# Model: y_hat = 10 + 2*x

data = [
    (3, 18),
    (5, 15),
    (7, 30),
    (1, 14),
]

print("Errors:")
largest_error = -1
worst_x = None

for x, y_real in data:
    y_hat = 10 + 2 * x
    error = abs(y_real - y_hat)
    print(f"  x={x}: y_hat={y_hat}, y_real={y_real}, error={error}")
    if error > largest_error:
        largest_error = error
        worst_x = x

print(f"\nLargest error: x={worst_x} with error={largest_error}")
