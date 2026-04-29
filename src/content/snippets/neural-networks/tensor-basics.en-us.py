import torch

# Tensor basics — fundamental operations with torch.Tensor

# Create tensor from list
x = torch.tensor([1.0, 2.0, 3.0])
print("Tensor:", x)

# Zeros, ones, and random tensors
zeros = torch.zeros(3, 4)       # 3x4 matrix of zeros
ones = torch.ones(2, 3)         # 2x3 matrix of ones
rand = torch.randn(2, 2)        # 2x2 matrix from normal(0,1)
print("Zeros shape:", zeros.shape)

# Mathematical operations
y = torch.tensor([4.0, 5.0, 6.0])
add = x + y                     # element-wise
mul = x * y                     # element-wise multiplication
dot = torch.dot(x, y)           # dot product
print("Add:", add)
print("Dot product:", dot)

# Reshape and view
matrix = torch.arange(12)       # [0, 1, 2, ..., 11]
reshaped = matrix.view(3, 4)    # 3x4 matrix
print("Reshaped:\n", reshaped)

# Convert to numpy
numpy_arr = reshaped.numpy()
print("Numpy type:", type(numpy_arr))

# GPU (if available)
if torch.cuda.is_available():
    x_gpu = x.to("cuda")
    print("Tensor on GPU:", x_gpu.device)
