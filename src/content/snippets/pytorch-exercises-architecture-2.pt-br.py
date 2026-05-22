import torch
import torch.nn as nn

# Contrato de embedding: IDs (B,T) -> vetores (B,T,C).
B, T, V, C = 2, 3, 10, 4
idx = torch.tensor([
    [1, 2, 3],
    [4, 5, 6],
], dtype=torch.long)

# TODO: crie uma embedding com V tokens e largura C.
wte = None

# TODO: aplique a embedding em idx.
H = None

# O validador checará estes contratos.
H_shape = list(H.shape) if H is not None else []
embedding_weight_shape = list(wte.weight.shape) if wte is not None else []
