from transformers import AutoModel, AutoTokenizer
import torch

# Step 2: Export para ONNX — formato otimizado para inferência
model_name = "gpt2"
model = AutoModel.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Preparar entrada dummy para export
texto_exemplo = "exemplo de texto"
inputs = tokenizer(texto_exemplo, return_tensors="pt")

# Exportar modelo para ONNX
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
print("Modelo exportado para model.onnx")
