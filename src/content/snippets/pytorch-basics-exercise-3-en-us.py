import numpy as np

def add_bias():
    # Matriz de dados (3 amostras, 3 features)
    data = np.array([[1, 2, 3],
                     [4, 5, 6],
                     [7, 8, 9]], dtype=float)
    
    # BUG: bias com shape errado
    bias = np.array([100, 200, 300], dtype=float)
    # O broadcasting tenta somar bias a cada elemento...
    # Para somar por coluna, bias precisa ser reshape!
    
    # CORRIGIDO: bias como coluna (3, 1)
    bias_fixed = bias.reshape(3, 1)
    result = data + bias_fixed
    return result

print("Data:")
print(np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))
print(f"\
Resultado com broadcasting corrigido:")
print(add_bias())