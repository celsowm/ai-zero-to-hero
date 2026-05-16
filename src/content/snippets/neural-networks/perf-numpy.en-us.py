import numpy as np

# NumPy: Vectorized in C
size = 1_000_000
a = np.ones(size)
b = np.ones(size) * 2

# A single call to the C backend
c = a + b
