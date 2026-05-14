import torch
import torch.nn as nn

# --- Dados de exemplo ---
X = torch.tensor([[0.5, 0.3, 0.8, 0.1]], dtype=torch.float32)
y = torch.tensor([[1.0]], dtype=torch.float32)

model = nn.Sequential(nn.Linear(4, 1), nn.Sigmoid())

# --- SGD com Momentum ---
sgd = torch.optim.SGD(model.parameters(), lr=0.01, momentum=0.9)
print("SGD com momentum=0.9: acumula inercia para passar minimos locais")

# --- Adam (padrao da industria) ---
adam = torch.optim.Adam(model.parameters(), lr=0.001)
print("Adam: taxa de aprendizado adaptativa por parametro")

# --- O loop de treino (sempre os mesmos 3 passos) ---
for epoch in range(5):
    # 1. Forward pass
    y_hat = model(X)
    loss = nn.BCELoss()(y_hat, y)

    # 2. Zerar gradientes antigos (PyTorch acumula por padrao!)
    adam.zero_grad()

    # 3. Calcular gradientes (backpropagation)
    loss.backward()

    # 4. Aplicar atualizacao nos pesos
    adam.step()

    print(f"Epoch {epoch+1}: loss = {loss.item():.6f}")

# --- Dica: trocar de otimizador e trocar uma linha ---
# basta substituir `adam` por `sgd` no loop acima
