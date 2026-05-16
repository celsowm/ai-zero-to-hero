import numpy as np

# NumPy: Vetorizado em C
size = 1_000_000
a = np.ones(size)
b = np.ones(size) * 2

# Uma única chamada para o backend em C
c = a + b
