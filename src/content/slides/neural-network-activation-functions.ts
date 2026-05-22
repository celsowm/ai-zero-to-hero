import { defineSlide } from './_factory';

export const neuralNetworkActivationFunctions = defineSlide({
  id: 'neural-network-activation-functions',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.42,
      0.58
    ]
  },
  content: {
    'pt-br': {
      title: `Função de ativação: onde a rede deixa de ser só uma reta`,
      body: `No slide anterior vimos o neurônio como \`z = w * x + b\` seguido de uma ativação. Agora vale responder duas perguntas básicas: **o que é uma função de ativação** e **por que ela existe?**

1. **O que é uma função de ativação:** é a regra aplicada ao valor bruto \`z\` para produzir a saída final do neurônio, \`a = f(z)\`. Ela decide como o neurônio reage depois da soma ponderada.

2. **Qual é o seu propósito:** sem ativação, cada camada faz apenas uma transformação linear. Empilhar várias delas ainda equivale, no fim, a uma única reta ou plano.

3. **O que muda quando ela entra:** com ativação, a rede ganha curvas, limiares e saturações. Isso permite modelar comportamentos que uma regressão linear não consegue representar sozinha.

4. **Cada ativação muda o estilo da resposta:**
   - \`linear(z) = z\` só repassa o valor
   - \`relu(z) = max(0, z)\` cria um corte simples
   - \`sigmoid(z) = 1 / (1 + e^-z)\` comprime tudo para entre \`0\` e \`1\`

5. **Por que isso importa aqui:** no nosso exemplo mínimo, a camada oculta e a saída usam **sigmoid**. Então, antes de ver o treino completo, precisamos entender o que essa função faz com o sinal.

> A soma ponderada diz o quanto o neurônio quer responder. A ativação decide **como** ele vai responder.

### Leitura prática
- \`z\` é o valor bruto antes da não linearidade
- \`a = f(z)\` é a saída que segue para a próxima camada
- a função de ativação é a etapa que transforma resposta bruta em comportamento útil
- trocar \`f\` muda completamente o comportamento da rede`,
      codeExplanations: [

  ],
    },
    'en-us': {
      title: `Activation Function: where the network stops being just a line`,
      body: `In the previous slide we saw the neuron as \`z = w * x + b\` followed by an activation. Now we should answer two basic questions: **what is an activation function** and **why does it exist?**

1. **What an activation function is:** it is the rule applied to the raw value \`z\` to produce the neuron's final output, \`a = f(z)\`. It decides how the neuron reacts after the weighted sum.

2. **What its purpose is:** without activation, each layer only performs a linear transformation. Stacking many of them still collapses to a single line or plane in the end.

3. **What changes once it is added:** with activation, the network gains curves, thresholds, and saturation. That is what lets it model behaviors a linear regression cannot capture alone.

4. **Each activation changes the style of the response:**
   - \`linear(z) = z\` just passes the value through
   - \`relu(z) = max(0, z)\` creates a simple cutoff
   - \`sigmoid(z) = 1 / (1 + e^-z)\` compresses everything into the range \`0\` to \`1\`

5. **Why it matters here:** in our minimal example, both the hidden layer and the output use **sigmoid**. So before seeing the full training loop, we should understand what this function does to the signal.

> The weighted sum says how strongly the neuron wants to react. The activation decides **how** it reacts.

### Practical reading
- \`z\` is the raw pre-activation value
- \`a = f(z)\` is the output sent to the next layer
- the activation function is the step that turns a raw response into useful behavior
- changing \`f\` changes the network behavior completely`,
      codeExplanations: [

  ],
    },
  },
  visual: {
    id: 'activation-functions-comparator',
    copy: {
      "pt-br": {
        "ariaLabel": "Comparador visual de funções de ativação",
        "tabsAriaLabel": "Escolha a função de ativação",
        "sliderLabel": "Ajuste o valor bruto",
        "inputLabel": "z",
        "outputLabel": "a",
        "chartTitle": "Compare a mesma entrada em três funções",
        "infoTitle": "Leitura da função",
        "takeawayTitle": "O que fixar",
        "takeawayBody": "Ativação não é um detalhe cosmético. Ela define o formato da resposta do neurônio e, portanto, quais padrões a rede consegue representar e aprender.",
        "comparisonNote": "O mesmo `z` gera saídas bem diferentes dependendo da ativação escolhida.",
        "functions": {
          "linear": {
            "label": "Linear",
            "formula": "a = z",
            "headline": "Não dobra nem comprime o sinal: ela só repassa o valor.",
            "body": "Funciona como referência útil para comparação, mas não adiciona não linearidade.",
            "behavior": "Se todas as camadas fossem lineares, a rede inteira continuaria equivalente a uma única transformação linear.",
            "gradientNote": "Derivada constante: o gradiente local é sempre 1.",
            "outputRange": "Saída sem limite superior ou inferior",
            "example": "Quando olhar para ela"
          },
          "relu": {
            "label": "ReLU",
            "formula": "a = max(0, z)",
            "headline": "Corta tudo abaixo de zero e deixa passar o que está acima.",
            "body": "Ela introduz um limiar simples: desligado para valores negativos, ativo para positivos.",
            "behavior": "Isso produz dobras por partes e torna a rede capaz de montar fronteiras mais flexíveis.",
            "gradientNote": "Gradiente local é 0 no lado negativo e 1 no lado positivo.",
            "outputRange": "Saída entre 0 e infinito",
            "example": "Quando olhar para ela"
          },
          "sigmoid": {
            "label": "Sigmoid",
            "formula": "a = 1 / (1 + e^-z)",
            "headline": "Converte qualquer valor bruto em uma resposta suave entre 0 e 1.",
            "body": "Ela comprime extremos e deixa a faixa central mais sensível a pequenas mudanças.",
            "behavior": "Por isso é boa para interpretar saídas como probabilidade, embora possa saturar nas pontas.",
            "gradientNote": "Gradiente local é maior no meio e pequeno nas extremidades.",
            "outputRange": "Saída entre 0 e 1",
            "example": "Quando olhar para ela"
          }
        }
      },
      "en-us": {
        "ariaLabel": "Activation function visual comparator",
        "tabsAriaLabel": "Choose the activation function",
        "sliderLabel": "Adjust the raw value",
        "inputLabel": "z",
        "outputLabel": "a",
        "chartTitle": "Compare the same input across three functions",
        "infoTitle": "Function reading",
        "takeawayTitle": "What to retain",
        "takeawayBody": "Activation is not a cosmetic detail. It defines the neuron's response shape and therefore which patterns the network can represent and learn.",
        "comparisonNote": "The same `z` produces very different outputs depending on the chosen activation.",
        "functions": {
          "linear": {
            "label": "Linear",
            "formula": "a = z",
            "headline": "It neither bends nor compresses the signal: it only forwards the value.",
            "body": "It is a useful reference for comparison, but it does not add non-linearity.",
            "behavior": "If every layer were linear, the whole network would still collapse into a single linear transformation.",
            "gradientNote": "Constant derivative: the local gradient is always 1.",
            "outputRange": "Output has no upper or lower bound",
            "example": "When to read it"
          },
          "relu": {
            "label": "ReLU",
            "formula": "a = max(0, z)",
            "headline": "It cuts everything below zero and lets positive values pass through.",
            "body": "It introduces a simple threshold: off for negative values, active for positive ones.",
            "behavior": "That creates piecewise bends and lets the network assemble more flexible boundaries.",
            "gradientNote": "Local gradient is 0 on the negative side and 1 on the positive side.",
            "outputRange": "Output ranges from 0 to infinity",
            "example": "When to read it"
          },
          "sigmoid": {
            "label": "Sigmoid",
            "formula": "a = 1 / (1 + e^-z)",
            "headline": "It converts any raw value into a smooth response between 0 and 1.",
            "body": "It compresses extremes and makes the center region more sensitive to small changes.",
            "behavior": "That makes it useful for probability-like outputs, although it can saturate on the tails.",
            "gradientNote": "Local gradient is largest in the middle and small at the extremes.",
            "outputRange": "Output ranges from 0 to 1",
            "example": "When to read it"
          }
        }
      }
    },
  },
});
