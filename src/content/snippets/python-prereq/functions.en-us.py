def predict_weight(height, age, beta_0, beta_1, beta_2):
    return beta_0 + beta_1 * height + beta_2 * age
beta_0 = -21.0
beta_1 = 0.4
beta_2 = 0.6
predicted_weight = predict_weight(172, 29, beta_0, beta_1, beta_2)
print(f"predicted weight: {predicted_weight:.2f}")
