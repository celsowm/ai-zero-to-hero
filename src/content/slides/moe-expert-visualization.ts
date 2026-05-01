import { defineSlide } from './_factory';

export const moeExpertVisualization = defineSlide({
  id: 'moe-expert-visualization',
  type: 'two-column',
  options: {
    columnRatios: [0.45, 0.55],
  },
  content: {
    'pt-br': {
      title: 'Visualizando a Especialização dos Experts',
      body: `Como sabemos que cada expert realmente se especializa em algo diferente?

Durante o treinamento, o roteador aprende a **direcionar tokens semanticamente similares para os mesmos experts**. O resultado é um padrão emergente de especialização:

**O que o heatmap revela:**
1. **Clusters gramaticais:** Verbos ativam consistentemente os Experts 1-2, enquanto substantivos preferem Experts 3-4.
2. **Eficiência computacional:** Apenas **2 de 8 experts** são ativados por token — o modelo usa ~25% dos parâmetros por forward pass, mas mantém a capacidade de um modelo denso completo.
3. **Roteamento esparso (sparse):** A matriz é majoritariamente zeros. Isso não é bug — é feature. A esparsidade força cada expert a ser realmente bom no seu sub-domínio.

**Por que isso importa?**
Se todos os experts fizessem a mesma coisa, o MoE seria equivalente a um modelo denso gigante — mas muito mais lento. A especialização é o que justifica a complexidade do roteamento.

> **Interaja com a simulação →** Clique em diferentes tipos de token para ver como o roteador distribui as ativações entre os experts.`,
    },
    'en-us': {
      title: 'Visualizing Expert Specialization',
      body: `How do we know that each expert actually specializes in something different?

During training, the router learns to **direct semantically similar tokens to the same experts**. The result is an emergent pattern of specialization:

**What the heatmap reveals:**
1. **Grammatical clusters:** Verbs consistently activate Experts 1-2, while nouns prefer Experts 3-4.
2. **Computational efficiency:** Only **2 of 8 experts** are activated per token — the model uses ~25% of parameters per forward pass, but retains the capacity of a full dense model.
3. **Sparse routing:** The matrix is mostly zeros. This isn't a bug — it's a feature. Sparsity forces each expert to be genuinely good at its sub-domain.

**Why does this matter?**
If all experts did the same thing, MoE would be equivalent to a giant dense model — but much slower. Specialization is what justifies the routing complexity.

> **Interact with the simulation →** Click on different token types to see how the router distributes activations across experts.`,
    },
  },
  visual: {
    id: 'moe-router-simulator',
    copy: {
      'pt-br': {
        tokenLabel: 'Tipo de Token',
        expertLabel: 'Expert',
        scoreLabel: 'Score',
        selectToken: 'Selecione um token',
        routingStep1: 'Token chega ao roteador',
        routingStep2: 'Roteador calcula scores para cada expert',
        routingStep3: 'Top-2 experts são selecionados',
        routingStep4: 'Experts processam o token',
      },
      'en-us': {
        tokenLabel: 'Token Type',
        expertLabel: 'Expert',
        scoreLabel: 'Score',
        selectToken: 'Select a token',
        routingStep1: 'Token arrives at router',
        routingStep2: 'Router computes scores for each expert',
        routingStep3: 'Top-2 experts are selected',
        routingStep4: 'Experts process the token',
      },
    },
  },
});
