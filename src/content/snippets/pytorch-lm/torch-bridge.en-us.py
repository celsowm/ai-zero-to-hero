import torch
from torch import nn

# region data
# Same 6 patients from the manual example (normalized features, target).
# Columns: age/100, blood_pressure/200, cholesterol/300, smoker.
X = torch.tensor([
    [0.35, 0.60, 0.58, 0.0],
    [0.42, 0.65, 0.62, 0.0],
    [0.48, 0.70, 0.68, 0.0],
    [0.58, 0.78, 0.82, 1.0],
    [0.67, 0.84, 0.88, 1.0],
    [0.73, 0.90, 0.93, 1.0],
], dtype=torch.float32)
y = torch.tensor([[0], [0], [0], [1], [1], [1]], dtype=torch.float32)
# endregion

# region model
# Same architecture as the manual example: 4 -> 3 (sigmoid) -> 1 (sigmoid)
model = nn.Sequential(
    nn.Linear(4, 3),
    nn.Sigmoid(),
    nn.Linear(3, 1),
    nn.Sigmoid(),
)
# endregion

# region training
criterion = nn.MSELoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.5)

for epoch in range(600):
    optimizer.zero_grad()
    y_hat = model(X)
    loss = criterion(y_hat, y)
    loss.backward()
    optimizer.step()
    if epoch % 100 == 0:
        print(f"Epoch {epoch}: loss = {loss.item():.4f}")
# endregion

# region inference
# New patient: age 58, blood_pressure 150, cholesterol 245, smoker
new_patient = torch.tensor([[0.58, 0.75, 0.82, 1.0]])
with torch.no_grad():
    prob = float(model(new_patient).item())
label = "yes" if prob >= 0.5 else "no"
print(f"Probability: {prob:.4f} | Class: {label}")
# endregion
