# region bridge
# Continuação do neural-network-minimal-example.
# O treino anterior já gerou `parametros_finais`; aqui só reaproveitamos esse snapshot.
parametros = parametros_finais
# endregion

# region helpers
from math import exp

def sigmoid(z):
    return 1.0 / (1.0 + exp(-z))
# endregion

# region predict
def prever_probabilidade(paciente, p):
    x = [
        paciente["idade"] / 100,
        paciente["pressao"] / 200,
        paciente["colesterol"] / 300,
        paciente["fumante"],
    ]
    h = []
    for j in range(3):
        z = sum(p["w1"][j][i] * x[i] for i in range(4)) + p["b1"][j]
        h.append(sigmoid(z))
    z_out = sum(p["w2"][j] * h[j] for j in range(3)) + p["b2"]
    return sigmoid(z_out)
# endregion

# region sample
paciente = {"idade": 58, "pressao": 150, "colesterol": 245, "fumante": 1.0}
# endregion

# region output
prob = prever_probabilidade(paciente, parametros)
classe = "sim" if prob >= 0.5 else "não"
print("Probabilidade:", round(prob, 4))
print("Classe prevista:", classe)
# endregion
