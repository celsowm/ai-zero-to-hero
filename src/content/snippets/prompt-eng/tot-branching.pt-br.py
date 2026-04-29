# Tree of Thoughts: múltiplos caminhos de raciocínio
import random

problem = "Qual é o próximo número na sequência: 2, 6, 14, 30, ?"

# Gera múltiplos pensamentos (branching)
thoughts = [
    "Cada número é o anterior × 2 + 2: 2×2+2=6, 6×2+2=14, 14×2+2=30. Próximo: 30×2+2=62",
    "Diferenças entre termos: 4, 8, 16 (dobrando). Próxima diferença: 32. Resposta: 30+32=62",
    "Fórmula: a(n) = 2^(n+1) - 2. a(5) = 2^6 - 2 = 64 - 2 = 62",
]

# Simula votação
votes = {}
for t in thoughts:
    answer = t.split("Resposta:")[-1].split("62")[0] + "62"
    votes[62] = votes.get(62, 0) + 1

print("=== Tree of Thoughts ===")
print(f"Problema: {problem}")
for i, t in enumerate(thoughts, 1):
    print(f"\nCaminho {i}: {t}")
print(f"\nVotação: 62 recebeu {votes[62]} votos de {len(thoughts)} caminhos")
print(f"Resposta final (majoritária): 62")
