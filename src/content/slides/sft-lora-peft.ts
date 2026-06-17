import { defineSlide } from './_factory';

export const sftLoraPeft = defineSlide({
  id: 'sft-lora-peft',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'LoRA: aprender o delta',
      body: [
        'LoRA é uma técnica PEFT específica. Ela congela a matriz original `W0` e aprende duas matrizes pequenas que formam um delta low-rank.',
        '',
        'Na inferência, o peso efetivo se comporta como `W_eff = W0 + B × A`. A base continua igual; o adapter representa a mudança aprendida pelo SFT.',
        '',
        '```python',
        'snippet:sft_trl/lora-peft-config',
        '```',
        '',
        'No smoke real, LoRA treinou `12.779.520` parâmetros: `1,6701%` do total exposto pelo modelo com adapter.',
      ].join('\n'),
      codeExplanations: [
        { lineRange: [1, 1], content: '`peft` fornece a configuração LoRA.' },
        { lineRange: [3, 8], content: '`r`, `alpha`, dropout, bias e tarefa controlam capacidade e comportamento do adapter.' },
        { lineRange: [9, 17], content: 'Miramos projeções de atenção e MLP do Qwen, não o modelo inteiro.' },
        { lineRange: [20, 20], content: 'Imprimir a configuração torna o treino auditável.' },
      ],
    },
    'en-us': {
      title: 'LoRA: learning the delta',
      body: [
        'LoRA is a specific PEFT technique. It freezes the original matrix `W0` and learns two small matrices that form a low-rank delta.',
        '',
        'At inference time, the effective weight behaves like `W_eff = W0 + B × A`. The base stays the same; the adapter represents the change learned by SFT.',
        '',
        '```python',
        'snippet:sft_trl/lora-peft-config',
        '```',
        '',
        'In the real smoke, LoRA trained `12,779,520` parameters: `1.6701%` of the adapter-wrapped model total.',
      ].join('\n'),
      codeExplanations: [
        { lineRange: [1, 1], content: '`peft` provides the LoRA configuration.' },
        { lineRange: [3, 8], content: '`r`, `alpha`, dropout, bias, and task control adapter capacity and behavior.' },
        { lineRange: [9, 17], content: 'We target Qwen attention and MLP projections, not the whole model.' },
        { lineRange: [20, 20], content: 'Printing the configuration makes the training run auditable.' },
      ],
    },
  },
  visual: {
    id: 'lora-diagram',
    copy: {
      'pt-br': {
        title: 'LoRA: atualização low-rank',
        fullRankLabel: 'Peso completo',
        lowRankLabel: 'Delta B×A',
        matrixALabel: 'Matriz A',
        matrixBLabel: 'Matriz B',
        originalFrozen: 'W0 congelado',
        trainableParams: 'Parâmetros treináveis',
        savedMemory: 'Memória economizada',
        rankLabel: 'Rank',
      },
      'en-us': {
        title: 'LoRA: low-rank update',
        fullRankLabel: 'Full weight',
        lowRankLabel: 'Delta B×A',
        matrixALabel: 'Matrix A',
        matrixBLabel: 'Matrix B',
        originalFrozen: 'Frozen W0',
        trainableParams: 'Trainable params',
        savedMemory: 'Memory saved',
        rankLabel: 'Rank',
      },
    },
  },
});
