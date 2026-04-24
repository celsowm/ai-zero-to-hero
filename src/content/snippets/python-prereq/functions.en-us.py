# simple prediction function: takes input and returns output
def predict_weight(height, beta0, beta1):
    # linear calculation: intercept + coefficient * variable
    return beta0 + beta1 * height

# function call with concrete values
result = predict_weight(170, -21, 0.5)
print(result)
