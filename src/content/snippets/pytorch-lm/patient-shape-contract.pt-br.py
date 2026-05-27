import torch
from torch import nn

# B = batch: quantos exemplos entram juntos.
# F = features: quantas colunas descrevem cada exemplo.
# H = hidden width: largura da camada intermediária.
# O = output width: quantas saídas o modelo produz por exemplo.
B = 6
F = 4
H = 3
O = 1

# X tem shape (B, F): 6 pacientes, 4 features por paciente.
# Colunas: idade/100, pressão/200, colesterol/300, fumante.
X = torch.tensor([
    [0.35, 0.60, 0.58, 0.0],
    [0.42, 0.65, 0.62, 0.0],
    [0.48, 0.70, 0.68, 0.0],
    [0.58, 0.78, 0.82, 1.0],
    [0.67, 0.84, 0.88, 1.0],
    [0.73, 0.90, 0.93, 1.0],
], dtype=torch.float32)

# y tem shape (B, O): 1 alvo por paciente.
y = torch.tensor([[0], [0], [0], [1], [1], [1]], dtype=torch.float32)

# Mesma arquitetura do exemplo manual: F -> H -> O, ou 4 -> 3 -> 1.
model = nn.Sequential(
    nn.Linear(F, H),  # recebe (B, F) e devolve (B, H)
    nn.Sigmoid(),
    nn.Linear(H, O),  # recebe (B, H) e devolve (B, O)
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

# Novo paciente tem shape (1, F): 1 exemplo, mesmas 4 features.
novo = torch.tensor([[0.58, 0.75, 0.82, 1.0]])
with torch.no_grad():
    prob = float(model(novo).item())  # (1, F) -> (1, O) -> escalar
classe = "sim" if prob >= 0.5 else "não"
print(f"Probabilidade: {prob:.4f} | Classe: {classe}")

print("X:", X.shape)
print("y:", y.shape)
print("novo:", novo.shape)
print("X.ndim:", X.ndim)
print("y.ndim:", y.ndim)
print("novo.ndim:", novo.ndim)
