import { defineSlide } from './_factory';

export const classificationMetrics = defineSlide({
  id: 'classification-metrics',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: `Métricas de Classificação`,
      body: `Quando treinamos um modelo para classificar (ex: "É crime?" ou "Dano moral?"), a \`loss\` não conta a história toda. Precisamos de métricas de acerto:

### Precision (Precisão)
"Quando o modelo diz que é positivo, o quanto podemos confiar?"
*   Foco em **evitar falsos positivos**.

### Recall (Revogação)
"De todos os casos positivos que existem, quantos o modelo achou?"
*   Foco em **evitar falsos negativos**.

> **O Desafio:** Geralmente, quando você aumenta a Precisão (fica mais conservador), você diminui o Recall (deixa passar mais coisas), e vice-versa.`,
    },
    'en-us': {
      title: `Classification Metrics`,
      body: `When we train a model to classify (e.g., "Is it a crime?" or "Moral damage?"), \`loss\` doesn't tell the whole story. We need accuracy metrics:

### Precision
"When the model says it's positive, how much can we trust it?"
*   Focus on **avoiding false positives**.

### Recall
"Of all the real positive cases, how many did the model find?"
*   Focus on **avoiding false negatives**.

> **The Challenge:** Generally, when you increase Precision (become more conservative), you decrease Recall (let more things slip through), and vice versa.`,
    },
  },
  visual: {
    id: 'classification-metrics-visual',
    copy: {
      'pt-br': {
        precisionTitle: 'Mais Precisão',
        precisionDesc: 'Modelo fica "conservador", só acusa quando tem certeza absoluta (ex: condenações criminais).',
        recallTitle: 'Mais Recall',
        recallDesc: 'Modelo fica "agressivo", acusa qualquer sinal de suspeita (ex: triagem de doenças).',
      },
      'en-us': {
        precisionTitle: 'More Precision',
        precisionDesc: 'Model becomes "conservative", only accuses when absolutely sure (e.g., criminal convictions).',
        recallTitle: 'More Recall',
        recallDesc: 'Model becomes "aggressive", accuses at any sign of suspicion (e.g., disease screening).',
      },
    },
  },
});
