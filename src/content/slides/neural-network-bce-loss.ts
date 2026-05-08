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

\`\`\`python
snippet:neural-networks/bce-loss-demo
\`\`\`

### O que observar
- \`p\` = probabilidade que o modelo deu para a resposta correta
- \`loss = -log(p)\`: quando \`p → 0\`, \`loss → ∞\`
- A curva penaliza muito mais a "confiança errada" do que o MSE faria`,
      codeExplanations: [
    {
    "lineRange": [
      1,
      1
    ],
    "content": "Importamos math para calcular log."
  },
    {
    "lineRange": [
      3,
      10
    ],
    "content": "Aqui criamos seis cenários: três onde a resposta é 1 (modelo acertou ou errou) e três onde a resposta é 0."
  },
    {
    "lineRange": [
      12,
      19
    ],
    "content": "A função bce_loss calcula a perda para um único exemplo. Quando a resposta é 1, usamos -log(p); quando é 0, usamos -log(1-p). Isso garante que a punição seja justa independente da classe."
  },
    {
    "lineRange": [
      20,
      35
    ],
    "content": "Iteramos sobre todos os exemplos calculando a loss individual e imprimimos a tabela. Observe como o modelo 'quase acertou' (p=0.6, resposta=1) tem loss moderada, mas 'errou com confiança' (p=0.01, resposta=1) tem loss brutal (4.6)."
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

\`\`\`python
snippet:neural-networks/bce-loss-demo
\`\`\`

### What to watch
- \`p\` = probability the model gave to the correct answer
- \`loss = -log(p)\`: when \`p → 0\`, \`loss → ∞\`
- The curve penalizes "confident wrongness" much more than MSE would`,
      codeExplanations: [
    {
    "lineRange": [
      1,
      1
    ],
    "content": "We import math to compute log."
  },
    {
    "lineRange": [
      3,
      10
    ],
    "content": "Here we create six scenarios: three where the answer is 1 (model got it right or wrong) and three where the answer is 0."
  },
    {
    "lineRange": [
      12,
      19
    ],
    "content": "The bce_loss function computes the loss for a single example. When the answer is 1, we use -log(p); when it's 0, we use -log(1-p). This ensures fair punishment regardless of class."
  },
    {
    "lineRange": [
      20,
      35
    ],
    "content": "We iterate over all examples computing individual loss and print the table. Notice how the model 'almost right' (p=0.6, answer=1) has moderate loss, but 'wrong with confidence' (p=0.01, answer=1) has brutal loss (4.6)."
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
