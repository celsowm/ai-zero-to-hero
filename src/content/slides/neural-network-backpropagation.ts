import { defineSlide } from './_factory';

export const neuralNetworkBackpropagation = defineSlide({
  id: 'neural-network-backpropagation',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.4,
      0.6
    ]
  },
  content: {
    'pt-br': {
      title: `Backpropagation: o erro volta para ensinar cada peso`,
      body: `Depois do feedforward, a rede tem uma previsao \`y_hat\`. Falta responder: **como os pesos sabem para onde se mover?**

1. **Primeiro vem o erro:** comparamos \`y_hat\` com o alvo real \`y\`.

2. **Depois vem o gradiente:** ele mede como o erro muda se mexermos um parametro um pouquinho.

3. **Esse sinal volta pela rede:**
   - a saida calcula seu delta
   - esse delta e distribuido para a camada oculta
   - cada peso recebe uma correcao proporcional a sua participacao no erro

4. **A regra final de atualizacao e sempre a mesma:**

\`\`\`txt
novo_peso = peso_atual - taxa_de_aprendizado * gradiente
\`\`\`

5. **O ponto importante:** backpropagation nao esta "adivinhando". Ele esta usando a derivada para medir, localmente, em que direcao cada parametro reduz o erro.

> Feedforward produz a previsao. Backpropagation transforma essa previsao em instrucao de ajuste.

### O que observar no visual
- veja o erro surgir na saida
- acompanhe o delta de saida voltar para os ocultos
- compare alguns pesos antes e depois da atualizacao`,
      codeExplanations: [

  ],
    },
    'en-us': {
      title: `Backpropagation: the error flows back to teach each weight`,
      body: `After feedforward, the network has a prediction \`y_hat\`. The remaining question is: **how do the weights know which way to move?**

1. **First comes the error:** we compare \`y_hat\` with the real target \`y\`.

2. **Then comes the gradient:** it measures how the error changes if we nudge a parameter a little.

3. **That signal flows backward through the network:**
   - the output computes its delta
   - that delta is distributed to the hidden layer
   - each weight receives a correction proportional to its contribution to the error

4. **The final update rule is always the same:**

\`\`\`txt
new_weight = current_weight - learning_rate * gradient
\`\`\`

5. **The important point:** backpropagation is not "guessing". It uses derivatives to measure, locally, which direction reduces the error for each parameter.

> Feedforward produces the prediction. Backpropagation turns that prediction into an update instruction.

### What to watch in the visual
- see the error appear at the output
- track the output delta flowing back into the hidden units
- compare a few weights before and after the update`,
      codeExplanations: [

  ],
    },
  },
  visual: {
    id: 'backprop-signal-flow',
    copy: {
      "pt-br": {
        "title": "Backprop em quatro passos",
        "subtitle": "Do erro final ate a atualizacao de pesos, o sinal agora viaja da direita para a esquerda.",
        "sampleLabel": "Amostra",
        "targetLabel": "Alvo",
        "predictionLabel": "Previsao",
        "learningRateLabel": "Taxa de aprendizado",
        "tabsAriaLabel": "Escolha a fase do backpropagation",
        "lossLabel": "Loss",
        "outputDeltaLabel": "Delta da saida",
        "hiddenDeltaLabel": "Deltas ocultos",
        "updateLabel": "Atualizacao",
        "updateRule": "peso = peso - lr * gradiente",
        "networkLabel": "Como ler esta fase",
        "hiddenLayerLabel": "OCULTA",
        "outputLayerLabel": "SAIDA",
        "sample": {
          "label": "caso intermediario",
          "inputs": [
            0.58,
            0.78,
            0.82,
            1
          ],
          "target": 1
        },
        "learningRate": 0.5,
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
        },
        "steps": {
          "loss": {
            "label": "1. erro",
            "title": "A perda nasce na saida",
            "formula": "L = (y_hat - y)^2",
            "body": "Primeiro a rede mede a distancia entre previsao e alvo. Esse numero nao corrige nada sozinho, mas define o tamanho do problema que precisamos reduzir."
          },
          "output": {
            "label": "2. delta de saida",
            "title": "A saida calcula sua responsabilidade",
            "formula": "d_out = (y_hat - y) * sigmoid prime(y_hat)",
            "body": "O termo da saida mistura duas coisas: o erro atual e a inclinacao local da sigmoid. Assim a rede sabe nao apenas que errou, mas tambem quanto esse neuronio ainda consegue reagir."
          },
          "hidden": {
            "label": "3. deltas ocultos",
            "title": "O erro e repartido entre os ocultos",
            "formula": "d_hj = vj * d_out * sigmoid prime(hj)",
            "body": "Cada neuronio oculto recebe uma parte do erro proporcional ao peso que o liga a saida e a sua propria derivada local. Por isso os deltas ocultos geralmente diferem entre si."
          },
          "update": {
            "label": "4. atualizar",
            "title": "Os parametros enfim sao corrigidos",
            "formula": "parametro novo = parametro atual - lr * gradiente",
            "body": "Com os gradientes em maos, cada peso e vies sofre um pequeno ajuste. Repetir isso muitas vezes e o que faz a rede aprender o padrao do dataset."
          }
        }
      },
      "en-us": {
        "title": "Backprop in four steps",
        "subtitle": "From the final error to the weight update, the signal now travels from right to left.",
        "sampleLabel": "Sample",
        "targetLabel": "Target",
        "predictionLabel": "Prediction",
        "learningRateLabel": "Learning rate",
        "tabsAriaLabel": "Choose the backpropagation phase",
        "lossLabel": "Loss",
        "outputDeltaLabel": "Output delta",
        "hiddenDeltaLabel": "Hidden deltas",
        "updateLabel": "Update",
        "updateRule": "weight = weight - lr * gradient",
        "networkLabel": "How to read this phase",
        "hiddenLayerLabel": "HIDDEN",
        "outputLayerLabel": "OUTPUT",
        "sample": {
          "label": "mid case",
          "inputs": [
            0.58,
            0.78,
            0.82,
            1
          ],
          "target": 1
        },
        "learningRate": 0.5,
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
        },
        "steps": {
          "loss": {
            "label": "1. error",
            "title": "The loss is born at the output",
            "formula": "L = (y_hat - y)^2",
            "body": "The network first measures the distance between prediction and target. That number does not correct anything by itself, but it defines the size of the problem to reduce."
          },
          "output": {
            "label": "2. output delta",
            "title": "The output computes its responsibility",
            "formula": "d_out = (y_hat - y) * sigmoid prime(y_hat)",
            "body": "The output term mixes two things: the current error and the local sigmoid slope. That tells the network not only that it is wrong, but also how much this neuron can still react."
          },
          "hidden": {
            "label": "3. hidden deltas",
            "title": "The error gets split across the hidden units",
            "formula": "d_hj = vj * d_out * sigmoid prime(hj)",
            "body": "Each hidden neuron receives part of the error in proportion to the weight connecting it to the output and to its own local derivative. That is why hidden deltas are usually different from one another."
          },
          "update": {
            "label": "4. update",
            "title": "The parameters finally get corrected",
            "formula": "new parameter = current parameter - lr * gradient",
            "body": "With the gradients available, every weight and bias gets a small adjustment. Repeating this many times is what makes the network learn the dataset pattern."
          }
        }
      }
    },
  },
});
