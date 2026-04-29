import onnxruntime as ort
from onnxruntime.quantization import quantize_dynamic, QuantType

# ONNX Quantization — reduce size and speed up inference
# Converts weights from FP32 to INT8, reducing model by ~4x

# Quantize ONNX model to INT8
quantize_dynamic(
    model_input="model.onnx",          # original FP32 model
    model_output="model_int8.onnx",    # quantized INT8 model
    weight_type=QuantType.QInt8,       # weight quantization type
)

print("Quantized model: model_int8.onnx")

# Load quantized model
session = ort.InferenceSession("model_int8.onnx")

# Inference with ONNX Runtime
import numpy as np
input_data = np.random.randn(1, 10).astype(np.float32)
results = session.run(None, {"input": input_data})
print("Output shape:", results[0].shape)
