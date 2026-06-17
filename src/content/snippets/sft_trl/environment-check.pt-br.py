import importlib.metadata as metadata

import torch

packages = ["trl", "transformers", "peft", "datasets", "accelerate", "torch"]

for package in packages:
    print(f"{package}=={metadata.version(package)}")

print("cuda_available:", torch.cuda.is_available())
if torch.cuda.is_available():
    print("cuda_name:", torch.cuda.get_device_name(0))
    print("cuda_mem_gb:", round(torch.cuda.get_device_properties(0).total_memory / 1024**3, 1))
