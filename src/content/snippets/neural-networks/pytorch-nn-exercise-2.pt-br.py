import torch
import torch.nn as nn

def inference_step(model, x):
    # TODO: Configure o modelo para inferência
    
    # 1. Coloque o modelo em modo eval
    # SEU CÓDIGO AQUI
    
    # 2. Use o contexto que desliga a gravação de histórico de gradiente
    # SEU CÓDIGO AQUI
        out = model(x)
        return out

if __name__ == "__main__":
    # Um modelo com Dropout se comporta diferente em train vs eval
    model = nn.Sequential(nn.Linear(2, 2), nn.Dropout(0.5))
    x = torch.ones(1, 2)
    
    try:
        out = inference_step(model, x)
        print(f"Requires grad: {out.requires_grad}")
        print(f"Training mode: {model.training}")
    except Exception as e:
        print("Erro:", e)
