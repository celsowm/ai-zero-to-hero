import numpy as np

# OUTPUT 1: o que você vê
output1 = [[0., 0., 0.], [0., 0., 0.]]
print("Output 1:", output1)
# Pergunta: qual np.zeros(...)?
# shape = (?, ?)

# OUTPUT 2: outro mistério
output2 = [[[1., 1.], [1., 1.], [1., 1.]]]
print("\
Output 2:", output2)
# Pergunta: qual np.ones(...)?
# shape = (?, ?, ?)

# Crie os tensores e verifique:
t1 = np.zeros((2, 3))
t2 = np.ones((1, 3, 2))

print(f"\
t1.shape = {t1.shape}  (deveria produzir {len(output1)}x{len(output1[0])})")
print(f"t2.shape = {t2.shape}  (deveria produzir {len(output2)}x{len(output2[0])}x{len(output2[0][0])})")
print(f"\
Iguais? t1: {np.allclose(t1, output1)}, t2: {np.allclose(t2, output2)}")