dados = [(160, 20, 55), (165, 24, 59), (170, 28, 64)]

# forma longa
soma_idades = 0
for altura, idade, peso in dados:
    soma_idades += idade

# forma compacta equivalente
soma_idades_2 = sum(idade for altura, idade, peso in dados)

print(soma_idades)
print(soma_idades_2)
