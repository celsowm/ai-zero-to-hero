def calculate_mse(y_true, y_pred):
    """Calcula o Erro Quadrático Médio (MSE)."""
    n = len(y_true)
    total_error = 0
    for i in range(n):
        # SEU CÓDIGO AQUI: calcule a diferença ao quadrado
        pass

    return total_error / n

if __name__ == "__main__":
    y_true = [10, 20, 30]
    y_pred = [12, 18, 33]
    mse = calculate_mse(y_true, y_pred)
    print(f"MSE: {mse:.4f}")
