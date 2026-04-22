# region bridge
# Continuation of neural-network-minimal-example.
# The previous training slide already produced `final_parameters`; here we reuse that snapshot.
params = final_parameters
# endregion

# region helpers
from math import exp

def sigmoid(z):
    return 1.0 / (1.0 + exp(-z))
# endregion

# region predict
def predict_probability(patient, p):
    x = [
        patient["age"] / 100,
        patient["blood_pressure"] / 200,
        patient["cholesterol"] / 300,
        patient["smoker"],
    ]
    h = []
    for j in range(3):
        z = sum(p["w1"][j][i] * x[i] for i in range(4)) + p["b1"][j]
        h.append(sigmoid(z))
    z_out = sum(p["w2"][j] * h[j] for j in range(3)) + p["b2"]
    return sigmoid(z_out)
# endregion

# region sample
patient = {"age": 58, "blood_pressure": 150, "cholesterol": 245, "smoker": 1.0}
# endregion

# region output
prob = predict_probability(patient, params)
label = "yes" if prob >= 0.5 else "no"
print("Probability:", round(prob, 4))
print("Predicted class:", label)
# endregion
