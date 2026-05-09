import { defineSlide } from './_factory';

export const agentsExercise = defineSlide({
  id: 'agents-exercise',
  type: 'exercise',
  content: {
    'pt-br': {
      title: 'Exercise: Construa Um Mini-Agente',
      body: `Agora é sua vez. Vamos montar um mini-agente do zero. O agente deve:

- Receber uma pergunta do usuário
- Usar a ferramenta \`buscar\` no máximo 3 vezes
- Retornar uma resposta final

> Dica: siga a estrutura do Loop do Agente — Plan, Act, Observe, Decide.`,
    },
    'en-us': {
      title: 'Exercise: Build a Mini-Agent',
      body: `Now it's your turn. Let's build a mini-agent from scratch. The agent should:

- Receive a user question
- Use the \`search\` tool at most 3 times
- Return a final answer

> Hint: follow the Agent Loop structure — Plan, Act, Observe, Decide.`,
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      'pt-br': {
        title: 'Exercise: Construa Um Mini-Agente',
        description: 'Monte um agente simples que usa uma ferramenta de busca com loop de no máximo 3 iterações.',
        runButtonLabel: 'Executar',
        checkButtonLabel: 'Verificar',
        successMessage: 'Excelente! Mini-agente funcionando!',
        errorMessage: 'Alguns testes falharam. Revise o código.',
        hintLabel: 'Dica',
        outputLabel: 'Saída do Console',
        exercises: [
          {
            id: '1. Complete o mini-agente',
            instructions: `Complete o código do agente. Preencha as lacunas com a lógica de planejamento, ação e decisão.

O agente deve:
1. Receber uma pergunta
2. Usar \`buscar()\` para encontrar a resposta
3. Se encontrou, retornar. Senão, tentar novamente (máx 3 vezes).`,
            starterCode: `def mini_agente(pergunta, max_iteracoes=3):
    """Mini-agente que busca respostas."""
    historico = []

    for i in range(max_iteracoes):
        # 1. PLAN: O que preciso buscar?
        # LLM: gere o plano baseado na pergunta e histórico
        plano = f"Buscar informação sobre: {pergunta}"

        # 2. ACT: usar ferramenta de busca
        # TODO: chame buscar(pergunta) e guarde o resultado
        resultado = None

        # 3. OBSERVE: registre no histórico
        historico.append({"tentativa": i + 1, "resultado": resultado})
        print(f"Tentativa {i+1}: {resultado}")

        # 4. DECIDE: encontrou resposta?
        # TODO: se resultado não é None, retorne-o
        pass

    return "Não encontrei a resposta."

def buscar(termo):
    base = {"capital da França": "Paris", "maior rio": "Amazonas"}
    return base.get(termo, None)

# Teste
print(mini_agente("capital da França"))`,
            validators: [
              {
                type: 'assertOutput',
                expected: 'Paris',
              },
            ],
            hints: [
              'No passo 2 (ACT), chame: resultado = buscar(pergunta)',
              'No passo 4 (DECIDE), verifique: if resultado is not None: return f"Encontrei: {resultado}"',
            ],
          },
        ],
      },
      'en-us': {
        title: 'Exercise: Build a Mini-Agent',
        description: 'Build a simple agent that uses a search tool with a maximum 3-iteration loop.',
        runButtonLabel: 'Run',
        checkButtonLabel: 'Check',
        successMessage: 'Excellent! Mini-agent working!',
        errorMessage: 'Some tests failed. Review the code.',
        hintLabel: 'Hint',
        outputLabel: 'Console Output',
        exercises: [
          {
            id: '1. Complete the mini-agent',
            instructions: `Complete the agent code. Fill in the gaps with the planning, action, and decision logic.

The agent should:
1. Receive a question
2. Use \`search()\` to find the answer
3. If found, return. Otherwise, try again (max 3 times).`,
            starterCode: `def mini_agent(question, max_iterations=3):
    """Mini-agent that searches for answers."""
    history = []

    for i in range(max_iterations):
        # 1. PLAN: What do I need to search?
        # LLM: generate plan based on question and history
        plan = f"Search for information about: {question}"

        # 2. ACT: use search tool
        # TODO: call search(question) and store the result
        result = None

        # 3. OBSERVE: record in history
        history.append({"attempt": i + 1, "result": result})
        print(f"Attempt {i+1}: {result}")

        # 4. DECIDE: found the answer?
        # TODO: if result is not None, return it
        pass

    return "I didn't find the answer."

def search(term):
    database = {"capital of France": "Paris", "largest river": "Amazon"}
    return database.get(term, None)

# Test
print(mini_agent("capital of France"))`,
            validators: [
              {
                type: 'assertOutput',
                expected: 'Paris',
              },
            ],
            hints: [
              'In step 2 (ACT), call: result = search(question)',
              'In step 4 (DECIDE), check: if result is not None: return f"Found: {result}"',
            ],
          },
        ],
      },
    },
  },
});
