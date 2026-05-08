import torch
import torch.nn as nn

# MLP 4->3->1 with sigmoid output
model = nn.Sequential(
    nn.Linear(4, 3),
    nn.Sigmoid(),
    nn.Linear(3, 1),
    nn.Sigmoid(),
)

# BCELoss: binary classification with output already in [0,1]
criterion = nn.BCELoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.5)

# Full training loop
for epoch in range(600):
    y_hat = model(X)
    loss = criterion(y_hat, y)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

print("Final loss:", round(loss.item(), 6))
print("Predictions:", [round(v, 4) for v in model(X).detach().squeeze().tolist()])
