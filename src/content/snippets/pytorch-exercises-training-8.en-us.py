# Exercise 4: simplified zero_grad
def zero_grad(grads):
    # BUG: does not reset gradients
    for name in grads:
        grads[name] = grads[name]
    return grads

print(zero_grad({'w': 1.5, 'b': -0.3}))
