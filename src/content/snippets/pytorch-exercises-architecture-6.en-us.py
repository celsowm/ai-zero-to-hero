import torch
import torch.nn as nn

# Embedding contract: IDs (B,T) -> vectors (B,T,C).
B, T, V, C = 2, 3, 10, 4
idx = torch.tensor([
    [1, 2, 3],
    [4, 5, 6],
], dtype=torch.long)

# TODO: create an embedding with V tokens and width C.
wte = None

# TODO: apply the embedding to idx.
H = None

# Validator checks these contracts.
H_shape = list(H.shape) if H is not None else []
embedding_weight_shape = list(wte.weight.shape) if wte is not None else []
