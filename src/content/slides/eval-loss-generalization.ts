import { defineSlide } from './_factory';

export const evalLossGeneralization = defineSlide({
  id: 'eval-loss-generalization',
  type: 'markdown',
  content: {
    'pt-br': {
      title: `Generalização: Treino vs. Validação`,
      body: `O maior desafio do SFT não é fazer a loss cair, mas garantir que o modelo aprenda padrões reais, não apenas decore o dataset.

*   **Train Loss:** Erro nos dados que o modelo está usando para aprender.
*   **Eval Loss:** Erro nos dados separados para teste (que o modelo nunca viu).

O comportamento ideal é que ambas as curvas desçam juntas. Quando elas divergem, temos um sinal de alerta.

### O Diagnóstico (Saudável vs. Overfitting)

| Cenário | Train Loss | Eval Loss | Diagnóstico |
| :--- | :--- | :--- | :--- |
| **Ideal** | 1.0 → 0.8 | 1.1 → 0.9 | ✅ Saudável |
| **Alerta** | 1.0 → 0.7 | 1.1 → 1.1 | ⚠️ Platô |
| **Crítico** | 1.0 → 0.3 | 1.1 → 1.8 | ❌ Overfitting |

1.  **Saudável:** \`train_loss\` ↓ e \`eval_loss\` ↓.
2.  **Overfitting (Decorando):** \`train_loss\` ↓ mas \`eval_loss\` ↑.
3.  **Platô:** Ambas param de descer.`,
    },
    'en-us': {
      title: `Generalization: Training vs. Validation`,
      body: `The biggest challenge in SFT isn't making the loss go down, but ensuring the model learns real patterns instead of just memorizing the dataset.

*   **Train Loss:** Error on the data the model is using to learn.
*   **Eval Loss:** Error on the data set aside for testing (which the model has never seen).

The ideal behavior is for both curves to go down together. When they diverge, we have a red flag.

### The Diagnosis (Healthy vs. Overfitting)

| Scenario | Train Loss | Eval Loss | Diagnosis |
| :--- | :--- | :--- | :--- |
| **Ideal** | 1.0 → 0.8 | 1.1 → 0.9 | ✅ Healthy |
| **Warning** | 1.0 → 0.7 | 1.1 → 1.1 | ⚠️ Plateau |
| **Critical** | 1.0 → 0.3 | 1.1 → 1.8 | ❌ Overfitting |

1.  **Healthy:** \`train_loss\` ↓ and \`eval_loss\` ↓.
2.  **Overfitting (Memorizing):** \`train_loss\` ↓ but \`eval_loss\` ↑.
3.  **Plateau:** Both stop going down.`,
    },
  },
});
