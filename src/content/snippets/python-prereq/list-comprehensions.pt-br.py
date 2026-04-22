dados = [(160, 20, 55), (165, 24, 59), (170, 28, 64)]

# forma longa
alturas = []
for altura, idade, peso in dados:
    alturas.append(altura)

# forma compacta equivalente
alturas_2 = [altura for altura, idade, peso in dados]

print(alturas)
print(alturas_2)
