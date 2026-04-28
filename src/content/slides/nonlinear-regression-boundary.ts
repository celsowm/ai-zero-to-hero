import { defineSlide } from './_factory';

export const nonlinearRegressionBoundary = defineSlide({
  id: 'nonlinear-regression-boundary',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.55,
      0.45
    ]
  },
  content: {
    'pt-br': {
      title: `Quando a reta começa a falhar`,
      body: `No exemplo da latência, a função linear tenta explicar o crescimento com uma inclinação constante, mas o sistema real acelera conforme a carga aumenta. Aqui a ideia é olhar para um dado em anéis: a linha melhora com treino real, o MSE cai, mas a precisão nunca chega a 100%.

1. **A linha assume ritmo fixo:** o ajuste tenta cortar o espaço com uma única fronteira.

2. **O MSE mede o erro real:** o código percorre o dataset inteiro e atualiza os pesos da linha.

3. **A precisão expõe o limite:** mesmo treinada, a fronteira linear não consegue fechar um anel.

> Quando o dado não é linear, a linha pode melhorar, mas não resolve a estrutura do problema.

---

### Leitura rápida
- \`MSE\`: mede o erro médio da linha sobre todos os pontos.
- \`Precisão\`: mostra quantos pontos a fronteira classificou corretamente.
- \`linha\`: funciona, mas não aprende curvatura.

### Ideia principal
O limite aqui não é falta de treino. É a forma da fronteira.`,
    },
    'en-us': {
      title: `When the line starts to fail`,
      body: `In the latency example, the linear function tries to explain growth with a constant slope, but the real system speeds up as load increases. Here the point is to look at a ring-shaped dataset: the line improves with real training, MSE goes down, but accuracy never reaches 100%.

1. **The line assumes a fixed pace:** the fit tries to cut the space with a single boundary.

2. **MSE measures the real error:** the code walks the full dataset and updates the line weights.

3. **Accuracy exposes the limit:** even after training, a linear boundary cannot close a ring.

> When the data is not linear, a line can improve, but it cannot solve the structure of the problem.

---

### Quick read
- \`MSE\`: measures the average error of the line across all points.
- \`Accuracy\`: shows how many points the boundary classified correctly.
- \`line\`: works, but does not learn curvature.

### Main idea
The limit here is not lack of training. It is the shape of the boundary.`,
    },
  },
  visual: {
    id: 'nonlinear-regression-boundary',
    copy: {
      "pt-br": {
        "eyebrow": "Limite da fronteira linear",
        "title": "A reta melhora com treino, mas não fecha um anel",
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
        "lineLabel": "Fronteira linear",
        "innerClassLabel": "Classe interna",
        "outerClassLabel": "Classe externa",
        "legendTitle": "Leitura do gráfico",
        "statusIdleLabel": "pronto",
        "statusRunningLabel": "treinando",
        "statusCompleteLabel": "ajuste concluído",
        "outerClassDescription": "Pontos azuis ficam no anel externo.",
        "innerClassDescription": "Pontos verdes ficam no anel interno.",
        "lineDescription": "A linha tenta separar os dois anéis com um único corte.",
        "codeTitle": "Treino em JavaScript",
        "codeDescription": "A segunda aba mostra o loop de treino que atualiza os pesos da fronteira linear.",
        "source": {
          "snippetId": "nonlinear-regression/boundary",
          "language": "javascript"
        },
        "footer": "A linha melhora com otimização, mas um padrão em anel continua fora do alcance de uma fronteira linear.",
        "codeExplanations": [
          {
          "lineRange": [
            1,
            2
          ],
          "content": "Aqui definimos a sigmoid, uma função que transforma qualquer número em probabilidade entre 0 e 1."
        },
          {
          "lineRange": [
            3,
            5
          ],
          "content": "Estas linhas separam a predição em duas etapas: valor bruto da reta e probabilidade final após sigmoid."
        },
          {
          "lineRange": [
            6,
            10
          ],
          "content": "Aqui começa uma época de treino e os gradientes são zerados para acumular correções novas."
        },
          {
          "lineRange": [
            11,
            15
          ],
          "content": "Para cada ponto, calculamos previsão, erro e fator de gradiente; gradiente é quanto e para onde cada peso deve ser ajustado."
        },
          {
          "lineRange": [
            16,
            20
          ],
          "content": "Este trecho acumula a contribuição de cada feature para os gradientes dos pesos `w0`, `w1` e `w2`."
        },
          {
          "lineRange": [
            21,
            27
          ],
          "content": "No final, calculamos média dos gradientes e atualizamos os pesos com a taxa de aprendizado."
        }
        ]
      },
      "en-us": {
        "eyebrow": "Linear boundary limit",
        "title": "The line improves with training, but it cannot close a ring",
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
        "lineLabel": "Linear boundary",
        "innerClassLabel": "Inner class",
        "outerClassLabel": "Outer class",
        "legendTitle": "Chart reading",
        "statusIdleLabel": "ready",
        "statusRunningLabel": "training",
        "statusCompleteLabel": "fit complete",
        "outerClassDescription": "Blue points sit on the outer ring.",
        "innerClassDescription": "Green points sit on the inner ring.",
        "lineDescription": "The line tries to split the two rings with a single cut.",
        "codeTitle": "Training in JavaScript",
        "codeDescription": "The second tab shows the training loop that updates the linear boundary weights.",
        "source": {
          "snippetId": "nonlinear-regression/boundary",
          "language": "javascript"
        },
        "footer": "The line can improve with optimization, but a ring-shaped pattern remains out of reach for a linear boundary.",
        "codeExplanations": [
          {
          "lineRange": [
            1,
            2
          ],
          "content": "Here we define sigmoid, a function that maps any number to a 0-1 probability."
        },
          {
          "lineRange": [
            3,
            5
          ],
          "content": "These lines split prediction into two steps: raw linear score and final sigmoid probability."
        },
          {
          "lineRange": [
            6,
            10
          ],
          "content": "This starts one training epoch and resets gradients to accumulate fresh corrections."
        },
          {
          "lineRange": [
            11,
            15
          ],
          "content": "For each point, we compute prediction, error, and gradient factor; gradient means how much and in which direction each weight should move."
        },
          {
          "lineRange": [
            16,
            20
          ],
          "content": "This block accumulates each feature contribution into gradients for `w0`, `w1`, and `w2`."
        },
          {
          "lineRange": [
            21,
            27
          ],
          "content": "At the end, we average gradients and update weights with the learning rate."
        }
        ]
      }
    },
  },
});
