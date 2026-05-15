def calculate_mse(y_true, y_pred):
    # y_true e y_pred são listas de números de mesmo tamanho
    total_error = 0
    for i in range(len(y_true)):
        # complete: calcule o erro ao quadrado e some ao total
        diff = 
        total_error += 
    
    return total_error / len(y_true)

# teste
y_real = [10, 20, 30]
y_previsto = [12, 18, 33]
print(f"MSE: {calculate_mse(y_real, y_previsto)}")