def sigmoid_derivative(s):
    # BUG: esta função retorna valores negativos!
    # Encontre o sinal errado e corrija.
    return s * (1 + s)

# Teste: sigmoid(0) = 0.5, derivada deveria ser 0.25
print(f"Bug: sigmoid_derivative(0.5) = {sigmoid_derivative(0.5)}")
print(f"Bug: sigmoid_derivative(0.8) = {sigmoid_derivative(0.8)}")

# Corrija a função e rode de novo:
print(f"\
Corrigido: sigmoid_derivative(0.5) = {sigmoid_derivative(0.5)}")
print(f"Corrigido: sigmoid_derivative(0.8) = {sigmoid_derivative(0.8)}")