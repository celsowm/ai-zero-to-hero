data = [
    (160, 20, 55.0),
    (165, 24, 59.0),
    (170, 28, 64.0),
]
beta_0, beta_1, beta_2 = -21.0, 0.4, 0.6
total_error = 0.0
for height, age, y_real in data:
    y_pred = beta_0 + beta_1 * height + beta_2 * age
    error = y_pred - y_real
    total_error += error
avg_error = total_error / len(data)
print(f"avg error: {avg_error:.2f}")
