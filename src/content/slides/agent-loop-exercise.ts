import { defineSlide } from './_factory';

export const agentLoopExercise = defineSlide({
  id: 'agent-loop-exercise',
  type: 'exercise',
  content: {
    'pt-br': {
      title: 'Exercise: O Loop Infinito',
      body: `Um aluno escreveu um agente para pesquisar preços. Mas o agente **nunca para de rodar**. O loop continua infinitamente. Encontre o bug!

> Dica: todo loop precisa de uma condição de parada. Qual está faltando?`,
    },
    'en-us': {
      title: 'Exercise: The Infinite Loop',
      body: `A student wrote an agent to research prices. But the agent **never stops running**. The loop continues forever. Find the bug!

> Hint: every loop needs a stopping condition. What's missing?`,
    },
  },
  visual: {
    id: 'python-exercise',
    copy: {
      'pt-br': {
        title: 'Exercise: O Loop Infinito',
        description: 'Este agente entra em loop infinito. Encontre o bug e corrija.',
        runButtonLabel: 'Executar',
        checkButtonLabel: 'Verificar',
        successMessage: 'Parabéns! Bug corrigido com sucesso!',
        errorMessage: 'Alguns testes falharam. Revise o código.',
        hintLabel: 'Dica',
        outputLabel: 'Saída do Console',
        exercises: [
          {
            id: '1. Encontre o bug no loop do agente',
            instructions: 'Um agente pesquisa preços em várias lojas, mas entra em loop infinito. Corrija o código para que o agente pare quando a tarefa estiver completa ou após 5 iterações.',
            starterCode: `def agente_pesquisa(produto, lojas):
    """Agente que pesquisa preço em várias lojas."""
    resultados = []
    i = 0

    while i < len(lojas):
        # Busca preço na loja atual
        preco = buscar_preco(lojas[i], produto)
        resultados.append({"loja": lojas[i], "preco": preco})
        print(f"Loja {lojas[i]}: R$ {preco}")

        # BUG: o que falta aqui?

    menor = min(resultados, key=lambda x: x["preco"])
    print(f"Menor preço: R$ {menor['preco']} na {menor['loja']}")
    return resultados

def buscar_preco(loja, produto):
    import random
    random.seed(hash(loja + produto) % 1000)
    return random.randint(500, 5000)

lojas = ["Amazon", "MercadoLivre", "MagazineLuiza", "Americanas"]
agente_pesquisa("iPhone 15", lojas)`,
            validators: [
              {
                type: 'assertFunctionReturn',
                functionName: 'agente_pesquisa',
                args: ['iPhone 15', ['Amazon', 'MercadoLivre', 'MagazineLuiza', 'Americanas']],
                expectedReturn: 4,
                tolerance: 0,
                checkLength: true,
              },
            ],
            hints: [
              'O loop while não tem incremento do contador.',
              'Adicione i += 1 dentro do while para avançar para a próxima loja.',
            ],
          },
        ],
      },
      'en-us': {
        title: 'Exercise: The Infinite Loop',
        description: 'This agent enters an infinite loop. Find the bug and fix it.',
        runButtonLabel: 'Run',
        checkButtonLabel: 'Check',
        successMessage: 'Excellent! Bug fixed successfully!',
        errorMessage: 'Some tests failed. Review the code.',
        hintLabel: 'Hint',
        outputLabel: 'Console Output',
        exercises: [
          {
            id: '1. Find the bug in the agent loop',
            instructions: 'An agent researches prices across stores, but enters an infinite loop. Fix the code so the agent stops when the task is complete or after 5 iterations.',
            starterCode: `def research_agent(product, stores):
    """Agent that researches prices across stores."""
    results = []
    i = 0

    while i < len(stores):
        # Search price at current store
        price = search_price(stores[i], product)
        results.append({"store": stores[i], "price": price})
        print(f"Store {stores[i]}: R$ {price}")

        # BUG: what's missing here?

    lowest = min(results, key=lambda x: x["price"])
    print(f"Lowest price: R$ {lowest['price']} at {lowest['store']}")
    return results

def search_price(store, product):
    import random
    random.seed(hash(store + product) % 1000)
    return random.randint(500, 5000)

stores = ["Amazon", "MercadoLivre", "MagazineLuiza", "Americanas"]
research_agent("iPhone 15", stores)`,
            validators: [
              {
                type: 'assertFunctionReturn',
                functionName: 'research_agent',
                args: ['iPhone 15', ['Amazon', 'MercadoLivre', 'MagazineLuiza', 'Americanas']],
                expectedReturn: 4,
                tolerance: 0,
                checkLength: true,
              },
            ],
            hints: [
              'The while loop has no counter increment.',
              'Add i += 1 inside the while to advance to the next store.',
            ],
          },
        ],
      },
    },
  },
});
