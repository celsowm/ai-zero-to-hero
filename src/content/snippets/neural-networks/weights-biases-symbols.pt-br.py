x = [x1, x2, x3]      # entradas (o que chega: pixel, palavra, nota…)
w = [w1, w2, w3]      # pesos (importância de cada entrada)
b = 0.0               # viés (deslocamento fixo)
z = sum(wi * xi for wi, xi in zip(w, x)) + b   # saída bruta
