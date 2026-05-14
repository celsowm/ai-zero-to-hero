import { defineSlide } from './_factory';

export const classificationMetrics = defineSlide({
  id: 'classification-metrics',
  type: 'markdown',
  content: {
    'pt-br': {
      title: `Métricas de Classificação`,
      body: `Quando treinamos um modelo para classificar (ex: "É crime?" ou "Dano moral?"), a \`loss\` não conta a história toda. Precisamos de métricas de acerto:

### Precision (Precisão)
"Quando o modelo diz que é positivo, o quanto podemos confiar?"
*   Foco em **evitar falsos positivos**.
*   *Ex:* No direito, evitar acusar alguém injustamente.

### Recall (Revogação)
"De todos os casos positivos que existem, quantos o modelo achou?"
*   Foco em **evitar falsos negativos**.
*   *Ex:* Na medicina, não deixar passar nenhum câncer.

### A Intuição do Trade-off
*   ⚖️ **Mais Precisão:** Modelo fica "conservador", só acusa quando tem certeza absoluta.
*   🔍 **Mais Recall:** Modelo fica "agressivo", acusa qualquer sinal de suspeita.
*   🎯 **F1-Score:** Tenta achar o ponto ideal entre os dois (média harmônica).`,
    },
    'en-us': {
      title: `Classification Metrics`,
      body: `When we train a model to classify (e.g., "Is it a crime?" or "Moral damage?"), \`loss\` doesn't tell the whole story. We need accuracy metrics:

### Precision
"When the model says it's positive, how much can we trust it?"
*   Focus on **avoiding false positives**.
*   *Ex:* In law, avoiding accusing someone unjustly.

### Recall
"Of all the real positive cases, how many did the model find?"
*   Focus on **avoiding false negatives**.
*   *Ex:* In medicine, not missing any cancer cases.

### The Trade-off Intuition
*   ⚖️ **More Precision:** Model becomes "conservative," only accusing when absolutely sure.
*   🔍 **More Recall:** Model becomes "aggressive," accusing at any sign of suspicion.
*   🎯 **F1-Score:** Tries to find the sweet spot between the two (harmonic mean).`,
    },
  },
});
