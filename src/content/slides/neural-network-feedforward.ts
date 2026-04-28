import { defineSlide } from './_factory';

export const neuralNetworkFeedforward = defineSlide({
  id: 'neural-network-feedforward',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.4,
      0.6
    ]
  },
  content: {
    'pt-br': {
      title: `Feedforward: a previsao nasce indo da esquerda para a direita`,
      body: `Antes de corrigir qualquer peso, a rede precisa **produzir uma previsao**. Esse percurso da entrada ate a saida chama-se **feedforward**.

1. **Camada de entrada:** recebemos as features do paciente.

2. **Camada oculta:** cada neuronio calcula uma soma ponderada \`z = Σ(w·x) + b\` e depois aplica sigmoid para gerar uma ativacao \`h\`.

3. **Camada de saida:** essas ativacoes ocultas viram entrada da ultima soma ponderada. Aplicamos sigmoid de novo e obtemos \`y_hat\`.

4. **Interprete \`y_hat\`:** ele ainda nao e a correcao nem o erro. E apenas a resposta atual da rede com os pesos atuais.

> Feedforward responde: "com os parametros que tenho agora, qual e a minha previsao para esta amostra?"

### Fluxo minimo
\`\`\`txt
x -> z_oculto -> h -> z_saida -> y_hat
\`\`\`

### O que observar no visual
- troque a amostra para ver como mudam \`z1\`, \`z2\`, \`z3\`
- compare as ativacoes ocultas \`h1\`, \`h2\`, \`h3\`
- acompanhe como tudo termina em uma unica probabilidade final`,
      codeExplanations: [

  ],
    },
    'en-us': {
      title: `Feedforward: the prediction is born from left to right`,
      body: `Before correcting any weight, the network must first **produce a prediction**. This path from input to output is called **feedforward**.

1. **Input layer:** we receive the patient's features.

2. **Hidden layer:** each neuron computes a weighted sum \`z = Σ(w·x) + b\` and then applies sigmoid to produce an activation \`h\`.

3. **Output layer:** those hidden activations become the input to the last weighted sum. We apply sigmoid again and obtain \`y_hat\`.

4. **How to read \`y_hat\`:** it is not the correction and not the error yet. It is simply the network's current answer with its current weights.

> Feedforward answers: "with the parameters I have right now, what is my prediction for this sample?"

### Minimum flow
\`\`\`txt
x -> z_hidden -> h -> z_output -> y_hat
\`\`\`

### What to watch in the visual
- switch the sample and see how \`z1\`, \`z2\`, \`z3\` change
- compare the hidden activations \`h1\`, \`h2\`, \`h3\`
- follow how everything ends in one final probability`,
      codeExplanations: [

  ],
    },
  },
  visual: {
    id: 'feedforward-flow-visual',
    copy: {
      "pt-br": {
        "title": "Feedforward em uma rede 4 -> 3 -> 1",
        "subtitle": "Amostra entra, passa pela camada oculta e vira uma probabilidade final antes de qualquer correcao.",
        "featureNames": [
          "idade",
          "pressao",
          "colesterol",
          "fumante"
        ],
        "architectureLabel": "4 entradas -> 3 ocultos sigmoid -> 1 saida sigmoid",
        "sampleLabel": "Amostra",
        "targetLabel": "Alvo",
        "probabilityLabel": "Probabilidade prevista",
        "inputLayerLabel": "ENTRADA",
        "hiddenLayerLabel": "OCULTA",
        "outputLayerLabel": "SAIDA",
        "outputInterpretation": "Como ler a saida",
        "sampleAriaLabel": "Escolha a amostra para o feedforward",
        "sequenceTitle": "Etapas do calculo",
        "sequenceSteps": [
          {
          "label": "Ler as features",
          "formula": "x = [x1, x2, x3, x4]",
          "body": "As quatro entradas chegam normalizadas. Elas sao os sinais brutos que a rede vai combinar."
        },
          {
          "label": "Calcular somas ocultas",
          "formula": "zj = Σ(wji * xi) + bj",
          "body": "Cada neuronio oculto faz sua propria mistura ponderada das mesmas entradas."
        },
          {
          "label": "Aplicar sigmoid na camada oculta",
          "formula": "hj = sigmoid(zj)",
          "body": "As ativacoes `h1`, `h2` e `h3` resumem a amostra em sinais intermediarios entre 0 e 1."
        },
          {
          "label": "Gerar a saida final",
          "formula": "y_hat = sigmoid(Σ(vj * hj) + b_out)",
          "body": "A camada de saida junta os sinais ocultos e produz a previsao final da classe positiva."
        }
        ],
        "activationFormula": "Na camada oculta, cada `h` nasce de `sigmoid(z)`.",
        "outputFormula": "Na saida, a mesma ideia gera a probabilidade final `y_hat`.",
        "samples": [
          {
          "label": "baixo risco",
          "inputs": [
            0.35,
            0.6,
            0.58,
            0
          ],
          "target": 0
        },
          {
          "label": "caso intermediario",
          "inputs": [
            0.58,
            0.78,
            0.82,
            1
          ],
          "target": 1
        },
          {
          "label": "alto risco",
          "inputs": [
            0.73,
            0.9,
            0.93,
            1
          ],
          "target": 1
        }
        ],
        "weights": {
          "inputToHidden": [
            [
            0.35,
            -0.1,
            0.25,
            0.05
          ],
            [
            0.1,
            0.4,
            -0.15,
            0.2
          ],
            [
            -0.2,
            0.15,
            0.3,
            0.25
          ]
          ],
          "hiddenBiases": [
            0.05,
            -0.1,
            0.08
          ],
          "hiddenToOutput": [
            0.45,
            -0.2,
            0.35
          ],
          "outputBias": -0.12
        }
      },
      "en-us": {
        "title": "Feedforward in a 4 -> 3 -> 1 network",
        "subtitle": "A sample enters, moves through the hidden layer, and becomes a final probability before any correction.",
        "featureNames": [
          "age",
          "pressure",
          "cholesterol",
          "smoker"
        ],
        "architectureLabel": "4 inputs -> 3 sigmoid hidden units -> 1 sigmoid output",
        "sampleLabel": "Sample",
        "targetLabel": "Target",
        "probabilityLabel": "Predicted probability",
        "inputLayerLabel": "INPUT",
        "hiddenLayerLabel": "HIDDEN",
        "outputLayerLabel": "OUTPUT",
        "outputInterpretation": "How to read the output",
        "sampleAriaLabel": "Choose the sample for feedforward",
        "sequenceTitle": "Computation stages",
        "sequenceSteps": [
          {
          "label": "Read the features",
          "formula": "x = [x1, x2, x3, x4]",
          "body": "The four inputs arrive normalized. They are the raw signals the network will combine."
        },
          {
          "label": "Compute hidden sums",
          "formula": "zj = Σ(wji * xi) + bj",
          "body": "Each hidden neuron builds its own weighted mixture from the same inputs."
        },
          {
          "label": "Apply sigmoid in the hidden layer",
          "formula": "hj = sigmoid(zj)",
          "body": "The activations `h1`, `h2`, and `h3` summarize the sample into intermediate signals between 0 and 1."
        },
          {
          "label": "Generate the final output",
          "formula": "y_hat = sigmoid(Σ(vj * hj) + b_out)",
          "body": "The output layer combines the hidden signals and produces the final positive-class prediction."
        }
        ],
        "activationFormula": "In the hidden layer, each `h` comes from `sigmoid(z)`.",
        "outputFormula": "At the output, the same idea generates the final probability `y_hat`.",
        "samples": [
          {
          "label": "low risk",
          "inputs": [
            0.35,
            0.6,
            0.58,
            0
          ],
          "target": 0
        },
          {
          "label": "mid case",
          "inputs": [
            0.58,
            0.78,
            0.82,
            1
          ],
          "target": 1
        },
          {
          "label": "high risk",
          "inputs": [
            0.73,
            0.9,
            0.93,
            1
          ],
          "target": 1
        }
        ],
        "weights": {
          "inputToHidden": [
            [
            0.35,
            -0.1,
            0.25,
            0.05
          ],
            [
            0.1,
            0.4,
            -0.15,
            0.2
          ],
            [
            -0.2,
            0.15,
            0.3,
            0.25
          ]
          ],
          "hiddenBiases": [
            0.05,
            -0.1,
            0.08
          ],
          "hiddenToOutput": [
            0.45,
            -0.2,
            0.35
          ],
          "outputBias": -0.12
        }
      }
    },
  },
});
