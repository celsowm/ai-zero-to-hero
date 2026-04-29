import torch

# Simula um modelo treinado (apenas pesos fictícios para demonstração)
class ModeloDoenca(torch.nn.Module):
    def __init__(self):
        super().__init__()
        self.linear = torch.nn.Linear(4, 1)
        self.sigmoid = torch.nn.Sigmoid()

    def forward(self, x):
        return self.sigmoid(self.linear(x))

modelo = ModeloDoenca()

# Salva o state_dict (pesos treinados)
torch.save(modelo.state_dict(), "modelo_doencas.pt")
print("Modelo salvo com sucesso!")

# --- Recuperação ---
# Recria a arquitetura do zero
modelo_novo = ModeloDoenca()
modelo_novo.load_state_dict(torch.load("modelo_doencas.pt", weights_only=True))
modelo_novo.eval()

# Testa com o mesmo paciente
x_novo = torch.tensor([[0.58, 0.75, 0.82, 1.0]], dtype=torch.float32)
with torch.no_grad():
    prob = modelo_novo(x_novo).item()

print(f"Probabilidade (modelo carregado): {prob:.4f}")
print(f"Classe: {'sim' if prob >= 0.5 else 'nao'}")
