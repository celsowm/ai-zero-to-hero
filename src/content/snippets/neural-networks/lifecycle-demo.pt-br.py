import torch
import torch.nn as nn

# --- Modelo de exemplo ---
model = nn.Sequential(
    nn.Linear(10, 8),
    nn.Dropout(0.3),   # comportamento diferente em train vs eval
    nn.Linear(8, 1),
    nn.Sigmoid(),
)

X = torch.randn(4, 10)

# --- 1. model.train() vs model.eval() ---
model.train()
saida_train = model(X)  # Dropout ativo: zera 30% dos neuronios
print("Modo treino (dropout ativo):", saida_train.shape)

model.eval()
saida_eval = model(X)   # Dropout desligado: todos os neuronios ativos
print("Modo avaliacao (dropout OFF):", saida_eval.shape)

# --- 2. torch.no_grad() para inferencia (economiza memoria) ---
with torch.no_grad():
    pred = model(X)
    print("Predicao (sem gradiente):", pred.shape)
    print("Requer grad?", pred.requires_grad)  # False

# --- 3. .detach() para salvar resultados sem o grafo ---
modelo_treino = nn.Sequential(nn.Linear(10, 8), nn.ReLU(), nn.Linear(8, 1))
optimizer = torch.optim.Adam(modelo_treino.parameters(), lr=0.01)

for _ in range(3):
    y_hat = modelo_treino(X)
    loss = y_hat.pow(2).mean()
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

# Salvar a loss sem arrastar o grafo de computacao
loss_value = loss.detach().item()
print("Loss salva (detach):", round(loss_value, 6))

# Converter para numpy sem gradientes
numpy_array = pred.detach().numpy()
print("Numpy shape:", numpy_array.shape)
