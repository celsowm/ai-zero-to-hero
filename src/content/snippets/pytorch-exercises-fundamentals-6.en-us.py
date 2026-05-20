# Exercise 2: indexing/slicing
def get_column(matrix, col_idx):
    column = []
    for row in matrix:
        column.append(row[col_idx])
    return column

print(get_column([[1, 2, 3], [4, 5, 6]], 1))
