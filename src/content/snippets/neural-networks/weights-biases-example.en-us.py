x = [0.8, 0.4, 0.1]   # inputs
w = [0.6, -0.5, 0.2]  # weights
b = -0.1              # bias

# Step by step:
t1 = 0.6 * 0.8   #  0.48  ← input 1 pushes z upward
t2 = -0.5 * 0.4  # -0.20  ← input 2 pushes z downward
t3 = 0.2 * 0.1   #  0.02  ← input 3 contributes little
z  = t1 + t2 + t3 + b  # 0.20
