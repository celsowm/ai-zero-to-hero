x = [x1, x2, x3]      # inputs (what arrives: pixel, word, grade...)
w = [w1, w2, w3]      # weights (importance of each input)
b = 0.0               # bias (fixed shift)
z = sum(wi * xi for wi, xi in zip(w, x)) + b   # raw output
