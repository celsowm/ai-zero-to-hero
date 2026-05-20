# Exercise 1: shape/rank
def get_shape(matrix):
    # BUG: reversed order (cols, rows)
    rows = len(matrix)
    cols = len(matrix[0])
    return (cols, rows)

print(get_shape([[1, 2, 3], [4, 5, 6]]))
