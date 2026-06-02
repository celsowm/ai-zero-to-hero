import torch
import math

# Simula pesos de um LLM: ~N(0, 0.1)
torch.manual_seed(42)
W = torch.randn(1000) * 0.1

def quantize(x, bits=8):
    k = 2**bits
    min_val, max_val = x.min(), x.max()
    S = (max_val - min_val) / (k - 1)
    Z = round(-min_val / S)
    x_q = torch.clamp(torch.round(x / S) + Z, 0, k - 1)
    x_deq = (x_q - Z) * S
    return x_q, x_deq, S, Z

x_q, x_deq, S, Z = quantize(W, bits=8)
mse = ((W - x_deq) ** 2).mean()
print(f"INT8: S={S:.6f}, Z={Z:.0f}, MSE={mse:.6f}")

x_q4, x_deq4, S4, Z4 = quantize(W, bits=4)
mse4 = ((W - x_deq4) ** 2).mean()
print(f"NF4:  S={S4:.6f}, Z={Z4:.0f}, MSE={mse4:.6f}")

print(f"\nRange original: [{W.min():.4f}, {W.max():.4f}]")
print(f"INT8 levels: {2**8}, NF4 levels: {2**4}")
