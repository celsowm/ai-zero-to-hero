import { defineSlide } from './_factory';

export const reactExercise = defineSlide({
  id: 'react-exercise',
  type: 'exercise',
  content: {
    'pt-br': {
      title: 'Exercise: Preveja o Próximo Thought',
      body: `O agente está usando ReAct para responder uma pergunta. Leia os passos até agora e **preveja mentalmente** qual será o próximo Thought. Depois clique para verificar.

> A intuição vale mais que a resposta correta. O importante é pensar como o agente.`,
    },
    'en-us': {
      title: 'Exercise: Predict the Next Thought',
      body: `The agent is using ReAct to answer a question. Read the steps so far and **mentally predict** what the next Thought will be. Then click to verify.

> Intuition matters more than the correct answer. The point is to think like the agent.`,
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      'pt-br': {
        title: 'Exercise: Preveja o Próximo Thought',
        description: 'Observe o ciclo ReAct e preveja qual será o próximo Thought antes de revelar.',
        runButtonLabel: 'Executar',
        checkButtonLabel: 'Verificar',
        successMessage: 'Excelente! Você pensou como o agente!',
        errorMessage: 'Revise o ciclo ReAct e tente novamente.',
        hintLabel: 'Dica',
        outputLabel: 'Saída do Console',
        exercises: [
          {
            id: '1. Preveja o próximo Thought no ciclo ReAct',
            instructions: `Pergunta: "Qual é o país mais populoso do mundo?"

Leia o ciclo ReAct e preveja o próximo Thought:

1. **Thought**: Preciso saber a população atual dos países mais populosos.
2. **Action**: buscar_dados("país mais populoso 2024")
3. **Observation**: Resultados: 1) Índia: 1.428M, 2) China: 1.425M, 3) EUA: 339K
4. **Thought**: ??? (preveja!)

Depois rode o código para verificar sua resposta.`,
            starterCode: `# Ciclo ReAct para: "Qual é o país mais populoso do mundo?"

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

print(f"\\nSeu Thought: {proximo_thought}")
print(f"\\nResposta correta: {resposta}")`,
            validators: [
              {
                type: 'assertOutput',
                expected: 'Resposta correta:',
              },
            ],
            hints: [
              'Com os dados já obtidos, o agente tem informação suficiente para responder.',
              'O próximo Thought deve conectar a observação à resposta final.',
            ],
          },
        ],
      },
      'en-us': {
        title: 'Exercise: Predict the Next Thought',
        description: 'Observe the ReAct cycle and predict what the next Thought will be before revealing.',
        runButtonLabel: 'Run',
        checkButtonLabel: 'Check',
        successMessage: 'Excellent! You thought like the agent!',
        errorMessage: 'Review the ReAct cycle and try again.',
        hintLabel: 'Hint',
        outputLabel: 'Console Output',
        exercises: [
          {
            id: '1. Predict the next Thought in the ReAct cycle',
            instructions: `Question: "What is the most populous country?"

Read the ReAct cycle and predict the next Thought:

1. **Thought**: I need to know the current population of the most populous countries.
2. **Action**: search_data("most populous country 2024")
3. **Observation**: Results: 1) India: 1.428M, 2) China: 1.425M, 3) USA: 339K
4. **Thought**: ??? (predict!)

Then run the code to verify your answer.`,
            starterCode: `# ReAct cycle for: "What is the most populous country?"

steps = [
    {"type": "thought", "content": "I need to know the current population of the most populous countries."},
    {"type": "action", "content": 'search_data("most populous country 2024")'},
    {"type": "observation", "content": "Results: 1) India: 1.428M, 2) China: 1.425M, 3) USA: 339K"},
]

# Predict the next Thought before running!
next_thought = "???"

# Verify:
answer = "India surpassed China in 2023. With the data already obtained, I can answer directly: India is the most populous country with 1.428 billion."

for s in steps:
    print(f"{s['type'].upper()}: {s['content']}")

print(f"\\nYour Thought: {next_thought}")
print(f"\\nCorrect answer: {answer}")`,
            validators: [
              {
                type: 'assertOutput',
                expected: 'Correct answer:',
              },
            ],
            hints: [
              'With the data already obtained, the agent has enough information to answer.',
              'The next Thought should connect the observation to the final answer.',
            ],
          },
        ],
      },
    },
  },
});
