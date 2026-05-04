# 1. Install dependencies
# pip install transformers torch safetensors

from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch
from safetensors.torch import save_file
import os

# 2. Download model and tokenizer from HuggingFace Hub
MODEL_NAME = "gpt2"
print(f"Downloading {MODEL_NAME} from HuggingFace Hub...")
tokenizer = GPT2Tokenizer.from_pretrained(MODEL_NAME)
model = GPT2LMHeadModel.from_pretrained(MODEL_NAME)
model.eval()

# 3. Inspect — see shapes of each tensor
print(f"Total parameters: {model.num_parameters():,}")
print("State dict keys:")
for k, v in model.state_dict().items():
    print(f"  {k:50s} {tuple(v.shape)}")

# 4. Save as PyTorch format (.pt)
OUTPUT_PT = "gpt2_weights.pt"
torch.save(model.state_dict(), OUTPUT_PT)
print(f"Saved {OUTPUT_PT} ({os.path.getsize(OUTPUT_PT) / 1e6:.0f}MB)")

# 5. (Optional) Save as .safetensors — safer and faster
OUTPUT_SF = "gpt2_weights.safetensors"
save_file(model.state_dict(), OUTPUT_SF)
print(f"Saved {OUTPUT_SF} ({os.path.getsize(OUTPUT_SF) / 1e6:.0f}MB)")

# 6. Verify — load back
loaded = torch.load(OUTPUT_PT, weights_only=True)
assert loaded.keys() == model.state_dict().keys()
print("Verified: weights loaded successfully!")
