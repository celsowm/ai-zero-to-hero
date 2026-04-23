import torch

x_novo = torch.tensor([
    [58 / 100, 150 / 200, 245 / 300, 1.0]
], dtype=torch.float32)

with torch.no_grad():
    prob = model(x_novo).item()

classe = "sim" if prob >= 0.5 else "nao"
print("Probabilidade:", round(prob, 4))
print("Classe prevista:", classe)
