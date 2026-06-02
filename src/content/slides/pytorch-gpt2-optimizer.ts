import { defineSlide } from './_factory';

export const pytorchGpt2Optimizer = defineSlide({
  id: 'pytorch-gpt2-optimizer',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Otimização do treino',
      body: `Depois de ter configuração, precisamos definir como os pesos serão atualizados.

O \`optimizer.py\` monta o AdamW separando parâmetros com decay e sem decay. Matrizes recebem regularização; bias e vetores de normalização não.

O \`scheduler.py\` calcula o learning rate a cada step. O treino começa com warmup e depois reduz o learning rate com curva cossenoidal.`,
    },
    'en-us': {
      title: 'Training optimization',
      body: `After configuration, we need to define how weights will be updated.

\`optimizer.py\` builds AdamW separating parameters with and without decay. Matrices receive regularization; bias and normalization vectors do not.

\`scheduler.py\` computes the learning rate at each step. Training starts with warmup and then decays the learning rate with a cosine curve.`,
    },
  },
  visual: {
    id: 'pytorch-dual-code',
    copy: {
      'pt-br': {
        tabs: [
          { label: 'optimizer.py' },
          { label: 'scheduler.py' },
        ],
        codePanels: [
          {
            title: 'build_adamw',
            description: 'Separa parâmetros com e sem weight decay para o AdamW.',
            source: { snippetId: 'pytorch_gpt2/optim-build', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 6], content: 'Docstring e imports: `torch` e `nn`.' },
              { lineRange: [8, 10], content: '`build_adamw`: recebe modelo, learning_rate e weight_decay. Inicializa listas `decay_params` e `no_decay_params`.' },
              { lineRange: [12, 18], content: 'Loop `named_parameters()`: filtra `requires_grad`, acumula ndim >= 2 em `decay_params` (matrizes de peso) e 1D em `no_decay_params` (bias, LayerNorm). Evita regularizar camadas de normalização.' },
              { lineRange: [20, 24], content: 'Monta dois grupos de parâmetros — um com weight_decay, outro sem — e instancia AdamW com learning_rate informado e betas (0.9, 0.95) seguindo a receita original do GPT-2.' },
            ],
          },
          {
            title: 'cosine_lr',
            description: 'Calcula o learning rate com warmup linear e decaimento cossenoidal.',
            source: { snippetId: 'pytorch_gpt2/scheduler', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 7], content: 'Importa `math` para cosseno. A função `cosine_lr` calcula o LR no step atual com warmup linear + decaimento cossenoidal.' },
              { lineRange: [8, 17], content: 'Warmup (`step < warmup_steps`): LR cresce linearmente de 0 até `max_lr`. O `max(1, warmup_steps)` evita divisão por zero.' },
              { lineRange: [19, 26], content: 'Decaimento cossenoidal: LR segue `0.5 * (1 + cos(pi * progress))`. Suave no início/fim, acelera no meio. Após `max_steps`, mantém `min_lr_ratio` do LR máximo.' },
            ],
          },
        ],
      },
      'en-us': {
        tabs: [
          { label: 'optimizer.py' },
          { label: 'scheduler.py' },
        ],
        codePanels: [
          {
            title: 'build_adamw',
            description: 'Separates parameters with and without weight decay for AdamW.',
            source: { snippetId: 'pytorch_gpt2/optim-build', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 6], content: 'Docstring and imports: `torch` and `nn`.' },
              { lineRange: [8, 10], content: '`build_adamw`: receives model, learning_rate, weight_decay. Initializes `decay_params` and `no_decay_params` lists.' },
              { lineRange: [12, 18], content: '`named_parameters()` loop: filters `requires_grad`, appends ndim >= 2 to `decay_params` (weight matrices) and 1D to `no_decay_params` (bias, LayerNorm). Skips regularizing normalization layers.' },
              { lineRange: [20, 24], content: 'Creates two param groups — one with weight_decay, one without — and instantiates AdamW with given learning_rate and betas (0.9, 0.95) following the original GPT-2 recipe.' },
            ],
          },
          {
            title: 'cosine_lr',
            description: 'Computes learning rate with linear warmup and cosine decay.',
            source: { snippetId: 'pytorch_gpt2/scheduler', language: 'python' },
            codeExplanations: [
              { lineRange: [1, 7], content: 'Imports `math` for cosine. `cosine_lr` computes LR at current step with linear warmup + cosine decay.' },
              { lineRange: [8, 17], content: 'Warmup (`step < warmup_steps`): LR grows linearly from 0 to `max_lr`. `max(1, warmup_steps)` avoids division by zero.' },
              { lineRange: [19, 26], content: 'Cosine decay: LR follows `0.5 * (1 + cos(pi * progress))`. Gentle at start/end, faster in middle. Past `max_steps`, holds at `min_lr_ratio` of max LR.' },
            ],
          },
        ],
      },
    },
  },
});

