import { defineSlide } from './_factory';

export const ropeDeepDive = defineSlide({
  id: 'rope-deep-dive',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: 'Rotary Positional Embeddings (RoPE)',
      body: `O **RoPE** é a inovação arquitetural mais importante do LLaMA em relação ao GPT-2. Substitui o encoding posicional sinusoidal por **rotação de vetores**.

### O Problema do Sinusoidal
O GPT-2 soma vetores de posição fixos ao embedding. Funciona bem dentro do contexto de treino (1024 tokens), mas **degrada rapidamente** quando o modelo vê sequências mais longas — as freqüências sinusoidais não foram treinadas para essas posições.

### A Ideia do RoPE
Em vez de somar posição, **rotacionar** o embedding em pares de dimensões:

**Para cada par (2i, 2i+1):**
$$x'_{2i} = x_{2i} \\cdot \\cos(m \\cdot \\theta_i) - x_{2i+1} \\cdot \\sin(m \\cdot \\theta_i)$$
$$x'_{2i+1} = x_{2i} \\cdot \\sin(m \\cdot \\theta_i) + x_{2i+1} \\cdot \\cos(m \\cdot \\theta_i)$$

Onde:
- $m$ = posição do token na sequência
- $\\theta_i = 10000^{-2i/d}$ (freqüência base do LLaMA)
- $d$ = dimensão do hidden state

### Por Que Funciona?

1. **Preserva a norma**: Rotação não muda $\\|x\\|$. O embedding mantém sua magnitude original.
2. **Dependência relativa**: A atenção entre tokens $m$ e $n$ depende apenas de $(m-n)$, não das posições absolutas.
3. **Extrapolação natural**: A rotação é uma função contínua — funciona em posições nunca vistas porque não é uma tabela fixa.

### Freqüências Multi-Escala
Cada par de dimensões tem uma freqüência diferente:
- **Dimensões baixas** (i pequeno): alta freqüência → capturam posição local (tokens adjacentes)
- **Dimensões altas** (i grande): baixa freqüência → capturam posição global (distância na sequência)

Isso permite que o modelo "enxergue" tanto o perto quanto o longe simultaneamente.

### LLaMA vs GPT-2
- **GPT-2**: sinusoidal, base fixa, não extrapola além de 1024
- **LLaMA**: RoPE, base=10000, extrapola até 2×-4× o contexto de treino
- **LLaMA 2**: mesma RoPE, mas com melhor fine-tuning de contexto longo

> **Interaja →** A simulação mostra a rotação 2D sendo computada em tempo real para cada par de dimensões.`,
    },
    'en-us': {
      title: 'Rotary Positional Embeddings (RoPE)',
      body: `**RoPE** is the most important architectural innovation in LLaMA compared to GPT-2. It replaces sinusoidal positional encoding with **vector rotation**.

### The Sinusoidal Problem
GPT-2 adds fixed position vectors to the embedding. Works well within training context (1024 tokens), but **degrades rapidly** when the model sees longer sequences — sinusoidal frequencies weren't trained for those positions.

### The RoPE Idea
Instead of adding position, **rotate** the embedding in pairs of dimensions:

**For each pair (2i, 2i+1):**
$$x'_{2i} = x_{2i} \\cdot \\cos(m \\cdot \\theta_i) - x_{2i+1} \\cdot \\sin(m \\cdot \\theta_i)$$
$$x'_{2i+1} = x_{2i} \\cdot \\sin(m \\cdot \\theta_i) + x_{2i+1} \\cdot \\cos(m \\cdot \\theta_i)$$

Where:
- $m$ = token position in sequence
- $\\theta_i = 10000^{-2i/d}$ (LLaMA base frequency)
- $d$ = hidden state dimension

### Why Does It Work?

1. **Preserves norm**: Rotation doesn't change $\\|x\\|$. The embedding keeps its original magnitude.
2. **Relative dependency**: Attention between tokens $m$ and $n$ depends only on $(m-n)$, not absolute positions.
3. **Natural extrapolation**: Rotation is a continuous function — works on unseen positions because it's not a fixed table.

### Multi-Scale Frequencies
Each dimension pair has a different frequency:
- **Low dimensions** (small i): high frequency → capture local position (adjacent tokens)
- **High dimensions** (large i): low frequency → capture global position (sequence distance)

This allows the model to "see" both near and far simultaneously.

### LLaMA vs GPT-2
- **GPT-2**: sinusoidal, fixed base, doesn't extrapolate beyond 1024
- **LLaMA**: RoPE, base=10000, extrapolates 2×-4× training context
- **LLaMA 2**: same RoPE, but with better long-context fine-tuning

> **Interact →** The simulation shows 2D rotation computed in real-time for each dimension pair.`,
    },
  },
  visual: {
    id: 'rope-explorer',
    copy: {
      'pt-br': {
        title: 'Explorador RoPE',
        subtitle: 'Rotação 2D computada em tempo real',
        embeddingLabel: 'Embedding',
        positionLabel: 'Posição',
        dimLabel: 'Dimensão',
        rotationTitle: 'Rotação 2D no Plano (dim 2i, 2i+1)',
        rotationFormula: "x' = x·cos(mθ) - y·sin(mθ), y' = x·sin(mθ) + y·cos(mθ)",
        freqTitle: 'Bandas de Freqüência por Par de Dimensões',
        freqSubtitle: 'Dimensões baixas = alta freqüência (local). Altas = baixa freqüência (global).',
        freqFormula: 'θ_i = 10000^(-2i/d)',
        extrapolationTitle: 'Extrapolação: RoPE vs Sinusoidal',
        extrapolationSubtitle: 'Query em pos 512, Key variando além do treino',
        stepperTitle: 'Pipeline RoPE',
        stepFocusLabel: 'Foco',
        step1Label: 'Embedding',
        step1Body: 'Token convertido em vetor [x₀, x₁, ..., x_d].',
        step2Label: 'Ângulos',
        step2Body: 'Calcula m·θ_i para cada par de dimensões.',
        step3Label: 'Rotação',
        step3Body: 'Aplica rotação 2D em cada par independente.',
        step4Label: 'Output',
        step4Body: 'Vetor rotacionado entra no Q/K da atenção.',
        xCoordLabel: "X'",
        yCoordLabel: "Y'",
        angleLabel: 'Ângulo',
        cosLabel: 'cos(mθ)',
        sinLabel: 'sin(mθ)',
        ropeLabel: 'RoPE',
        sinusoidalLabel: 'Sinusoidal',
        attentionLabel: 'Score Atenção',
        distanceLabel: 'Distância',
        dimPairLabel: 'Par de Dim.',
        thetaLabel: 'θ_i',
        freqLabel: 'Freq',
        ropeScoreLabel: 'RoPE',
        sinusoidalScoreLabel: 'Sinusoidal',
        ropeDegradationLabel: 'Degradação',
        usePresetLabel: 'Embeddings Preset',
        customEmbeddingLabel: 'Custom',
        applyLabel: 'Aplicar',
      },
      'en-us': {
        title: 'RoPE Explorer',
        subtitle: '2D rotation computed in real-time',
        embeddingLabel: 'Embedding',
        positionLabel: 'Position',
        dimLabel: 'Dimension',
        rotationTitle: '2D Rotation on Plane (dim 2i, 2i+1)',
        rotationFormula: "x' = x·cos(mθ) - y·sin(mθ), y' = x·sin(mθ) + y·cos(mθ)",
        freqTitle: 'Frequency Bands by Dimension Pair',
        freqSubtitle: 'Low dims = high frequency (local). High dims = low frequency (global).',
        freqFormula: 'θ_i = 10000^(-2i/d)',
        extrapolationTitle: 'Extrapolation: RoPE vs Sinusoidal',
        extrapolationSubtitle: 'Query at pos 512, Key varying beyond training',
        stepperTitle: 'RoPE Pipeline',
        stepFocusLabel: 'Focus',
        step1Label: 'Embedding',
        step1Body: 'Token converted to vector [x₀, x₁, ..., x_d].',
        step2Label: 'Angles',
        step2Body: 'Computes m·θ_i for each dimension pair.',
        step3Label: 'Rotation',
        step3Body: 'Applies 2D rotation to each independent pair.',
        step4Label: 'Output',
        step4Body: 'Rotated vector enters attention Q/K.',
        xCoordLabel: "X'",
        yCoordLabel: "Y'",
        angleLabel: 'Angle',
        cosLabel: 'cos(mθ)',
        sinLabel: 'sin(mθ)',
        ropeLabel: 'RoPE',
        sinusoidalLabel: 'Sinusoidal',
        attentionLabel: 'Attention Score',
        distanceLabel: 'Distance',
        dimPairLabel: 'Dim Pair',
        thetaLabel: 'θ_i',
        freqLabel: 'Freq',
        ropeScoreLabel: 'RoPE',
        sinusoidalScoreLabel: 'Sinusoidal',
        ropeDegradationLabel: 'Degradation',
        usePresetLabel: 'Preset Embeddings',
        customEmbeddingLabel: 'Custom',
        applyLabel: 'Apply',
      },
    },
  },
});
