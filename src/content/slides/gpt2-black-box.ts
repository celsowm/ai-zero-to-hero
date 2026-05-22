import { defineSlide } from './_factory';

export const gpt2BlackBox = defineSlide({
  id: 'gpt2-black-box',
  type: 'two-column',
  options: { columnRatios: [0.44, 0.56] },
  content: {
    'pt-br': {
      title: 'GPT-2 como contrato de tensores',
      body: `Agora paramos de falar em "modelo" como caixa mágica.

O GPT-2 pequeno é um decoder-only Transformer que preserva um contrato simples:

1. entra \`idx (B,T)\`: IDs inteiros de tokens
2. nasce \`x (B,T,C)\`: o residual stream
3. passam 12 blocos, mas o shape continua \`(B,T,C)\`
4. sai \`logits (B,T,V)\`: um placar para cada token do vocabulário
5. para gerar, usamos apenas \`logits[:, -1, :]\`

No nosso fio condutor, o contexto é \`We the people\`. A pergunta operacional é:

> depois desses tokens, qual próximo ID deve receber maior probabilidade?`,
    },
    'en-us': {
      title: 'GPT-2 as a tensor contract',
      body: `Now we stop treating "model" as a magic box.

Small GPT-2 is a decoder-only Transformer that preserves a simple contract:

1. \`idx (B,T)\` enters: integer token IDs
2. \`x (B,T,C)\` is born: the residual stream
3. 12 blocks run, but shape stays \`(B,T,C)\`
4. \`logits (B,T,V)\` comes out: one score for every vocabulary token
5. for generation, we use only \`logits[:, -1, :]\`

In our running thread, the context is \`We the people\`. The operational question is:

> after these tokens, which next ID should receive the highest probability?`,
    },
  },
  visual: {
    id: 'gpt2-blackbox-diagram',
    copy: {
      'pt-br': {
        title: 'Contrato externo',
        objectiveLabel: 'Objetivo',
        objective: 'prever o próximo token',
        inputLabel: 'entrada',
        inputShape: 'idx: (1, 3)',
        modelLabel: 'GPT-2 small',
        modelShape: '12 blocks · C=768',
        outputLabel: 'saída',
        outputShape: 'logits: (1, 3, 50257)',
        configTitle: 'Config mínima',
        configRows: [
          { label: 'B', value: '1 exemplo' },
          { label: 'T', value: '3 tokens' },
          { label: 'C', value: '768 dims' },
          { label: 'V', value: '50257 tokens' },
        ],
        topKTitle: 'Top-k ilustrativo',
        topK: [
          { token: ' of', probability: '42%' },
          { token: ' are', probability: '12%' },
          { token: ' have', probability: '8%' },
        ],
      },
      'en-us': {
        title: 'External contract',
        objectiveLabel: 'Objective',
        objective: 'predict the next token',
        inputLabel: 'input',
        inputShape: 'idx: (1, 3)',
        modelLabel: 'GPT-2 small',
        modelShape: '12 blocks · C=768',
        outputLabel: 'output',
        outputShape: 'logits: (1, 3, 50257)',
        configTitle: 'Minimal config',
        configRows: [
          { label: 'B', value: '1 example' },
          { label: 'T', value: '3 tokens' },
          { label: 'C', value: '768 dims' },
          { label: 'V', value: '50257 tokens' },
        ],
        topKTitle: 'Illustrative top-k',
        topK: [
          { token: ' of', probability: '42%' },
          { token: ' are', probability: '12%' },
          { token: ' have', probability: '8%' },
        ],
      },
    },
  },
});
