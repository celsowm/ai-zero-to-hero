import { defineSlide } from './_factory';

export const moeGatingMath = defineSlide({
  id: 'moe-gating-math',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: 'Função de Gating: A Matemática Completa',
      body: `O roteador MoE não é magia — é **álgebra linear + softmax**. Vamos decompor cada operação.

### Passo 1: Produto Escalar (Logits)
Cada expert $i$ tem um vetor de pesos $w_i \\in \\mathbb{R}^d$. O token $x$ é projetado:

$$z_i = w_i \\cdot x = \\sum_{j=1}^{d} w_{ij} \\cdot x_j$$

Isso mede **quão alinhado** o token está com o "tema" do expert.

### Passo 2: Softmax (Probabilidades)
Os logits são convertidos em probabilidades:

$$p_i = \\frac{e^{z_i / \\tau}}{\\sum_k e^{z_k / \\tau}}$$

Onde $\\tau$ é a **temperatura**:
- $\\tau < 1$: distribuição pontuda (um expert domina)
- $\\tau = 1$: softmax padrão
- $\\tau > 1$: distribuição plana (mais incerteza)

### Passo 3: Por que Softmax e não Sigmoid?
- **Sigmoid** trata cada expert independentemente — não há competição.
- **Softmax** força **competição**: se um expert sobe, outro desce. A soma sempre = 1.
- Isso é essencial para MoE: os experts precisam **se especializar em nichos complementares**.

### Passo 4: Top-K + Renormalização
Selecionados os $k$ experts, re-normalizamos para que somem 1:

$$\\alpha_j = \\frac{p_j}{\\sum_{m \\in \\text{top-}k} p_m}$$

> **Interaja →** O visual ao lado mostra cada passo sendo computado com pesos reais.`,
    },
    'en-us': {
      title: 'Gating Function: The Full Math',
      body: `The MoE router isn't magic — it's **linear algebra + softmax**. Let's decompose every operation.

### Step 1: Dot Product (Logits)
Each expert $i$ has a weight vector $w_i \\in \\mathbb{R}^d$. The token $x$ is projected:

$$z_i = w_i \\cdot x = \\sum_{j=1}^{d} w_{ij} \\cdot x_j$$

This measures **how aligned** the token is with the expert's "theme".

### Step 2: Softmax (Probabilities)
Logits are converted to probabilities:

$$p_i = \\frac{e^{z_i / \\tau}}{\\sum_k e^{z_k / \\tau}}$$

Where $\\tau$ is the **temperature**:
- $\\tau < 1$: sharp distribution (one expert dominates)
- $\\tau = 1$: standard softmax
- $\\tau > 1$: flat distribution (more uncertainty)

### Step 3: Why Softmax and Not Sigmoid?
- **Sigmoid** treats each expert independently — no competition.
- **Softmax** forces **competition**: if one expert goes up, another goes down. Sum always = 1.
- This is essential for MoE: experts must **specialize in complementary niches**.

### Step 4: Top-K + Renormalization
After selecting $k$ experts, we re-normalize so they sum to 1:

$$\\alpha_j = \\frac{p_j}{\\sum_{m \\in \\text{top-}k} p_m}$$

> **Interact →** The visual on the right shows each step computed with real weights.`,
    },
  },
  visual: {
    id: 'moe-gating-math-visual',
    copy: {
      'pt-br': {
        title: 'Decomposição do Gating',
        subtitle: 'Cada etapa da computação passo a passo',
        step1Title: 'Passo 1: Produto Escalar',
        step1Formula: 'z_i = w_i · x',
        step1Desc: 'Cada expert calcula similaridade com o token.',
        step2Title: 'Passo 2: Softmax',
        step2Formula: 'p_i = e^(z_i/τ) / Σ e^(z_k/τ)',
        step2Desc: 'Logits viram probabilidades que somam 1.',
        step3Title: 'Passo 3: Top-K',
        step3Formula: 'Selecionar k maiores',
        step3Desc: 'Apenas os melhores experts são ativados.',
        step4Title: 'Passo 4: Renormalizar',
        step4Formula: 'α_j = p_j / Σ p_m',
        step4Desc: 'Pesos selecionados são re-normalizados para somar 1.',
        tokenLabel: 'Token',
        expertLabel: 'Expert',
        logitLabel: 'Logit',
        probLabel: 'Probabilidade',
        weightLabel: 'Peso',
        temperatureLabel: 'Temperatura',
        topkLabel: 'Top-K',
        selectedLabel: 'Selecionado',
        notSelectedLabel: 'Não selecionado',
        sumLabel: 'Soma',
        efficiencyLabel: 'Eficiência',
      },
      'en-us': {
        title: 'Gating Decomposition',
        subtitle: 'Each step of the computation step by step',
        step1Title: 'Step 1: Dot Product',
        step1Formula: 'z_i = w_i · x',
        step1Desc: 'Each expert computes similarity with the token.',
        step2Title: 'Step 2: Softmax',
        step2Formula: 'p_i = e^(z_i/τ) / Σ e^(z_k/τ)',
        step2Desc: 'Logits become probabilities that sum to 1.',
        step3Title: 'Step 3: Top-K',
        step3Formula: 'Select k highest',
        step3Desc: 'Only the best experts are activated.',
        step4Title: 'Step 4: Renormalize',
        step4Formula: 'α_j = p_j / Σ p_m',
        step4Desc: 'Selected weights are re-normalized to sum to 1.',
        tokenLabel: 'Token',
        expertLabel: 'Expert',
        logitLabel: 'Logit',
        probLabel: 'Probability',
        weightLabel: 'Weight',
        temperatureLabel: 'Temperature',
        topkLabel: 'Top-K',
        selectedLabel: 'Selected',
        notSelectedLabel: 'Not selected',
        sumLabel: 'Sum',
        efficiencyLabel: 'Efficiency',
      },
    },
  },
});
