# Exercise 4: requires_grad/backward (simplified)
def grad_square(x):
    # BUG: wrong gradient
    return x * x

print(grad_square(3.0))
