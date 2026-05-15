# 1D Gradient Descent: finding the minimum of f(w) = w²
# Gradient: df/dw = 2*w
# Update: w = w - lr * 2*w

w = 5.0
lr = 0.1

for step in range(1, 6):
    gradient = 2 * w
    w = w - lr * gradient
    print(f"Step {step}: w = {w:.4f}")
