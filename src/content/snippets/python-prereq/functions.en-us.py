# simple prediction function
def predict_weight(height, beta0, beta1):
    return beta0 + beta1 * height

result = predict_weight(170, -21, 0.5)
print(result)
