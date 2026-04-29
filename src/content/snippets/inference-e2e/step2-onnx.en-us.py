from transformers import AutoModel, AutoTokenizer
import torch

# Step 2: Export to ONNX — optimized format for inference
model_name = "gpt2"
model = AutoModel.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Prepare dummy input for export
example_text = "example text"
inputs = tokenizer(example_text, return_tensors="pt")

# Export model to ONNX
dummy_input = {
    "input_ids": inputs["input_ids"],
    "attention_mask": inputs["attention_mask"],
}

torch.onnx.export(
    model,
    (dummy_input["input_ids"],),
    "model.onnx",
    input_names=["input_ids"],
    output_names=["last_hidden_state"],
    dynamic_axes={
        "input_ids": {0: "batch", 1: "sequence"},
        "last_hidden_state": {0: "batch", 1: "sequence"},
    },
    opset_version=14,
)
print("Model exported to model.onnx")
