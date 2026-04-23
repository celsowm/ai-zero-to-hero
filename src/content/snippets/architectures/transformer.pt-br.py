# @region e2e
# 1. ENTRADA (Embeddings de 3 tokens)
# Cada linha é um vetor representando uma palavra
embeddings = [
    [1.0, 0.0, 0.5], # "O"
    [0.0, 1.0, 0.2], # "gato"
    [0.5, 0.5, 1.0]  # "corre"
]

# 2. LÓGICA DE ATENÇÃO (Simplified)
def scaled_dot_product_attention(query, keys, values):
    # Calcula scores de afinidade entre a Query e todas as Keys
    scores = []
    for k in keys:
        # Produto Escalar: mede o quanto as palavras combinam
        dot = sum(q * ki for q, ki in zip(query, k))
        scores.append(dot)
    
    # Softmax simplificado (converte scores em pesos 0-1)
    exps = [2.718 ** s for s in scores]
    total = sum(exps)
    weights = [e / total for e in exps]
    
    # Mistura os 'Values' com base nos pesos
    context = [0.0] * len(values[0])
    for i, w in enumerate(weights):
        for d in range(len(values[i])):
            context[d] += w * values[i][d]
    return context

# 3. EXECUÇÃO (Para o token "gato")
contexto_gato = scaled_dot_product_attention(
    query=embeddings[1], 
    keys=embeddings, 
    values=embeddings
)
print(f"Vetor de Contexto (Gato): {contexto_gato}")
# @end
