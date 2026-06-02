import torch

# FP8 tem dois dtypes parecidos com IEEE-754
fp8_e4m3 = torch.float8_e4m3fn  # forward — range ~±448, ~6% de precisão
fp8_e5m2 = torch.float8_e5m2    # backward — range ~±57344, ~3% de precisão

# Um tensor pode ser convertido para FP8 (cast down)
x = torch.tensor([[1.5, -0.7, 3.14], [0.01, 100.0, -200.0]], dtype=torch.float32)
x_e4m3 = x.to(fp8_e4m3)
x_e5m2 = x.to(fp8_e5m2)
print(f"Original (FP32):\n{x}")
print(f"\nE4M3 (forward, +3 bits de mantissa):\n{x_e4m3.to(torch.float32)}")
print(f"\nE5M2 (backward, +2 bits de expoente):\n{x_e5m2.to(torch.float32)}")

# Verifica se a GPU tem suporte nativo a FP8 (Hopper = sm_90+)
if torch.cuda.is_available():
    capability = torch.cuda.get_device_capability()
    print(f"\nCompute capability da GPU: {capability}")
    print(f"Aceleração FP8: {'sim (Hopper)' if capability[0] >= 9 else 'não — cai para FP32'}")
else:
    print("\nNenhuma GPU detectada — FP8 funciona como storage, mas sem aceleração de hardware.")
