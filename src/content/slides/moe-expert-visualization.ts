import { defineSlide } from './_factory';

export const moeExpertVisualization = defineSlide({
  id: 'moe-expert-visualization',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: 'A Matemática da Especialização',
      body: `Por que cada expert realmente aprende algo diferente? A resposta está na **função de gating** e no **auxiliary loss**.

### Gating Function: O Cérebro do MoE
Para cada token $x$, o roteador calcula:

$$G(x)_i = \\text{softmax}(W_g \\cdot x)_i = \\frac{e^{w_i \\cdot x}}{\\sum_j e^{w_j \\cdot x}}$$

Onde $w_i$ é o vetor de pesos do expert $i$. O softmax garante que:
- Todos os scores somam 1.0
- Experts com maior produto escalar recebem mais probabilidade
- A **temperature** do softmax controla o quão "confiante" é a distribuição

### Especialização Emergente
Durante o treinamento, o **auxiliary loss** penaliza o modelo se alguns experts são usados muito mais que outros:

$$L_{aux} = \\alpha \\cdot \\sum_i f_i \\cdot P_i$$

Onde $f_i = 1/N$ (distribuição uniforme desejada) e $P_i$ é a probabilidade média que o gating dá ao expert $i$. Isso **força** o roteador a diversificar.

### Top-K e Renormalização
Selecionados os top-$k$ experts, os pesos são **renormalizados**:

$$w'_j = \\frac{G(x)_j}{\\sum_{m \\in \\text{top-}k} G(x)_m}$$

O output final é a soma ponderada: $y = \\sum_{j \\in \\text{top-}k} w'_j \\cdot E_j(x)$

> **Interaja →** Use a simulação para ver scores sendo computados em tempo real para diferentes tokens.`,
    },
    'en-us': {
      title: 'The Math Behind Specialization',
      body: `Why does each expert actually learn something different? The answer lies in the **gating function** and **auxiliary loss**.

### Gating Function: The Brain of MoE
For each token $x$, the router computes:

$$G(x)_i = \\text{softmax}(W_g \\cdot x)_i = \\frac{e^{w_i \\cdot x}}{\\sum_j e^{w_j \\cdot x}}$$

Where $w_i$ is the weight vector of expert $i$. The softmax ensures:
- All scores sum to 1.0
- Experts with higher dot product get more probability
- The **temperature** of the softmax controls how "confident" the distribution is

### Emergent Specialization
During training, the **auxiliary loss** penalizes the model if some experts are used much more than others:

$$L_{aux} = \\alpha \\cdot \\sum_i f_i \\cdot P_i$$

Where $f_i = 1/N$ (desired uniform distribution) and $P_i$ is the average probability the gating gives to expert $i$. This **forces** the router to diversify.

### Top-K and Renormalization
After selecting the top-$k$ experts, weights are **renormalized**:

$$w'_j = \\frac{G(x)_j}{\\sum_{m \\in \\text{top-}k} G(x)_m}$$

The final output is the weighted sum: $y = \\sum_{j \\in \\text{top-}k} w'_j \\cdot E_j(x)$

> **Interact →** Use the simulation to see scores computed in real-time for different tokens.`,
    },
  },
  visual: {
    id: 'moe-router-explorer',
    copy: {
      'pt-br': {
        title: 'Explorador do Roteador MoE',
        subtitle: 'Computação real de gating scores com softmax',
        tokenSelectorTitle: 'Tipo de Token',
        gatingTitle: 'Gating Scores (softmax)',
        gatingFormula: 'G(x)_i = softmax(W_g · x)_i',
        expertLabel: 'Expert',
        scoreLabel: 'Score',
        temperatureLabel: 'Temperatura do Softmax',
        topkLabel: 'Top-K',
        stepperTitle: 'Fluxo de Roteamento',
        stepFocusLabel: 'Foco',
        step1Label: 'Token Embedding',
        step1Body: 'Token é convertido em vetor numérico (embedding).',
        step2Label: 'Gating Scores',
        step2Body: 'Produto escalar W_g · x gera logits, depois softmax.',
        step3Label: 'Seleção Top-K',
        step3Body: 'Os K experts com maiores scores são selecionados.',
        step4Label: 'Output Combinado',
        step4Body: 'Soma ponderada dos outputs dos experts selecionados.',
        utilizationTitle: 'Utilização dos Experts',
        utilizationBody: 'Média de scores por expert across todos os tipos de token. Uma distribuição uniforme indica bom load balancing.',
        auxLossTitle: 'Auxiliary Loss',
        auxLossFormula: 'L_aux = α · Σ(f_i · P_i)',
        auxLossBody: 'Penaliza o modelo se a distribuição de uso dos experts não for próxima da uniforme.',
        efficiencyTitle: 'Eficiência Computacional',
        efficiencyBody: 'Apenas top-K experts são ativados por token.',
      },
      'en-us': {
        title: 'MoE Router Explorer',
        subtitle: 'Real-time gating score computation with softmax',
        tokenSelectorTitle: 'Token Type',
        gatingTitle: 'Gating Scores (softmax)',
        gatingFormula: 'G(x)_i = softmax(W_g · x)_i',
        expertLabel: 'Expert',
        scoreLabel: 'Score',
        temperatureLabel: 'Softmax Temperature',
        topkLabel: 'Top-K',
        stepperTitle: 'Routing Flow',
        stepFocusLabel: 'Focus',
        step1Label: 'Token Embedding',
        step1Body: 'Token is converted to a numeric vector (embedding).',
        step2Label: 'Gating Scores',
        step2Body: 'Dot product W_g · x produces logits, then softmax.',
        step3Label: 'Top-K Selection',
        step3Body: 'The K experts with highest scores are selected.',
        step4Label: 'Combined Output',
        step4Body: 'Weighted sum of selected expert outputs.',
        utilizationTitle: 'Expert Utilization',
        utilizationBody: 'Average scores per expert across all token types. A uniform distribution indicates good load balancing.',
        auxLossTitle: 'Auxiliary Loss',
        auxLossFormula: 'L_aux = α · Σ(f_i · P_i)',
        auxLossBody: 'Penalizes the model if the expert usage distribution is not close to uniform.',
        efficiencyTitle: 'Computational Efficiency',
        efficiencyBody: 'Only top-K experts are activated per token.',
      },
    },
  },
});
