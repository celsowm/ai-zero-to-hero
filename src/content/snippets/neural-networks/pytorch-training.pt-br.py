import torch
import torch.nn as nn

X = torch.tensor([
    [0.35, 0.60, 0.58, 0.0],
    [0.42, 0.65, 0.62, 0.0],
    [0.48, 0.70, 0.68, 0.0],
    [0.58, 0.78, 0.82, 1.0],
    [0.67, 0.84, 0.88, 1.0],
    [0.73, 0.90, 0.93, 1.0],
], dtype=torch.float32)
y = torch.tensor([[0.0], [0.0], [0.0], [1.0], [1.0], [1.0]], dtype=torch.float32)

torch.manual_seed(7)

model = nn.Sequential(
    nn.Linear(4, 3),
    nn.Sigmoid(),
    nn.Linear(3, 1),
    nn.Sigmoid(),
)

criterion = nn.BCELoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.5)

for epoch in range(600):
    y_hat = model(X)
    loss = criterion(y_hat, y)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

print("Loss final:", round(loss.item(), 6))
print("Saidas:", [round(v, 4) for v in model(X).detach().squeeze().tolist()])
