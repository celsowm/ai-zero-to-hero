x = [0.8, 0.4, 0.1]   # entradas
w = [0.6, -0.5, 0.2]  # pesos
b = -0.1              # viés

# Passo a passo:
t1 = 0.6 * 0.8   #  0.48  ← entrada 1 empurra z para cima
t2 = -0.5 * 0.4  # -0.20  ← entrada 2 empurra z para baixo
t3 = 0.2 * 0.1   #  0.02  ← entrada 3 contribui pouco
z  = t1 + t2 + t3 + b  # 0.20
