# @region validation
import torch

# 1. Check for hardware acceleration availability
cuda_available = torch.cuda.is_available()
mps_available = hasattr(torch.backends, "mps") and torch.backends.mps.is_available()

# 2. Define the execution device
# Priority: NVIDIA (CUDA) -> Apple (MPS) -> Processor (CPU)
if cuda_available:
    device = "cuda"
elif mps_available:
    device = "mps"
else:
    device = "cpu"

# 3. Create a tensor directly on the chosen hardware
# This avoids the bottleneck of transferring data from CPU to GPU later
x = torch.tensor([1.0, 2.0, 3.0], device=device)

print(f"Hardware in use: {device.upper()}")
print(f"Calculation result: {x * 2}")
# @end
