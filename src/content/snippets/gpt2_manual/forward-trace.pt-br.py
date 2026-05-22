import torch
from torch import nn

B, T, C, V = 1, 3, 768, 50257
idx = torch.tensor([[1135, 262, 661]])
x = torch.zeros(B, T, C)

blocos = nn.ModuleList([nn.Identity() for _ in range(12)])
for indice_camada, bloco in enumerate(blocos):
    x = bloco(x)
    print(f"bloco[{indice_camada}]:", tuple(x.shape))

ln_f = nn.LayerNorm(C)
lm_head = nn.Linear(C, V, bias=False)
x = ln_f(x)
logits = lm_head(x)
logits_proximo_token = logits[:, -1, :]

print("depois de ln_f:", tuple(x.shape))
print("logits:", tuple(logits.shape))
print("linha do próximo token:", tuple(logits_proximo_token.shape))
