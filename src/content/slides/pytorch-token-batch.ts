import { defineSlide } from './_factory';

export const pytorchTokenBatch = defineSlide({
  id: 'pytorch-token-batch',
  type: 'two-column',
  options: { columnRatios: [0.52, 0.48] },
  content: {
    'pt-br': {
      title: 'Texto tokenizado vira batch',
      body: `O modelo nunca recebe frases soltas. Ele recebe **lotes** de inteiros.

No treino de next-token prediction, quase sempre fazemos duas visões do mesmo batch:

1. **\`x\`**: tudo menos o último token
2. **\`y\`**: tudo menos o primeiro token`,
    },
    'en-us': {
      title: 'Tokenized text becomes a batch',
      body: `The model never receives loose sentences. It receives **batches** of integers.

In next-token training, we almost always build two views from the same batch:

1. **\`x\`**: everything except the last token
2. **\`y\`**: everything except the first token`,
    },
  },
  visual: {
    id: 'pytorch-dual-panel',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Fluxo' }],
        codePanel: {
          title: 'Batch com shift de target',
          description: 'Snippet minimo que mostra `idx`, `x` e `y` para treino de proximo token.',
          source: { snippetId: 'pytorch-lm/token-batch', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 6], content: 'Montamos sequencias tokenizadas para visualizar o formato do batch.' },
            { lineRange: [8, 10], content: '`idx`, `x` e `y` sao o mesmo batch visto em tres visoes.' },
            { lineRange: [12, 14], content: 'Os prints confirmam que o treino continua paralelo com targets deslocados.' },
          ],
        },
        visualPanel: {
          title: 'Leitura rapida do batch',
          subtitle: 'O mesmo tensor vira entrada e alvo com deslocamento temporal.',
          items: [
            { label: 'idx', value: '(B, T) bruto: IDs originais por posicao.' },
            { label: 'x', value: '(B, T-1): tokens usados como entrada.' },
            { label: 'y', value: '(B, T-1): proximo token esperado para cada posicao de x.' },
          ],
          footer: 'Regra: y e sempre x deslocado 1 passo a frente.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Flow' }],
        codePanel: {
          title: 'Batch with target shift',
          description: 'Minimal snippet showing `idx`, `x`, and `y` for next-token training.',
          source: { snippetId: 'pytorch-lm/token-batch', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 6], content: 'We build tokenized sequences to make batch shape explicit.' },
            { lineRange: [8, 10], content: '`idx`, `x`, and `y` are the same batch seen through three views.' },
            { lineRange: [12, 14], content: 'Prints confirm training stays parallel with shifted targets.' },
          ],
        },
        visualPanel: {
          title: 'Quick batch reading',
          subtitle: 'The same tensor becomes input and target through temporal shift.',
          items: [
            { label: 'idx', value: '(B, T) raw IDs at each position.' },
            { label: 'x', value: '(B, T-1): tokens used as model input.' },
            { label: 'y', value: '(B, T-1): expected next token for each x position.' },
          ],
          footer: 'Rule: y is always x shifted one step ahead.',
        },
      },
    },
  },
});
