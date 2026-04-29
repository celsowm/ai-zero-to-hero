# Chain of Thought Few-Shot: exemplos com raciocínio passo a passo
cot_examples = [
    {
        "q": "Um salão tem 25 fileiras com 12 cadeiras cada. Se 2/3 das cadeiras estão ocupadas, quantas estão vazias?",
        "a": "Primeiro, calculo o total de cadeiras: 25 × 12 = 300.\nSe 2/3 estão ocupadas, 1/3 estão vazias.\n1/3 de 300 = 300/3 = 100.\nResposta: 100 cadeiras vazias."
    },
    {
        "q": "Maria tem o dobro da idade de João. Daqui a 5 anos, ela terá 35. Qual a idade de João agora?",
        "a": "Se daqui a 5 anos Maria terá 35, ela tem 30 agora.\nMaria tem o dobro de João, então João tem 30/2 = 15.\nResposta: João tem 15 anos."
    },
]

# Prompt CoT few-shot
prompt = "Resolva passo a passo:\n\n"
for ex in cot_examples:
    prompt += f"Pergunta: {ex['q']}\nResposta: {ex['a']}\n\n"
prompt += "Pergunta: Um prédio tem 8 andares com 6 apartamentos cada. Se 3/4 estão ocupados, quantos apartamentos vazios?\nResposta:"

print("Chain of Thought Few-Shot Prompt:")
print(prompt)
