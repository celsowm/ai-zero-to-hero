def predict(x):
    return 10 + 2 * x

data = [(3, 18), (5, 15), (7, 30), (1, 14)]

print("Erros:")
max_err = 0
worst_x = None
for x, y_real in data:
    y_hat = predict(x)
    erro = abs(y_real - y_hat)
    print(f"  x={x}: y_hat={y_hat}, y_real={y_real}, erro={erro}")
    if erro > max_err:
        max_err = erro
        worst_x = x

print(f"\
Maior erro: x={worst_x} com erro={max_err}")