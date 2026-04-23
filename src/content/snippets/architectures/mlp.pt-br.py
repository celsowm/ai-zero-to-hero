# @region e2e
# 1. ENTRADAS (Features Tabulares)
# Idade, Pressão, Colesterol, Fumante
paciente = [0.45, 0.60, 0.52, 1.0]

# 2. PARÂMETROS (Pesos e Biases)
# Pesos para 3 neurônios ocultos (cada um olha para as 4 entradas)
pesos_ocultos = [
    [0.2, -0.3, 0.5, 0.1],  # Neurônio 1
    [0.1, 0.2, -0.1, 0.4],  # Neurônio 2
    [-0.4, 0.5, 0.1, -0.2]  # Neurônio 3
]
biases_ocultos = [0.1, -0.2, 0.05]

# 3. LÓGICA DE PROCESSAMENTO (Forward)
def layer_forward(inputs, weights, biases):
    saidas = []
    for w, b in zip(weights, biases):
        # Soma Ponderada Total (Conexão Densa)
        z = sum(x * weight for x, weight in zip(inputs, w)) + b
        # Ativação Sigmoid
        saidas.append(1 / (1 + (2.718 ** -z)))
    return saidas

# 4. EXECUÇÃO
resultado = layer_forward(paciente, pesos_ocultos, biases_ocultos)
print(f"Ativações da Camada Oculta: {resultado}")
# @end
