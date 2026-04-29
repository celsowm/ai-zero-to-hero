import onnxruntime as ort
from onnxruntime.quantization import quantize_dynamic, QuantType

# Quantização ONNX — reduzir tamanho e acelerar inferência
# Converte pesos de FP32 para INT8, reduzindo modelo em ~4x

# Quantizar modelo ONNX para INT8
quantize_dynamic(
    model_input="model.onnx",          # modelo original FP32
    model_output="model_int8.onnx",    # modelo quantizado INT8
    weight_type=QuantType.QInt8,       # tipo de quantização dos pesos
)

print("Modelo quantizado: model_int8.onnx")

# Carregar modelo quantizado
session = ort.InferenceSession("model_int8.onnx")

# Inferência com ONNX Runtime
import numpy as np
input_data = np.random.randn(1, 10).astype(np.float32)
results = session.run(None, {"input": input_data})
print("Output shape:", results[0].shape)
