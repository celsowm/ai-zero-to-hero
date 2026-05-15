import numpy as np

def add_bias():
    # Data matrix (3 samples, 3 features)
    data = np.array([[1, 2, 3],
                     [4, 5, 6],
                     [7, 8, 9]], dtype=float)
    
    # BUG: bias with wrong shape
    bias = np.array([100, 200, 300], dtype=float)
    # Broadcasting tries to add bias to each element...
    # To add per column, bias needs a reshape!
    
    # FIXED: bias as a column (3, 1)
    bias_fixed = bias.reshape(3, 1)
    result = data + bias_fixed
    return result

print("Data:")
print(np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))
print(f"\
Result with fixed broadcasting:")
print(add_bias())