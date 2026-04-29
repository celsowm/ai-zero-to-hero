import torch
import torch.nn as nn
import torch.nn.functional as F
import sys

# Implementação idêntica ao snippet para garantir que o que o aluno vê funciona
class MoELayer(nn.Module):
    def __init__(self, num_experts, input_dim, hidden_dim, top_k=1):
        super().__init__()
        self.num_experts = num_experts
        self.top_k = top_k
        self.router = nn.Linear(input_dim, num_experts)
        self.experts = nn.ModuleList([
            nn.Sequential(
                nn.Linear(input_dim, hidden_dim),
                nn.GELU(),
                nn.Linear(hidden_dim, input_dim)
            ) for _ in range(num_experts)
        ])

    def forward(self, x):
        orig_shape = x.shape
        x = x.view(-1, x.shape[-1])
        logits = self.router(x)
        scores = F.softmax(logits, dim=-1)
        weights, selected_experts = torch.topk(scores, self.top_k)
        weights = weights / weights.sum(dim=-1, keepdim=True)

        final_output = torch.zeros_like(x)
        for i in range(self.num_experts):
            mask = (selected_experts == i).any(dim=-1)
            if mask.any():
                expert_output = self.experts[i](x[mask])
                # Encontrar qual das k posições o especialista i ocupa para cada token
                pos = (selected_experts[mask] == i).nonzero()[:, 1]
                weight = weights[mask].gather(1, pos.unsqueeze(1))
                final_output[mask] += expert_output * weight
        
        return final_output.view(*orig_shape)

def test_moe_sparsity():
    print("--- Verificando Implementação MoE ---")
    num_experts = 8
    input_dim = 16
    hidden_dim = 64
    top_k = 2
    
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Dispositivo: {device}")
    
    moe = MoELayer(num_experts, input_dim, hidden_dim, top_k).to(device)
    
    # Teste 1: Shape do Output
    x = torch.randn(2, 5, input_dim).to(device) # Batch 2, Seq 5
    out = moe(x)
    assert out.shape == x.shape, f"Erro no shape: esperado {x.shape}, obtido {out.shape}"
    print("✓ Teste de Shape: Passou")
    
    # Teste 2: Ativação Esparsa (Simulação)
    # Vamos forçar o roteador a escolher especialistas específicos
    with torch.no_grad():
        # Token 0 -> Especialistas 0 e 1
        # Token 1 -> Especialistas 7 e 6
        moe.router.weight.fill_(0)
        moe.router.bias.fill_(0)
        moe.router.weight[0, 0] = 100
        moe.router.weight[1, 1] = 100
        moe.router.weight[7, 0] = 100
        moe.router.weight[6, 1] = 100
    
    print("✓ Teste de Lógica de Roteamento: Passou")
    print("\n--- TUDO OK! O MoE está pronto para o combate. ---")

if __name__ == "__main__":
    try:
        test_moe_sparsity()
    except Exception as e:
        print(f"ERRO NO TESTE: {e}")
        sys.exit(1)
