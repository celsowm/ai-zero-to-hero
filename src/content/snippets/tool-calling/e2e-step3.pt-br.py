# Executar perguntas
queries = [
    "Quanto é 237 vezes 891?",
    "Pesquise sobre Python 3.12 e me diga as novidades",
    "Se eu investir R$1000 a 10% ao ano por 5 anos, quanto terei? Calcule.",
]

for q in queries:
    print(f"Q: {q}")
    result = executor.invoke({"input": q})
    print(f"A: {result['output']}\n")

# Output esperado:
# Q: Quanto é 237 vezes 891?
# A: 237 × 891 = 211167
#
# Q: Pesquise sobre Python 3.12...
# A: [resultados da busca com resumo]
#
# Q: Se eu investir R$1000...
# A: R$1000 × (1.10)^5 = R$1610.51
