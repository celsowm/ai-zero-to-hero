docs = [
    {
        "id": "politicas.md",
        "text": "Reembolso: clientes podem pedir devolução em até 7 dias.",
    },
    {
        "id": "planos.md",
        "text": "Plano Pro: inclui suporte prioritário e relatórios avançados.",
    },
    {
        "id": "integracoes.md",
        "text": "Slack: alertas podem ser enviados para canais configurados.",
    },
]

query = "Qual é o prazo de reembolso?"

# BUG: k=1 é pouco em bases reais e a fonte não é exibida na resposta.
top_k = 1
mostrar_fontes = False

def score(documento):
    palavras_query = set(query.lower().replace("?", "").split())
    palavras_doc = set(documento["text"].lower().replace(":", "").split())
    return len(palavras_query & palavras_doc)

ranking = sorted(docs, key=score, reverse=True)[:top_k]

print(f"Chunks recuperados: {len(ranking)}")
if mostrar_fontes:
    print("Fontes:", ", ".join(doc["id"] for doc in ranking))
