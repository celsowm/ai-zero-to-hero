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
      title: `Funcao de ativacao: onde a rede deixa de ser so uma reta`,
      body: `No slide anterior vimos o neuronio como \`z = w * x + b\` seguido de uma ativacao. Agora vale responder duas perguntas basicas: **o que e uma funcao de ativacao** e **por que ela existe?**

1. **O que e uma funcao de ativacao:** e a regra aplicada ao valor bruto \`z\` para produzir a saida final do neuronio, \`a = f(z)\`. Ela decide como o neuronio reage depois da soma ponderada.

2. **Qual e o seu proposito:** sem ativacao, cada camada faz apenas uma transformacao linear. Empilhar varias delas ainda equivale, no fim, a uma unica reta ou plano.

3. **O que muda quando ela entra:** com ativacao, a rede ganha curvas, limiares e saturacoes. Isso permite modelar comportamentos que uma regressao linear nao consegue representar sozinha.

4. **Cada ativacao muda o estilo da resposta:**
   - \`linear(z) = z\` so repassa o valor
   - \`relu(z) = max(0, z)\` cria um corte simples
   - \`sigmoid(z) = 1 / (1 + e^-z)\` comprime tudo para entre \`0\` e \`1\`

5. **Por que isso importa aqui:** no nosso exemplo minimo, a camada oculta e a saida usam **sigmoid**. Entao, antes de ver o treino completo, precisamos entender o que essa funcao faz com o sinal.

> A soma ponderada diz o quanto o neuronio quer responder. A ativacao decide **como** ele vai responder.

### Leitura pratica
- \`z\` e o valor bruto antes da nao linearidade
- \`a = f(z)\` e a saida que segue para a proxima camada
- a funcao de ativacao e a etapa que transforma resposta bruta em comportamento util
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
        "ariaLabel": "Comparador visual de funcoes de ativacao",
        "tabsAriaLabel": "Escolha a funcao de ativacao",
        "sliderLabel": "Ajuste o valor bruto",
        "inputLabel": "z",
        "outputLabel": "a",
        "chartTitle": "Compare a mesma entrada em tres funcoes",
        "infoTitle": "Leitura da funcao",
        "takeawayTitle": "O que fixar",
        "takeawayBody": "Ativacao nao e um detalhe cosmetico. Ela define o formato da resposta do neuronio e, portanto, quais padroes a rede consegue representar e aprender.",
        "comparisonNote": "O mesmo `z` gera saidas bem diferentes dependendo da ativacao escolhida.",
        "functions": {
          "linear": {
            "label": "Linear",
            "formula": "a = z",
            "headline": "Nao dobra nem comprime o sinal: ela so repassa o valor.",
            "body": "Funciona como referencia util para comparacao, mas nao adiciona nao linearidade.",
            "behavior": "Se todas as camadas fossem lineares, a rede inteira continuaria equivalente a uma unica transformacao linear.",
            "gradientNote": "Derivada constante: o gradiente local e sempre 1.",
            "outputRange": "Saida sem limite superior ou inferior",
            "example": "Quando olhar para ela"
          },
          "relu": {
            "label": "ReLU",
            "formula": "a = max(0, z)",
            "headline": "Corta tudo abaixo de zero e deixa passar o que esta acima.",
            "body": "Ela introduz um limiar simples: desligado para valores negativos, ativo para positivos.",
            "behavior": "Isso produz dobras por partes e torna a rede capaz de montar fronteiras mais flexiveis.",
            "gradientNote": "Gradiente local e 0 no lado negativo e 1 no lado positivo.",
            "outputRange": "Saida entre 0 e infinito",
            "example": "Quando olhar para ela"
          },
          "sigmoid": {
            "label": "Sigmoid",
            "formula": "a = 1 / (1 + e^-z)",
            "headline": "Converte qualquer valor bruto em uma resposta suave entre 0 e 1.",
            "body": "Ela comprime extremos e deixa a faixa central mais sensivel a pequenas mudancas.",
            "behavior": "Por isso e boa para interpretar saidas como probabilidade, embora possa saturar nas pontas.",
            "gradientNote": "Gradiente local e maior no meio e pequeno nas extremidades.",
            "outputRange": "Saida entre 0 e 1",
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
