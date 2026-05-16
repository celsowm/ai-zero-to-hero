# Ciclo ReAct para: "Qual é o país mais populoso do mundo?"

passos = [
    {"tipo": "thought", "conteudo": "Preciso saber a população atual dos países mais populosos."},
    {"tipo": "action", "conteudo": 'buscar_dados("país mais populoso 2024")'},
    {"tipo": "observation", "conteudo": "Resultados: 1) Índia: 1.428M, 2) China: 1.425M, 3) EUA: 339K"},
]

# Preveja o próximo Thought antes de rodar!
proximo_thought = "???"

# Verifique:
resposta = "A Índia ultrapassou a China em 2023. Com os dados já obtidos, posso responder diretamente: Índia é o país mais populoso com 1.428 milhões."

for p in passos:
    print(f"{p['tipo'].upper()}: {p['conteudo']}")

print(f"\nSeu Thought: {proximo_thought}")
print(f"\nResposta correta: {resposta}")
