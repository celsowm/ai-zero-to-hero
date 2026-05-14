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
      body: `Quando treinamos um modelo para classificar (ex: "É crime?"), a \`loss\` não conta a história toda.

### Precision (Precisão)
"Quando o modelo diz que é positivo, o quanto podemos confiar?"
*   Foco em **evitar falsos positivos**.

### Recall (Revogação)
"De todos os casos positivos reais, quantos o modelo achou?"
*   Foco em **evitar falsos negativos**.

---

### A Intuição do Trade-off
*   ⚖️ **Mais Precisão:** Modelo "conservador", só acusa com certeza absoluta.
*   🔍 **Mais Recall:** Modelo "agressivo", acusa qualquer suspeita.
*   🎯 **F1-Score:** Tenta achar o ponto ideal entre os dois (média harmônica).

> O melhor equilíbrio depende se você prefere evitar um erro de acusação ou não deixar passar um culpado.`,
    },
    'en-us': {
      title: `Classification Metrics`,
      body: `When we train a model to classify (e.g., "Is it a crime?"), \`loss\` doesn't tell the whole story.

### Precision
"When the model says it's positive, how much can we trust it?"
*   Focus on **avoiding false positives**.

### Recall
"Of all the real positive cases, how many did the model find?"
*   Focus on **avoiding false negatives**.

---

### The Trade-off Intuition
*   ⚖️ **More Precision:** "Conservative" model, only accuses with absolute certainty.
*   🔍 **More Recall:** "Aggressive" model, accuses at any suspicion.
*   🎯 **F1-Score:** Tries to find the sweet spot between the two (harmonic mean).

> The best balance depends on whether you prefer to avoid a false accusation or not let a guilty party slip through.`,
    },
  },
});
