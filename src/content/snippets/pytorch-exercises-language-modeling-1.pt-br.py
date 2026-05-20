# Exercício 1: shift x/y
def make_xy(tokens):
    x = tokens[:-1]
    y = tokens[1:]
    return x, y

print(make_xy([10, 11, 12, 13]))
