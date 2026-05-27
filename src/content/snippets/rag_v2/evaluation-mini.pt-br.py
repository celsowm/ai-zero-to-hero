gold = {
    "Qual é o prazo de reembolso?": {"politicas.md"},
    "O plano Pro tem suporte prioritário?": {"planos.md"},
}

retrieved = {
    "Qual é o prazo de reembolso?": ["politicas.md", "planos.md"],
    "O plano Pro tem suporte prioritário?": ["planos.md", "integracoes.md"],
}

for pergunta, fontes_corretas in gold.items():
    fontes_retornadas = set(retrieved[pergunta])
    acertou = bool(fontes_corretas & fontes_retornadas)
    print(pergunta, "OK" if acertou else "FALHOU")
