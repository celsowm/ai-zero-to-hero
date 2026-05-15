def update_w(w, gradient, lr):
    # BUG: this function makes w diverge!
    # Find and fix the wrong sign.
    return w + lr * gradient

w = 5.0
lr = 0.1
print("With the BUG:")
for i in range(5):
    grad = 2 * w
    w = update_w(w, grad, lr)
    print(f"  Step {i+1}: w = {w:.4f}")

# Now fix the function and run again:
w = 5.0
print("\
Fixed:")
for i in range(5):
    grad = 2 * w
    w = update_w(w, grad, lr)
    print(f"  Step {i+1}: w = {w:.4f}")