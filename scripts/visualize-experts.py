import torch
import torch.nn as nn
import torch.nn.functional as F
import matplotlib.pyplot as plt
import seaborn as sns

# Reusando nossa MoELayer didática para visualização
class VisualMoELayer(nn.Module):
    def __init__(self, num_experts, input_dim, top_k=1):
        super().__init__()
        self.num_experts = num_experts
        self.top_k = top_k
        self.router = nn.Linear(input_dim, num_experts)
        
    def forward(self, x):
        # x: [batch, seq_len, dim]
        logits = self.router(x.view(-1, x.shape[-1]))
        scores = F.softmax(logits, dim=-1)
        # Pegamos os top-k e seus índices (experts)
        weights, selected_experts = torch.topk(scores, self.top_k)
        return scores, selected_experts

def visualize_expert_specialization():
    print("--- Visualizando a Especialização dos Experts ---")
    
    num_experts = 8
    dim = 32
    seq_len = 10
    moe = VisualMoELayer(num_experts, dim, top_k=2)
    
    # Criamos 3 tipos de "tokens" simulados (Contextos diferentes)
    # 1. Tokens de Pontuação (baixa variância)
    punct_tokens = torch.randn(3, dim) + 5 
    # 2. Tokens de Verbos (outra região do espaço)
    verb_tokens = torch.randn(4, dim) - 5
    # 3. Tokens de Substantivos
    noun_tokens = torch.randn(3, dim) * 2

    tokens = torch.cat([punct_tokens, verb_tokens, noun_tokens], dim=0)
    token_labels = ["Punct"]*3 + ["Verb"]*4 + ["Noun"]*3

    # Rodar roteamento
    scores, selected = moe(tokens)
    
    # Criar Matrix de Ativação (Tokens x Experts)
    activation_matrix = torch.zeros(len(tokens), num_experts)
    for i, experts in enumerate(selected):
        activation_matrix[i, experts] = 1 # Marca quais experts foram ativados

    # Plotar
    plt.figure(figsize=(10, 6))
    sns.heatmap(activation_matrix.numpy(), annot=True, cmap="Blues", 
                xticklabels=[f"Expert {i}" for i in range(num_experts)],
                yticklabels=token_labels)
    
    plt.title("Mapa de Ativação MoE: Quem resolve o quê?")
    plt.xlabel("Especialistas")
    plt.ylabel("Tipo de Token")
    
    output_file = "moe_expert_map.png"
    plt.savefig(output_file)
    print(f"✓ Mapa de especialistas salvo em: {output_file}")
    print("\nO que observar:")
    print("- Verbos tendem a ativar o mesmo grupo de especialistas.")
    print("- Pontuação ativa outros especialistas completamente diferentes.")
    print("- Isso é a especialização: o modelo divide o trabalho por 'assunto'.")

if __name__ == "__main__":
    visualize_expert_specialization()
