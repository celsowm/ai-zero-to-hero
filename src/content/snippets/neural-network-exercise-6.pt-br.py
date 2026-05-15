def sigmoid_derivative(s):
    # BUG: this function returns negative values!
    # Find and fix the wrong sign.
    return s * (1 + s)

# Test: sigmoid(0) = 0.5, derivative should be 0.25
print(f"Bug: sigmoid_derivative(0.5) = {sigmoid_derivative(0.5)}")
print(f"Bug: sigmoid_derivative(0.8) = {sigmoid_derivative(0.8)}")

# Fix the function and run again:
print(f"\
Fixed: sigmoid_derivative(0.5) = {sigmoid_derivative(0.5)}")
print(f"Fixed: sigmoid_derivative(0.8) = {sigmoid_derivative(0.8)}")