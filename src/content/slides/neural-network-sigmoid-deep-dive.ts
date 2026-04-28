import { defineSlide } from './_factory';

export const neuralNetworkSigmoidDeepDive = defineSlide({
  id: 'neural-network-sigmoid-deep-dive',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.34,
      0.66
    ]
  },
  content: {
    'pt-br': {
      title: `Onde o e entra nas ativacoes`,
      body: `Neste slide, o foco nao e a origem do numero \`e\`, e sim **onde ele entra nas ativacoes** e por que isso ajuda a rede a prever melhor.

1. **Varias ativacoes usam exponencial com base \`e\`:** isso aparece na \`sigmoid\`, na \`softmax\` e tambem na \`tanh\`, de forma indireta.

2. **A sigmoid e o exemplo mais classico:**

\`\`\`txt
sigmoid(z) = 1 / (1 + e^-z)
\`\`\`

3. **O termo \`e^-z\` e a parte que curva a resposta:** quando \`z\` aumenta, esse termo cai; quando \`z\` diminui, ele cresce. Isso faz a saida subir de forma suave, em vez de responder como uma reta infinita.

4. **Essa compressao ajuda na previsao:** a entrada pode ser qualquer numero, de \`-infinito\` ate \`+infinito\`, mas a saida sempre fica entre \`0\` e \`1\`.

5. **Por isso a leitura probabilistica fica natural:** em muitos casos, podemos interpretar a saida como o quanto a rede acredita em uma classe.

> Na pratica: \`0\` sugere "improvavel", \`1\` sugere "muito provavel", e \`0.5\` marca o ponto neutro no meio da curva.

### Leitura rapida
- \`sigmoid\`: transforma valor bruto em saida entre \`0\` e \`1\`
- \`softmax\`: usa exponenciais para comparar varias classes ao mesmo tempo
- \`tanh\`: tambem nasce de termos exponenciais, mas devolve saidas entre \`-1\` e \`1\`
- o \`e\` entra justamente na parte que torna a resposta nao linear
- essa leitura de probabilidade prepara o terreno para a previsao e para a derivada do proximo slide`,
      codeExplanations: [

  ],
    },
    'en-us': {
      title: `Where e enters activations`,
      body: `In this slide, the focus is not where the number \`e\` comes from, but **where it shows up inside activations** and why that helps the network predict better.

1. **Several activations use exponentials with base \`e\`:** this appears in \`sigmoid\`, in \`softmax\`, and also in \`tanh\` indirectly.

2. **Sigmoid is the classic example:**

\`\`\`txt
sigmoid(z) = 1 / (1 + e^-z)
\`\`\`

3. **The term \`e^-z\` is what bends the response:** when \`z\` increases, that term shrinks; when \`z\` decreases, it grows. That makes the output rise smoothly instead of behaving like an unbounded straight line.

4. **This compression helps prediction:** the input can be any number, from \`-infinity\` to \`+infinity\`, but the output always stays between \`0\` and \`1\`.

5. **That is why the probabilistic reading feels natural:** in many cases, we can interpret the output as how strongly the network believes in a class.

> In practice: \`0\` suggests "unlikely", \`1\` suggests "very likely", and \`0.5\` marks the neutral point in the middle of the curve.

### Quick read
- \`sigmoid\`: turns a raw value into an output between \`0\` and \`1\`
- \`softmax\`: uses exponentials to compare multiple classes at once
- \`tanh\`: is also built from exponential terms, but returns outputs between \`-1\` and \`1\`
- \`e\` enters exactly in the part that makes the response nonlinear
- this probability-style reading sets up both prediction and the derivative on the next slide`,
      codeExplanations: [

  ],
    },
  },
  visual: {
    id: 'sigmoid-deep-dive-explorer',
    copy: {
      "pt-br": {
        "ariaLabel": "Explorador visual detalhado da sigmoid",
        "sliderLabel": "Ajuste o valor bruto",
        "inputLabel": "z",
        "outputLabel": "sigmoid(z)",
        "chartTitle": "A curva sobe porque o denominador cai",
        "formulaTitle": "Formula central",
        "formula": "sigmoid(z) = 1 / (1 + e^-z)",
        "stepperTitle": "Desmonte a formula",
        "stepFocusLabel": "Etapa em foco",
        "takeawayTitle": "O que fixar",
        "takeawayBody": "A sigmoid comprime qualquer entrada para o intervalo entre 0 e 1. O miolo da formula controla a direcao da curva, a velocidade da mudanca e o fato de ela sempre passar por 0.5 quando z = 0.",
        "eulerTitle": "Por que aparece o numero de Euler",
        "eulerBody": "O numero `e` e o **numero de Euler**, uma constante matematica fixa, aproximadamente `2.7182818`. A intuicao mais concreta e crescimento continuo: quando voce divide um ganho em partes cada vez menores e reaplica sobre o valor atualizado, o resultado se aproxima de `e`.",
        "convergenceTitle": "Como isso converge para e",
        "convergenceBody": "A mesma ideia de crescimento dividido em mais partes vai se aproximando de `2.718...`.",
        "convergenceRows": [
          {
          "label": "1 vez",
          "expression": "(1 + 1)^1",
          "value": "2"
        },
          {
          "label": "2 vezes",
          "expression": "(1 + 0.5)^2",
          "value": "2.25"
        },
          {
          "label": "10 vezes",
          "expression": "(1 + 0.1)^10",
          "value": "2.5937"
        },
          {
          "label": "100 vezes",
          "expression": "(1 + 0.01)^100",
          "value": "2.7048"
        }
        ],
        "eulerBullets": [
          "1 aplicacao de 100% de crescimento: `1 -> 2`.",
          "2 aplicacoes de 50%: `(1 + 0.5)^2 = 2.25`.",
          "Em geral: `(1 + 1/n)^n`; quando `n` cresce muito, isso se aproxima de `e`.",
          "`e^-z` significa elevar `e` a `-z`, criando o termo exponencial que despenca quando `z` sobe.",
          "Como esse termo cai quando `z` sobe, o denominador encolhe e a saida aumenta."
        ],
        "zoneTitle": "Leitura da zona atual",
        "denominatorLabel": "1 + e^-z",
        "steps": {
          "input": {
            "label": "1. Valor bruto z",
            "body": "Esse e o sinal que sai da parte linear do neuronio antes da ativacao."
          },
          "negation": {
            "label": "2. Inversao para -z",
            "body": "O sinal negativo troca a direcao do efeito exponencial e prepara a curva para subir quando z aumenta."
          },
          "exponential": {
            "label": "3. Exponencial e^-z",
            "body": "Aqui o valor passa a crescer ou decair de modo suave, ficando muito grande na esquerda e muito pequeno na direita."
          },
          "output": {
            "label": "4. Compressao final",
            "body": "Ao dividir por `1 + e^-z`, a saida fica presa entre 0 e 1 e cruza o centro em 0.5."
          }
        },
        "zones": {
          "left": "Cauda esquerda: saida perto de 0",
          "middle": "Faixa sensivel: pequenas mudancas ainda mexem bastante na saida",
          "right": "Cauda direita: saida perto de 1"
        }
      },
      "en-us": {
        "ariaLabel": "Detailed sigmoid visual explorer",
        "sliderLabel": "Adjust the raw value",
        "inputLabel": "z",
        "outputLabel": "sigmoid(z)",
        "chartTitle": "The curve rises because the denominator shrinks",
        "formulaTitle": "Core formula",
        "formula": "sigmoid(z) = 1 / (1 + e^-z)",
        "stepperTitle": "Unpack the formula",
        "stepFocusLabel": "Focused step",
        "takeawayTitle": "What to retain",
        "takeawayBody": "Sigmoid compresses any input into the interval between 0 and 1. The inner pieces of the formula control the curve direction, the pace of change, and the fact that it always passes through 0.5 when z = 0.",
        "eulerTitle": "Why the Euler number appears",
        "eulerBody": "The number `e` is the **Euler number**, a fixed mathematical constant, about `2.7182818`. The most concrete intuition is continuous growth: when you split a gain into smaller and smaller pieces and keep reapplying it to the updated value, the result approaches `e`.",
        "convergenceTitle": "How this converges to e",
        "convergenceBody": "The same idea of growth split into more pieces gets closer and closer to `2.718...`.",
        "convergenceRows": [
          {
          "label": "1 time",
          "expression": "(1 + 1)^1",
          "value": "2"
        },
          {
          "label": "2 times",
          "expression": "(1 + 0.5)^2",
          "value": "2.25"
        },
          {
          "label": "10 times",
          "expression": "(1 + 0.1)^10",
          "value": "2.5937"
        },
          {
          "label": "100 times",
          "expression": "(1 + 0.01)^100",
          "value": "2.7048"
        }
        ],
        "eulerBullets": [
          "1 application of 100% growth: `1 -> 2`.",
          "2 applications of 50%: `(1 + 0.5)^2 = 2.25`.",
          "In general: `(1 + 1/n)^n`; as `n` gets large, this approaches `e`.",
          "`e^-z` means raising `e` to `-z`, creating the exponential term that drops when `z` rises.",
          "Because that term shrinks when `z` rises, the denominator shrinks and the output rises."
        ],
        "zoneTitle": "Reading the current zone",
        "denominatorLabel": "1 + e^-z",
        "steps": {
          "input": {
            "label": "1. Raw value z",
            "body": "This is the signal produced by the neuron's linear part before activation."
          },
          "negation": {
            "label": "2. Flip to -z",
            "body": "The negative sign reverses the direction of the exponential effect and prepares the curve to rise as z increases."
          },
          "exponential": {
            "label": "3. Exponential e^-z",
            "body": "Here the value starts growing or decaying smoothly, becoming very large on the left and very small on the right."
          },
          "output": {
            "label": "4. Final compression",
            "body": "By dividing by `1 + e^-z`, the output stays trapped between 0 and 1 and crosses the center at 0.5."
          }
        },
        "zones": {
          "left": "Left tail: output near 0",
          "middle": "Sensitive band: small changes still move the output a lot",
          "right": "Right tail: output near 1"
        }
      }
    },
  },
});
