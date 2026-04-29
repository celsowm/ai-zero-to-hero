import torch
import torch.nn as nn

# Export to ONNX — convert PyTorch model to universal format
class SimpleModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.linear = nn.Linear(10, 2)

    def forward(self, x):
        return self.linear(x)

model = SimpleModel()
model.eval()  # evaluation mode — disables dropout/batchnorm

# Dummy input to define the ONNX graph format
dummy_input = torch.randn(1, 10)

torch.onnx.export(
    model,
    dummy_input,
    "model.onnx",
    input_names=["input"],
    output_names=["output"],
    dynamic_axes={
        "input": {0: "batch_size"},
        "output": {0: "batch_size"},
    },
    opset_version=14,
)
print("Model exported to model.onnx")
