import { defineSlide } from './_factory';

export const moeRouting = defineSlide({
  id: 'moe-routing',
  type: 'two-column',
  options: {
    columnRatios: [0.6, 0.4],
  },
  content: {
    'pt-br': {
      title: 'O Roteador e o Load Balancing',
      body: `O **Gating Network** (Roteador) é o cérebro que decide o destino de cada token. 

### Como funciona:
1. **Pontuação:** O token passa por uma camada linear que dá um score para cada especialista.
2. **Top-k:** Selecionamos os $k$ melhores (ex: os 2 melhores especialistas).
3. **Distribuição:** O resultado final é a soma ponderada das saídas desses especialistas.

### O Grande Desafio: Load Balancing
Se o roteador "viciar" em um especialista, ele treinará demais aquele e ignorará os outros. Para evitar isso:
- **Auxiliary Loss:** Uma penalidade no treinamento se os especialistas não forem usados de forma equilibrada.
- **Expert Capacity:** Limitar quantos tokens cada especialista pode aceitar por batch.

> Sem load balancing, o MoE colapsa em um modelo denso ineficiente.`,
    },
    'en-us': {
      title: 'The Router and Load Balancing',
      body: `The **Gating Network** (Router) is the brain that decides each token's destination.

### How it works:
1. **Scoring:** The token passes through a linear layer that gives a score for each expert.
2. **Top-k:** We select the $k$ best (e.g., the top 2 experts).
3. **Distribution:** The final result is the weighted sum of these experts' outputs.

### The Great Challenge: Load Balancing
If the router gets "hooked" on one expert, it will overtrain that one and ignore the others. To prevent this:
- **Auxiliary Loss:** A training penalty if experts are not used in a balanced way.
- **Expert Capacity:** Limiting how many tokens each expert can accept per batch.

> Without load balancing, MoE collapses into an inefficient dense model.`,
    },
  },
  visual: {
    id: 'hidden-states-to-logits',
    copy: {
      'pt-br': {
        title: 'Mecânica de Roteamento',
        description: 'Entrada -> Gating -> Top-K -> Saída Combinada',
      },
      'en-us': {
        title: 'Routing Mechanics',
        description: 'Input -> Gating -> Top-K -> Combined Output',
      },
    },
  },
});
