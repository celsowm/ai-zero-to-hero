import torch

# Tensor basics — operações fundamentais com torch.Tensor

# Criar tensor a partir de lista
x = torch.tensor([1.0, 2.0, 3.0])
print("Tensor:", x)

# Tensor de zeros, uns e aleatório
zeros = torch.zeros(3, 4)       # matriz 3x4 de zeros
ones = torch.ones(2, 3)         # matriz 2x3 de uns
rand = torch.randn(2, 2)        # matriz 2x2 normal(0,1)
print("Zeros shape:", zeros.shape)

# Operações matemáticas
y = torch.tensor([4.0, 5.0, 6.0])
soma = x + y                    # elemento a elemento
produto = x * y                 # multiplicação elemento a elemento
dot = torch.dot(x, y)           # produto escalar
print("Soma:", soma)
print("Dot product:", dot)

# Reshape e view
matrix = torch.arange(12)       # [0, 1, 2, ..., 11]
reshaped = matrix.view(3, 4)    # matriz 3x4
print("Reshaped:\n", reshaped)

# Converter para numpy
numpy_arr = reshaped.numpy()
print("Tipo numpy:", type(numpy_arr))

# GPU (se disponível)
if torch.cuda.is_available():
    x_gpu = x.to("cuda")
    print("Tensor na GPU:", x_gpu.device)
