# Python puro: lento para loops
size = 1_000_000
a = [1.0] * size
b = [2.0] * size
c = []

for i in range(size):
    # Overhead de interpretação em cada iteração
    c.append(a[i] + b[i])
