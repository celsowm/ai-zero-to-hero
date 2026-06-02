import torch

# FP8 has two IEEE-754-like dtypes
fp8_e4m3 = torch.float8_e4m3fn  # forward pass — range ~±448, ~6% precision
fp8_e5m2 = torch.float8_e5m2    # backward pass — range ~±57344, ~3% precision

# A tensor can be cast to FP8 (cast down)
x = torch.tensor([[1.5, -0.7, 3.14], [0.01, 100.0, -200.0]], dtype=torch.float32)
x_e4m3 = x.to(fp8_e4m3)
x_e5m2 = x.to(fp8_e5m2)
print(f"Original (FP32):\n{x}")
print(f"\nE4M3 (forward, +3 mantissa bits):\n{x_e4m3.to(torch.float32)}")
print(f"\nE5M2 (backward, +2 exponent bits):\n{x_e5m2.to(torch.float32)}")

# Check whether the GPU has native FP8 support (Hopper = sm_90+)
if torch.cuda.is_available():
    capability = torch.cuda.get_device_capability()
    print(f"\nGPU compute capability: {capability}")
    print(f"FP8 acceleration: {'yes (Hopper)' if capability[0] >= 9 else 'no — falls back to FP32'}")
else:
    print("\nNo GPU detected — FP8 storage works but no hardware speedup.")
