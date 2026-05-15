def calculate_mse(y_true, y_pred):
    # y_true and y_pred are lists of numbers of the same length
    total_error = 0
    for i in range(len(y_true)):
        # complete: calculate squared error and add to total
        diff = 
        total_error += 
    
    return total_error / len(y_true)

# test
y_real = [10, 20, 30]
y_previsto = [12, 18, 33]
print(f"MSE: {calculate_mse(y_real, y_previsto)}")