import torch
import torch.nn as nn

# MLP 4->3->1 com sigmoid na saída
model = nn.Sequential(
    nn.Linear(4, 3),
    nn.Sigmoid(),
    nn.Linear(3, 1),
    nn.Sigmoid(),
)

# BCELoss: classificação binária com saída já em [0,1]
criterion = nn.BCELoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.5)

# Loop de treino completo
for epoch in range(600):
    y_hat = model(X)
    loss = criterion(y_hat, y)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

print("Loss final:", round(loss.item(), 6))
print("Predições:", [round(v, 4) for v in model(X).detach().squeeze().tolist()])
