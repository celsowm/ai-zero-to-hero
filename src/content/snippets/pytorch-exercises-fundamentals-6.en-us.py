import torch

# Patient batch: expected shape (B=6, F=4).
X = torch.tensor([
    [0.35, 0.60, 0.58, 0.0],
    [0.42, 0.65, 0.62, 0.0],
    [0.48, 0.70, 0.68, 0.0],
    [0.58, 0.78, 0.82, 1.0],
    [0.67, 0.84, 0.88, 1.0],
    [0.73, 0.90, 0.93, 1.0],
], dtype=torch.float32)

# TODO: Read X's shape.
# Save B and F as Python integers.
B = None
F = None
