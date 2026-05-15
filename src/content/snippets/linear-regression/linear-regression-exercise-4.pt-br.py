# Experiment: Qual predição erra mais?
# Modelo: y_hat = 10 + 2*x

dados = [
    (3, 18),
    (5, 15),
    (7, 30),
    (1, 14),
]

print("Erros:")
maior_erro = -1
melhor_x = None

for x, y_real in dados:
    y_hat = 10 + 2 * x
    erro = abs(y_real - y_hat)
    print(f"  x={x}: y_hat={y_hat}, y_real={y_real}, erro={erro}")
    if erro > maior_erro:
        maior_erro = erro
        melhor_x = x

print(f"\nMaior erro: x={melhor_x} com erro={maior_erro}")
