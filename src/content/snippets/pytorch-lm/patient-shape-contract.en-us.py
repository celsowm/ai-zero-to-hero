import torch
from torch import nn

# B = batch: how many examples enter together.
# F = features: how many columns describe each example.
# H = hidden width: width of the intermediate layer.
# O = output width: how many outputs the model produces per example.
B = 6
F = 4
H = 3
O = 1

# X has shape (B, F): 6 patients, 4 features per patient.
# Columns: age/100, blood_pressure/200, cholesterol/300, smoker.
X = torch.tensor([
    [0.35, 0.60, 0.58, 0.0],
    [0.42, 0.65, 0.62, 0.0],
    [0.48, 0.70, 0.68, 0.0],
    [0.58, 0.78, 0.82, 1.0],
    [0.67, 0.84, 0.88, 1.0],
    [0.73, 0.90, 0.93, 1.0],
], dtype=torch.float32)

# y has shape (B, O): 1 target per patient.
y = torch.tensor([[0], [0], [0], [1], [1], [1]], dtype=torch.float32)

# Same architecture as the manual example: F -> H -> O, or 4 -> 3 -> 1.
model = nn.Sequential(
    nn.Linear(F, H),  # receives (B, F) and returns (B, H)
    nn.Sigmoid(),
    nn.Linear(H, O),  # receives (B, H) and returns (B, O)
    nn.Sigmoid(),
)

criterion = nn.MSELoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.5)

for epoch in range(600):
    optimizer.zero_grad()
    y_hat = model(X)       # X (B, F) -> y_hat (B, O)
    loss = criterion(y_hat, y)
    loss.backward()
    optimizer.step()
    if epoch % 100 == 0:
        print(f"Epoch {epoch}: loss = {loss.item():.4f}")

# New patient has shape (1, F): 1 example, same 4 features.
new_patient = torch.tensor([[0.58, 0.75, 0.82, 1.0]])
with torch.no_grad():
    prob = float(model(new_patient).item())  # (1, F) -> (1, O) -> scalar
label = "yes" if prob >= 0.5 else "no"
print(f"Probability: {prob:.4f} | Class: {label}")

print("X:", X.shape)
print("y:", y.shape)
print("new_patient:", new_patient.shape)
print("X.ndim:", X.ndim)
print("y.ndim:", y.ndim)
print("new_patient.ndim:", new_patient.ndim)
