# Fix the Bug: Gradient Descent Backwards?
# This code tries to find the minimum of f(w) = w²
# using Gradient Descent, but something is wrong...

def f(w):
    return w ** 2

def gradient(w):
    return 2 * w

w = 5.0
lr = 0.2

print("With the BUG:")
for step in range(1, 6):
    grad = gradient(w)
    # BUG: wrong sign in the update!
    w = w + lr * grad  # <-- find and fix
    print(f"  Step {step}: w = {w:.4f}")

print("\nFixed:")
w = 5.0
for step in range(1, 6):
    grad = gradient(w)
    # FIXED:
    w = w - lr * grad
    print(f"  Step {step}: w = {w:.4f}")
