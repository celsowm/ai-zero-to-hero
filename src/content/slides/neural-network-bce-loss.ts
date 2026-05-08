import { defineSlide } from './_factory';

export const neuralNetworkBceLoss = defineSlide({
  id: 'neural-network-bce-loss',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.55,
      0.45
    ]
  },
  content: {
    'pt-br': {
      title: `Medindo o erro binário: de perto vs longe`,
      body: `Nos slides anteriores, o MSE (*Mean Squared Error*) funcionou bem para prever **peso** — um número contínuo. Mas agora nosso alvo é binário: fumante ou não fumante.

1. **O problema do MSE aqui:** se a rede diz 0.3 para "fumante=sim", o MSE pune suavemente. Mas e se ela disser 0.01 com "certeza" para quem é fumante? O MSE não pune **o suficiente** esse tipo de erro confiante.

2. **A punição que queremos:** quando a resposta é 1 e o modelo diz 0.9 → penalidade leve. Quando diz 0.01 → penalidade brutal, tendendo a infinito. Quanto mais confiante e errado, mais a conta sobe.

3. **O nome técnico:** essa função que cresce brutalmente à medida que a confiança errada aumenta tem um nome: **Binary Cross Entropy Loss** (\`BCELoss\`). Ela é a escolha natural para classificação binária.

> BCELoss traduz a intuição: errar por pouco é tolerável; errar com confiança é inaceitável.

---

### Qual loss function usar?

O PyTorch oferece várias — cada uma para um cenário:

| Função | Quando usar | Exemplo |
|---|---|---|
| \`MSELoss\` | Regressão (valor contínuo) | Prever preço, temperatura |
| \`BCELoss\` | Classificação binária (com sigmoid) | Fumante? Spam? Doença? |
| \`BCEWithLogitsLoss\` | Binária sem sigmoid manual | Mesmo que BCELoss + sigmoid embutido |
| \`CrossEntropyLoss\` | Multi-classe (3+ categorias) | Dígitos 0-9, espécie de flor |
| \`NLLLoss\` | Multi-classe com log softmax | Versão manual da CrossEntropy |

No nosso caso — **classificação binária com sigmoid na última camada** — usamos \`BCELoss\`. No slide seguinte, veremos ela em ação no loop de treino completo.

---

\`\`\`python
snippet:neural-networks/bce-loss-demo
\`\`\`

### O que observar
- \`nn.BCELoss()\`: a loss function correta para classificação binária
- \`nn.Sigmoid()\` na última camada: garante saída em [0, 1] — requisito para BCELoss
- \`optimizer.step()\`: mesmo padrão que usaremos em todo treinamento PyTorch`,
      codeExplanations: [
    {
    "lineRange": [
      1,
      2
    ],
    "content": "Importamos o módulo nn do PyTorch, que reúne todas as loss functions e camadas de rede neural."
  },
    {
    "lineRange": [
      5,
      10
    ],
    "content": "Criamos a rede MLP 4→3→1 com sigmoid nas duas camadas. A última sigmoid garante que a saída é uma probabilidade entre 0 e 1 — requisito para BCELoss."
  },
    {
    "lineRange": [
      13,
      14
    ],
    "content": "Aqui instanciamos a BCELoss e o otimizador SGD. A BCELoss é a escolha correta porque a saída é binária (0 ou 1) e já passa por sigmoid."
  },
    {
    "lineRange": [
      17,
      22
    ],
    "content": "O loop de treino: forward → calcula loss → zera gradientes → backprop → atualiza pesos. Esse é o mesmo padrão que usaremos em todo treinamento PyTorch daqui em diante."
  },
    {
    "lineRange": [
      24,
      25
    ],
    "content": "Imprimimos a loss final e as predições. Uma loss baixa (~0.02) indica que a rede aprendeu a distinguir fumante de não-fumante."
  }
  ],
    },
    'en-us': {
      title: `Measuring binary error: close vs far`,
      body: `In previous slides, MSE (*Mean Squared Error*) worked well for predicting **weight** — a continuous number. But now our target is binary: smoker or not smoker.

1. **The problem with MSE here:** if the network says 0.3 for "smoker=yes", MSE punishes gently. But what if it says 0.01 with "certainty" for someone who is a smoker? MSE doesn't punish that confident error **enough**.

2. **The punishment we want:** when the answer is 1 and the model says 0.9 → light penalty. When it says 0.01 → brutal penalty, tending to infinity. The more confident and wrong, the more the bill goes up.

3. **The technical name:** this function that grows brutally as wrong confidence increases has a name: **Binary Cross Entropy Loss** (\`BCELoss\`). It is the natural choice for binary classification.

> BCELoss translates the intuition: missing by a little is tolerable; missing with confidence is unacceptable.

---

### Which loss function to use?

PyTorch offers several — each for a specific scenario:

| Function | When to use | Example |
|---|---|---|
| \`MSELoss\` | Regression (continuous value) | Predict price, temperature |
| \`BCELoss\` | Binary classification (with sigmoid) | Smoker? Spam? Disease? |
| \`BCEWithLogitsLoss\` | Binary without manual sigmoid | Same as BCELoss + sigmoid built-in |
| \`CrossEntropyLoss\` | Multi-class (3+ categories) | Digits 0-9, flower species |
| \`NLLLoss\` | Multi-class with log softmax | Manual version of CrossEntropy |

In our case — **binary classification with sigmoid on the last layer** — we use \`BCELoss\`. In the next slide, we'll see it in action in the full training loop.

---

\`\`\`python
snippet:neural-networks/bce-loss-demo
\`\`\`

### What to watch
- \`nn.BCELoss()\`: the right loss function for binary classification
- \`nn.Sigmoid()\` on the last layer: ensures output in [0, 1] — required for BCELoss
- \`optimizer.step()\`: same pattern we'll use for every PyTorch training`,
      codeExplanations: [
    {
    "lineRange": [
      1,
      2
    ],
    "content": "We import PyTorch's nn module, which groups all loss functions and neural network layers."
  },
    {
    "lineRange": [
      5,
      10
    ],
    "content": "We create the 4→3→1 MLP with sigmoid on both layers. The final sigmoid ensures output is a probability between 0 and 1 — required for BCELoss."
  },
    {
    "lineRange": [
      13,
      14
    ],
    "content": "Here we instantiate BCELoss and the SGD optimizer. BCELoss is the right choice because the output is binary (0 or 1) and already passes through sigmoid."
  },
    {
    "lineRange": [
      17,
      22
    ],
    "content": "The training loop: forward → compute loss → zero gradients → backprop → update weights. This is the same pattern we'll use for every PyTorch training from here on."
  },
    {
    "lineRange": [
      24,
      25
    ],
    "content": "We print the final loss and predictions. A low loss (~0.02) indicates the network learned to distinguish smoker from non-smoker."
  }
  ],
    },
  },
  visual: {
    id: 'bce-loss-curve',
    copy: {
      "pt-br": {
        "title": "Curva de penalidade BCE",
        "xAxis": "Probabilidade dada à resposta correta",
        "yAxis": "Penalidade (loss)",
        "nearMiss": "Errou por pouco",
        "confidentWrong": "Errou com confiança",
        "almostRight": "Quase acertou",
        "rightAnswer": "Acertou",
        "tooltipNearMiss": "p=0.3, resposta=1 → loss={value}",
        "tooltipConfident": "p=0.01, resposta=1 → loss={value}",
        "tooltipAlmost": "p=0.6, resposta=1 → loss={value}",
        "tooltipRight": "p=0.9, resposta=1 → loss={value}",
        "insight": "Quando p → 0, a loss tende a infinito. O modelo é severamente punido por errar com confiança.",
        "insightShort": "Confiança errada = punição brutal"
      },
      "en-us": {
        "title": "BCE penalty curve",
        "xAxis": "Probability assigned to correct answer",
        "yAxis": "Penalty (loss)",
        "nearMiss": "Missed by a little",
        "confidentWrong": "Wrong with confidence",
        "almostRight": "Almost right",
        "rightAnswer": "Right answer",
        "tooltipNearMiss": "p=0.3, answer=1 → loss={value}",
        "tooltipConfident": "p=0.01, answer=1 → loss={value}",
        "tooltipAlmost": "p=0.6, answer=1 → loss={value}",
        "tooltipRight": "p=0.9, answer=1 → loss={value}",
        "insight": "As p → 0, loss tends to infinity. The model is severely punished for being confidently wrong.",
        "insightShort": "Confident wrong = brutal penalty"
      }
    },
  },
});
