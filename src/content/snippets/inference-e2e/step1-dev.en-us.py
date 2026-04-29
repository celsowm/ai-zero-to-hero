from transformers import AutoModel, AutoTokenizer
import torch

# Step 1: Dev setup — load model and tokenizer with AutoModel
# device_map="auto" places the model on GPU if available
model_name = "gpt2"

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModel.from_pretrained(model_name, device_map="auto")

# Prepare input and run inference
text = "The future of technology is"
inputs = tokenizer(text, return_tensors="pt").to(model.device)

with torch.no_grad():
    outputs = model(**inputs)
    # last_hidden_state: (batch, seq_len, hidden_size)
    print("Output shape:", outputs.last_hidden_state.shape)
