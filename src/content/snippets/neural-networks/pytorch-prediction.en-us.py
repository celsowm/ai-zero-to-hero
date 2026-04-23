import torch

x_new = torch.tensor([
    [58 / 100, 150 / 200, 245 / 300, 1.0]
], dtype=torch.float32)

with torch.no_grad():
    prob = model(x_new).item()

predicted_class = "yes" if prob >= 0.5 else "no"
print("Probability:", round(prob, 4))
print("Predicted class:", predicted_class)
