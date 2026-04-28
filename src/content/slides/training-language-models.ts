import { defineSlide } from './_factory';

export const trainingLanguageModels = defineSlide({
  id: 'training-language-models',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.6,
      0.4
    ]
  },
  content: {
    'pt-br': {
      title: `Como eles aprendem? (O Loop de Treino)`,
      body: `Treinar um modelo de linguagem é repetir **o mesmo ciclo** bilhões de vezes — e cada repetição esculpe o modelo um pouco mais.

1. **Forward Pass (Palpite):** o modelo recebe uma sequência tokenizado, passa por camadas de atenção + MLP e produz **logits** — números brutos para cada token do vocabulário.

2. **Softmax → Probabilidades:** os logits são transformados em probabilidades. O token certo deveria ter probabilidade ~1.0, mas no começo o modelo está **chutando quase aleatoriamente**.

3. **Loss (Cross-Entropy):** comparamos a distribuição prevista com a realidade (one-hot). Um único número: **a perda média** do batch. No início, esse número é alto — o modelo está "surpreso".

4. **Backpropagation:** a perda flui de trás pra frente usando a **regra da cadeia**. Cada peso recebe um **gradiente** — uma seta dizendo "aumente" ou "diminua".

5. **Update (Optimizer):** o otimizador (AdamW, Adam, SGD) usa o gradiente + **learning rate** para ajustar os pesos. O LR controla o tamanho do passo: **muito grande → diverge, muito pequeno → demora**.

> Treinar IA não é preencher um banco de dados. É **esculpir instintos matemáticos** — repetição após repetição.`,
    },
    'en-us': {
      title: `How do they learn? (The Training Loop)`,
      body: `Training a language model is repeating **the same cycle** billions of times — and each repetition carves the model a little deeper.

1. **Forward Pass (Guess):** the model receives a tokenized sequence, passes through attention + MLP layers, and produces **logits** — raw numbers for every vocabulary token.

2. **Softmax → Probabilities:** logits are turned into probabilities. The correct token should have prob ~1.0, but early on the model is **guessing almost randomly**.

3. **Loss (Cross-Entropy):** we compare the predicted distribution with reality (one-hot). A single number: **the batch's average loss**. At the start, this number is high — the model is "surprised".

4. **Backpropagation:** the loss flows backwards using the **chain rule**. Each weight receives a **gradient** — an arrow saying "increase" or "decrease".

5. **Update (Optimizer):** the optimizer (AdamW, Adam, SGD) uses the gradient + **learning rate** to adjust weights. The LR controls step size: **too large → diverges, too small → takes forever**.

> Training AI is not filling a database. It is **carving mathematical instincts** — repetition after repetition.`,
    },
  },
  visual: {
    id: 'training-loop-animation',
    copy: {
      "pt-br": {
        "forwardLabel": "Forward Pass",
        "softmaxLabel": "Softmax",
        "lossLabel": "Loss",
        "backpropLabel": "Backprop",
        "updateLabel": "Update",
        "playLabel": "Play",
        "pauseLabel": "Pause",
        "stepLabel": "Passo",
        "epochLabel": "Época",
        "lrLabel": "Learning Rate",
        "lossDropped": "Loss caiu!",
        "weightsUpdated": "Pesos atualizados",
        "logitsText": "logits brutos",
        "probsText": "probabilidades",
        "gradientText": "gradientes",
        "step0Desc": "O modelo processa a entrada e gera logits para cada token",
        "step1Desc": "Softmax transforma logits em probabilidades (soma = 1)",
        "step2Desc": "Cross-Entropy compara a previsão com a palavra correta",
        "step3Desc": "Gradientes fluem para trás via regra da cadeia",
        "step4Desc": "O otimizador ajusta os pesos usando o learning rate",
        "inputTokens": [
          "O",
          "gato",
          "senta"
        ],
        "vocabOptions": [
          "sentou",
          "comeu",
          "dormiu",
          "correu"
        ],
        "correctIndex": 0
      },
      "en-us": {
        "forwardLabel": "Forward Pass",
        "softmaxLabel": "Softmax",
        "lossLabel": "Loss",
        "backpropLabel": "Backprop",
        "updateLabel": "Update",
        "playLabel": "Play",
        "pauseLabel": "Pause",
        "stepLabel": "Step",
        "epochLabel": "Epoch",
        "lrLabel": "Learning Rate",
        "lossDropped": "Loss dropped!",
        "weightsUpdated": "Weights updated",
        "logitsText": "raw logits",
        "probsText": "probabilities",
        "gradientText": "gradients",
        "step0Desc": "Model processes input and generates logits for each token",
        "step1Desc": "Softmax turns logits into probabilities (sum = 1)",
        "step2Desc": "Cross-Entropy compares prediction with the correct word",
        "step3Desc": "Gradients flow backwards via the chain rule",
        "step4Desc": "Optimizer adjusts weights using the learning rate",
        "inputTokens": [
          "The",
          "cat",
          "sits"
        ],
        "vocabOptions": [
          "sat",
          "ate",
          "slept",
          "ran"
        ],
        "correctIndex": 0
      }
    },
  },
});
