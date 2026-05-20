# Exercise 3: bias broadcast
def add_bias(matrix, bias):
    out = []
    for row in matrix:
        new_row = []
        for j, value in enumerate(row):
            new_row.append(value + bias[j])
        out.append(new_row)
    return out

print(add_bias([[1, 2], [3, 4]], [10, 20]))
