import torch
import torch.nn as nn

def create_mlp():
    # TODO: Crie um modelo sequencial com:
    # 1. Camada Linear de 4 features de entrada para 16
    # 2. Ativação ReLU
    # 3. Camada Linear de 16 para 1
    # 4. Ativação Sigmoid
    
    model = nn.Sequential(
        # SEU CÓDIGO AQUI
        
    )
    return model

if __name__ == "__main__":
    model = create_mlp()
    layers = list(model.children())
    print(f"Num layers: {len(layers)}")
    if len(layers) > 0:
        print(f"Layer 1: {type(layers[0]).__name__}")
        print(f"Layer 2: {type(layers[1]).__name__}")
        print(f"Layer 3: {type(layers[2]).__name__}")
        print(f"Layer 4: {type(layers[3]).__name__}")
