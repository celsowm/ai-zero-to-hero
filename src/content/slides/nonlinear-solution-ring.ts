import { defineSlide } from './_factory';

export const nonlinearSolutionRing = defineSlide({
  id: 'nonlinear-solution-ring',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.55,
      0.45
    ]
  },
  content: {
    'pt-br': {
      title: `A solução não linear`,
      body: `A fronteira linear falhou porque o dado tem forma de anel. A solução é acrescentar uma camada oculta com neurônios e ativação não linear. Quatro neurônios com sigmoid já conseguem dobrar o espaço de decisão e fechar o anel.

1. **A fronteira vira uma curva:** ao invés de cortar com uma reta, o modelo aprende uma região circular.

2. **A ativação faz a mágica:** a função sigmoid dentro de cada neurônio introduz curvatura na fronteira.

3. **Precisão sobe acima de 90%:** o MSE cai significativamente e a classificação do anel se torna possível.

> A diferença entre o slide anterior e este é exatamente o que motiva o neurônio artificial: uma unidade que aplica uma função não linear sobre uma soma ponderada.

---

### Leitura rápida
- \`fronteira circular\`: emerge de quatro neurônios ocultos com sigmoid.
- \`MSE\`: cai muito mais rápido que com a reta.
- \`neurônio\`: é a peça que torna essa curvatura possível.

### Próximo passo
Como esse neurônio funciona por dentro? De onde veio essa ideia?`,
    },
    'en-us': {
      title: `The nonlinear solution`,
      body: `The linear boundary failed because the data is ring-shaped. The fix is to add a hidden layer of neurons with a nonlinear activation. Four sigmoid neurons are enough to bend the decision space and close the ring.

1. **The boundary becomes a curve:** instead of cutting with a line, the model learns a circular region.

2. **Activation does the work:** the sigmoid function inside each neuron introduces curvature into the boundary.

3. **Accuracy rises above 90%:** MSE drops significantly and the ring classification becomes possible.

> The difference between the previous slide and this one is exactly what motivates the artificial neuron: a unit that applies a nonlinear function to a weighted sum.

---

### Quick read
- \`circular boundary\`: emerges from four hidden neurons with sigmoid.
- \`MSE\`: drops much faster than with the line.
- \`neuron\`: is the piece that makes this curvature possible.

### Next step
How does this neuron work internally? Where did this idea come from?`,
    },
  },
  visual: {
    id: 'nonlinear-solution-ring',
    copy: {
      "pt-br": {
        "eyebrow": "Solução não linear",
        "title": "Quatro neurônios já fecham o anel",
        "description": "",
        "tabLabels": [
          "Visual",
          "JS"
        ],
        "accuracyLabel": "Precisão",
        "mseLabel": "MSE",
        "statusLabel": "Estado",
        "startLabel": "Iniciar",
        "restartLabel": "Reiniciar",
        "boundaryLabel": "Fronteira circular",
        "innerClassLabel": "Classe interna",
        "outerClassLabel": "Classe externa",
        "statusIdleLabel": "pronto",
        "statusRunningLabel": "treinando",
        "statusCompleteLabel": "ajuste concluído",
        "outerClassDescription": "Pontos azuis ficam no anel externo.",
        "innerClassDescription": "Pontos verdes ficam no anel interno.",
        "boundaryDescription": "A curva fecha o anel — algo impossível para uma reta.",
        "codeTitle": "Rede neural mínima em JavaScript",
        "codeDescription": "Uma camada oculta com 4 neurônios sigmoid é suficiente para aprender a fronteira circular.",
        "source": {
          "snippetId": "nonlinear-regression/ring",
          "language": "javascript"
        },
        "footer": "Com apenas quatro neurônios ocultos e sigmoid, o modelo aprende a fronteira circular que a reta nunca poderia traçar.",
        "codeExplanations": [
          {
          "lineRange": [
            1,
            3
          ],
          "content": "Este bloco define a sigmoid e documenta a arquitetura; sigmoid é a ativação que comprime valores para 0-1."
        },
          {
          "lineRange": [
            4,
            9
          ],
          "content": "Aqui está o forward pass, ou passagem direta: calculamos ativações ocultas `h`, depois `z`, e então a saída final."
        },
          {
          "lineRange": [
            10,
            12
          ],
          "content": "Começamos uma época de treino e criamos o acumulador `g` para todos os gradientes da rede."
        },
          {
          "lineRange": [
            13,
            16
          ],
          "content": "Para cada amostra, recalculamos as ativações ocultas e a saída atual da rede."
        },
          {
          "lineRange": [
            17,
            24
          ],
          "content": "Este trecho faz backpropagation, que é propagar o erro da saída para trás para ajustar todas as camadas."
        },
          {
          "lineRange": [
            25,
            27
          ],
          "content": "Aqui preparamos a média dos gradientes com `n` e iniciamos o objeto de retorno com pesos atualizados."
        },
          {
          "lineRange": [
            28,
            34
          ],
          "content": "Estas linhas aplicam descida do gradiente em todos os parâmetros da rede e encerram a época."
        }
        ]
      },
      "en-us": {
        "eyebrow": "Nonlinear solution",
        "title": "Four neurons already close the ring",
        "description": "",
        "tabLabels": [
          "Visual",
          "JS"
        ],
        "accuracyLabel": "Accuracy",
        "mseLabel": "MSE",
        "statusLabel": "Status",
        "startLabel": "Start",
        "restartLabel": "Restart",
        "boundaryLabel": "Circular boundary",
        "innerClassLabel": "Inner class",
        "outerClassLabel": "Outer class",
        "statusIdleLabel": "ready",
        "statusRunningLabel": "training",
        "statusCompleteLabel": "fit complete",
        "outerClassDescription": "Blue points sit on the outer ring.",
        "innerClassDescription": "Green points sit on the inner ring.",
        "boundaryDescription": "The curve closes the ring — something a straight line can never do.",
        "codeTitle": "Minimal neural network in JavaScript",
        "codeDescription": "A hidden layer with 4 sigmoid neurons is enough to learn the circular boundary.",
        "source": {
          "snippetId": "nonlinear-regression/ring",
          "language": "javascript"
        },
        "footer": "With just four hidden neurons and sigmoid, the model learns the circular boundary that a straight line could never draw.",
        "codeExplanations": [
          {
          "lineRange": [
            1,
            3
          ],
          "content": "This block defines sigmoid and documents the architecture; sigmoid is the activation that squeezes values into 0-1."
        },
          {
          "lineRange": [
            4,
            9
          ],
          "content": "This is the forward pass: we compute hidden activations `h`, then `z`, then final output."
        },
          {
          "lineRange": [
            10,
            12
          ],
          "content": "We start one training epoch and create accumulator `g` for all network gradients."
        },
          {
          "lineRange": [
            13,
            16
          ],
          "content": "For each sample, we recompute hidden activations and current network output."
        },
          {
          "lineRange": [
            17,
            24
          ],
          "content": "This block performs backpropagation, meaning we send output error backward to adjust all layers."
        },
          {
          "lineRange": [
            25,
            27
          ],
          "content": "Here we prepare gradient averaging with `n` and start the return object with updated weights."
        },
          {
          "lineRange": [
            28,
            34
          ],
          "content": "These lines apply gradient descent to all network parameters and close the epoch."
        }
        ]
      }
    },
  },
});
