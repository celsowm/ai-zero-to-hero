import { defineSlide } from './_factory';

export const neuralNetworkMinimalExample = defineSlide({
  id: 'neural-network-minimal-example',
  type: 'custom',
  content: {
    'pt-br': {
      title: `Rede Neural: exemplo mínimo didático`,
      body: ``,
    },
    'en-us': {
      title: `Neural Network: didactic minimal example`,
      body: ``,
    },
  },
  visual: {
    id: 'neural-network-step-debugger',
    copy: {
      "pt-br": {
        "title": "Exemplo mínimo didático",
        "subtitle": "Treine uma rede 4→3→1 amostra por amostra e acompanhe forward, backprop e atualização de pesos sem hardcode de arquitetura.",
        "featureNames": [
          "idade",
          "pressão",
          "colesterol",
          "fumante"
        ],
        "architecture": {
          "inputSize": 4,
          "hiddenSize": 3,
          "outputSize": 1,
          "hiddenActivation": "sigmoid",
          "outputActivation": "sigmoid",
          "label": "4→3(sigmoid)→1(sigmoid)"
        },
        "learningRate": 0.5,
        "initialWeights": {
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
        "labels": {
          "inputLayer": "ENTRADA",
          "hiddenLayer": "OCULTA",
          "outputLayer": "SAÍDA",
          "codeTitle": "Código Python",
          "sampleLabel": "Amostra",
          "lossLabel": "Loss",
          "predictionLabel": "Predição final (y_hat)",
          "targetLabel": "Alvo",
          "finalClassLabel": "Classe",
          "stepButton": "Step",
          "playButton": "Play",
          "pauseButton": "Pause",
          "resetButton": "Reset",
          "speedSample": "1×",
          "speedEpoch": "10×",
          "speedFast": "100×",
          "lossHistoryTitle": "Histórico de Loss",
          "phaseTitle": "Entenda o passo"
        },
        "pythonSource": {
          "snippetId": "neural-networks/minimal-example",
          "language": "python"
        },
        "codeHighlightRanges": {
          "init": [
            1,
            29
          ],
          "forward": [
            31,
            38
          ],
          "backprop": [
            40,
            45
          ],
          "update": [
            47,
            57
          ],
          "finalize": [
            59,
            68
          ]
        },
        "dataset": [
          {
          "inputs": [
            0.35,
            0.6,
            0.58,
            0
          ],
          "target": 0
        },
          {
          "inputs": [
            0.42,
            0.65,
            0.62,
            0
          ],
          "target": 0
        },
          {
          "inputs": [
            0.48,
            0.7,
            0.68,
            0
          ],
          "target": 0
        },
          {
          "inputs": [
            0.58,
            0.78,
            0.82,
            1
          ],
          "target": 1
        },
          {
          "inputs": [
            0.67,
            0.84,
            0.88,
            1
          ],
          "target": 1
        },
          {
          "inputs": [
            0.73,
            0.9,
            0.93,
            1
          ],
          "target": 1
        }
        ],
        "totalEpochs": 600,
        "convergenceThreshold": 0.001,
        "trainingLabels": {
          "epochLabel": "Época",
          "mseLabel": "MSE",
          "accuracyLabel": "Acurácia",
          "archLabel": "Arquitetura",
          "convergenceLabel": "Convergiu!"
        },
        "phaseExplanations": {
          "init": "Nesta fase a rede ainda nao fez conta nenhuma sobre a amostra atual. O trecho iluminado so declara os pesos `w1`, `w2` e os vieses `b1`, `b2`. Em outras palavras: estamos vendo a configuracao inicial da arquitetura, nao o resultado do forward.\n\nO ponto didatico aqui e separar claramente estrutura e execucao. Primeiro aparecem os parametros que cada neuronio vai usar; so depois aparecem `z1`, `h1`, `z_out`, `y_hat` e os gradientes. Isso evita a impressao errada de que os numeros do painel nasceram automaticamente junto com a declaracao dos pesos.",
          "forward": "Aqui o codigo foi escrito neuronio por neuronio de proposito. Em vez de esconder tudo em um `for`, o slide mostra `z1`, `z2` e `z3` de forma explicita para deixar visivel que cada neuronio oculto faz sua propria soma ponderada. Logo abaixo, `h1`, `h2` e `h3` sao as ativacoes sigmoid dessas tres somas.\n\nDepois disso, a saida repete a mesma ideia: `z_out` combina `h1`, `h2` e `h3` com `w2` e `b2`, e `y_hat` aplica a sigmoid final. A versao compacta continua no comentario como equivalencia, mas a forma expandida conversa 1:1 com o SVG e com os cards.",
          "backprop": "Depois do forward, o primeiro numero importante e `erro_out = y_hat - alvo`. Esse termo mede a diferenca bruta entre a previsao e a resposta correta. Em seguida, `loss = erro_out ** 2` transforma esse erro em erro quadratico, e `delta_out` converte isso no gradiente local da saida.\n\nA partir de `delta_out`, o erro volta para os neuronios ocultos. Cada `delta_h[i]` depende de tres coisas: o peso `w2[i]`, a derivada local da sigmoid daquele neuronio e a intensidade do erro final. Por isso os tres deltas ocultos quase nunca coincidem: cada neuronio contribuiu de um jeito diferente para a mesma previsao.",
          "update": "Aqui o codigo sai da explicacao simbolica e entra no ajuste numerico dos parametros. `w2`, `b2`, `w1` e `b1` sao atualizados usando a mesma regra: valor atual menos taxa de aprendizado vezes gradiente. Como os cards agora mostram apenas as variaveis do forward, loss e backprop, a mudanca de pesos fica representada principalmente pela tabela do SVG.\n\nDidaticamente isso ajuda porque cada area cumpre um papel unico: o codigo mostra a conta, os cards mostram as variaveis da conta atual, e o SVG mostra onde os pesos vivem e como eles mudam.",
          "finalize": "Quando o loop termina, o foco deixa de ser a amostra atual e passa a ser o estado aprendido da rede. O bloco final so empacota `w1`, `b1`, `w2` e `b2` em `parametros_finais`, que e exatamente o snapshot reutilizado no slide seguinte.\n\nEsse fechamento tambem reforca a divisao entre duas fases: durante o treino a rede produz `z`, `h`, `erro_out`, `loss` e `delta_*`; depois do treino, o que importa e guardar os parametros resultantes para inferencia."
        },
        "tooltips": {
          "input": "Camada de entrada: cada nó representa uma feature normalizada do paciente.",
          "hidden": "Neurônio oculto: calcula uma combinação linear e aplica sigmoid.",
          "output": "Neurônio de saída: produz a probabilidade prevista para a classe positiva.",
          "weight": "Peso sináptico: valor aprendido por gradiente descendente."
        }
      },
      "en-us": {
        "title": "Didactic minimal example",
        "subtitle": "Train a 4→3→1 network sample by sample and inspect forward pass, backpropagation, and weight updates without architecture hardcoding.",
        "featureNames": [
          "age",
          "pressure",
          "cholesterol",
          "smoker"
        ],
        "architecture": {
          "inputSize": 4,
          "hiddenSize": 3,
          "outputSize": 1,
          "hiddenActivation": "sigmoid",
          "outputActivation": "sigmoid",
          "label": "4→3(sigmoid)→1(sigmoid)"
        },
        "learningRate": 0.5,
        "initialWeights": {
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
        "labels": {
          "inputLayer": "INPUT",
          "hiddenLayer": "HIDDEN",
          "outputLayer": "OUTPUT",
          "codeTitle": "Python code",
          "sampleLabel": "Sample",
          "lossLabel": "Loss",
          "predictionLabel": "Final prediction (y_hat)",
          "targetLabel": "Target",
          "finalClassLabel": "Class",
          "stepButton": "Step",
          "playButton": "Play",
          "pauseButton": "Pause",
          "resetButton": "Reset",
          "speedSample": "1×",
          "speedEpoch": "10×",
          "speedFast": "100×",
          "lossHistoryTitle": "Loss history",
          "phaseTitle": "Understand the step"
        },
        "pythonSource": {
          "snippetId": "neural-networks/minimal-example",
          "language": "python"
        },
        "codeHighlightRanges": {
          "init": [
            1,
            29
          ],
          "forward": [
            31,
            38
          ],
          "backprop": [
            40,
            45
          ],
          "update": [
            47,
            57
          ],
          "finalize": [
            59,
            68
          ]
        },
        "dataset": [
          {
          "inputs": [
            0.35,
            0.6,
            0.58,
            0
          ],
          "target": 0
        },
          {
          "inputs": [
            0.42,
            0.65,
            0.62,
            0
          ],
          "target": 0
        },
          {
          "inputs": [
            0.48,
            0.7,
            0.68,
            0
          ],
          "target": 0
        },
          {
          "inputs": [
            0.58,
            0.78,
            0.82,
            1
          ],
          "target": 1
        },
          {
          "inputs": [
            0.67,
            0.84,
            0.88,
            1
          ],
          "target": 1
        },
          {
          "inputs": [
            0.73,
            0.9,
            0.93,
            1
          ],
          "target": 1
        }
        ],
        "totalEpochs": 600,
        "convergenceThreshold": 0.001,
        "trainingLabels": {
          "epochLabel": "Epoch",
          "mseLabel": "MSE",
          "accuracyLabel": "Accuracy",
          "archLabel": "Architecture",
          "convergenceLabel": "Converged!"
        },
        "phaseExplanations": {
          "init": "At this stage the network has not computed anything for the current sample yet. The highlighted block only declares `w1`, `w2`, `b1`, and `b2`. In other words, we are looking at the initial parameter setup, not at forward-pass results.\n\nThat distinction matters didactically. First come the parameters each neuron will use; only after that do `z1`, `h1`, `z_out`, `y_hat`, and the gradients appear. This prevents the common confusion that those numbers somehow already existed inside the initialization block.",
          "forward": "Here the code is intentionally written neuron by neuron. Instead of hiding everything inside a loop, the slide shows `z1`, `z2`, and `z3` explicitly so you can see that each hidden neuron has its own weighted sum. Right below, `h1`, `h2`, and `h3` are the sigmoid activations of those three sums.\n\nThen the output repeats the same idea: `z_out` combines `h1`, `h2`, and `h3` with `w2` and `b2`, and `y_hat` applies the final sigmoid. The compact loop version is still there in comments as an equivalent form, but the expanded form matches the SVG and the cards one-to-one.",
          "backprop": "After the forward pass, the first key number is `output_error = y_hat - target`. That is the raw gap between the prediction and the correct answer. Next, `loss = output_error ** 2` turns that into squared error, and `delta_out` converts it into the local gradient at the output.\n\nFrom `delta_out`, the error moves back into the hidden layer. Each `delta_h[i]` depends on three things: the output weight `w2[i]`, the local sigmoid derivative at that hidden neuron, and the strength of the final error. That is why the three hidden deltas are usually different: each hidden neuron contributed differently to the same prediction.",
          "update": "At this point the code leaves symbolic explanation and enters the numeric parameter update. `w2`, `b2`, `w1`, and `b1` all follow the same rule: current value minus learning rate times gradient. Because the cards now focus only on forward, loss, and backprop variables, the actual weight change is shown primarily in the SVG table.\n\nDidactically this is cleaner because each area now has a single job: the code shows the formulas, the cards show the variables from the current computation, and the SVG shows where the weights live and how they change.",
          "finalize": "Once the loop ends, the focus stops being the current sample and becomes the learned state of the network. The final block only packages `w1`, `b1`, `w2`, and `b2` into `final_parameters`, which is exactly the snapshot reused in the next slide.\n\nThis closing step also reinforces the split between two phases: during training the network produces `z`, `h`, `output_error`, `loss`, and `delta_*`; after training, what matters is saving the resulting parameters for inference."
        },
        "tooltips": {
          "input": "Input layer: each node represents one normalized patient feature.",
          "hidden": "Hidden neuron: computes a linear combination and applies sigmoid.",
          "output": "Output neuron: produces the predicted probability for the positive class.",
          "weight": "Synaptic weight: a value learned through gradient descent."
        }
      }
    },
  },
});
