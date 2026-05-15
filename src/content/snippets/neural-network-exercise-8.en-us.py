def calculate_output_delta(pred, target):
    # complete: use the sigmoid_derivative you created earlier
    error = 
    d_activation = sigmoid_derivative(pred)
    return 

# test
y_hat = 0.6
y_true = 0.0
print(f"Output delta: {calculate_output_delta(y_hat, y_true)}")