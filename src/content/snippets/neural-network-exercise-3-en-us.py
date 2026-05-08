def calculate_output_delta(pred, target):
    # complete: use a sigmoid_derivative que você criou antes
    error = 
    d_activation = sigmoid_derivative(pred)
    return 

# teste
y_hat = 0.6
y_true = 0.0
print(f"Delta de saída: {calculate_output_delta(y_hat, y_true)}")