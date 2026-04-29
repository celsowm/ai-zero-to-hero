import { defineSlide } from './_factory';

export const moeSparseVsDense = defineSlide({
  id: 'moe-sparse-vs-dense',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: 'Capacidade Total vs. Ativa',
      body: `Para entender o MoE, precisamos distinguir entre o que o modelo **sabe** (parâmetros totais) e o que o modelo **faz** (parâmetros ativos).

- **Total de Parâmetros:** A soma de todos os pesos de todos os especialistas. Define a "memória" ou "conhecimento" total.
- **Parâmetros Ativos:** Apenas os pesos dos especialistas escolhidos para um token específico. Define a "velocidade" e o custo de inferência.

| Modelo | Total | Ativo |
| :--- | :--- | :--- |
| **Llama-3 70B** | 70B | 70B (Denso) |
| **Mixtral 8x7B** | 46.7B | ~12.9B (MoE) |
| **DeepSeek-V3** | 671B | 37B (MoE) |

> O Mixtral 8x7B tem quase 50 bilhões de parâmetros, mas roda com a velocidade de um modelo de 12 bilhões.`,
    },
    'en-us': {
      title: 'Total vs. Active Capacity',
      body: `To understand MoE, we must distinguish between what the model **knows** (total parameters) and what the model **does** (active parameters).

- **Total Parameters:** The sum of all weights from all experts. Defines the total "memory" or "knowledge".
- **Active Parameters:** Only the weights of the experts chosen for a specific token. Defines the inference "speed" and cost.

| Model | Total | Active |
| :--- | :--- | :--- |
| **Llama-3 70B** | 70B | 70B (Dense) |
| **Mixtral 8x7B** | 46.7B | ~12.9B (MoE) |
| **DeepSeek-V3** | 671B | 37B (MoE) |

> Mixtral 8x7B has nearly 50 billion parameters, but runs with the speed of a 12 billion model.`,
    },
  },
  visual: {
    id: 'attention-vs-mlp',
    copy: {
      'pt-br': {
        attentionPhase: 'Dense: Todos os 70B trabalham',
        mlpPhase: 'MoE: Apenas 12B trabalham',
      },
      'en-us': {
        attentionPhase: 'Dense: All 70B work',
        mlpPhase: 'MoE: Only 12B work',
      },
    },
  },
});
