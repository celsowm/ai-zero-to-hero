import torch
import torch.nn as nn

def create_mlp():
    # TODO: Create a sequential model with:
    # 1. Linear layer from 4 input features to 16
    # 2. ReLU activation
    # 3. Linear layer from 16 to 1
    # 4. Sigmoid activation
    
    model = nn.Sequential(
        # YOUR CODE HERE
        
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
