import { defineSlide } from './_factory';

export const pytorchMinimalLanguageModel = defineSlide({
  id: 'pytorch-minimal-language-model',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Mini language model em PyTorch',
      body: `Este e o menor modelo que ja cumpre o contrato completo de LM.

Componentes minimos:
- \`Embedding\`: IDs -> vetores.
- \`lm_head\`: vetores -> logits de vocabulario.
- \`forward(idx, targets)\`: caminho unico para treino e inferencia.
- \`cross_entropy\`: criterio de erro quando ha target.

Leitura importante:
- sem \`targets\`: usamos para inferencia.
- com \`targets\`: devolve loss para treino.

Se essa classe estiver clara, os modelos grandes sao "a mesma classe, so com corpo interno maior".

Limites deste modelo didatico:
- nao tem atencao
- nao tem contexto longo sofisticado
- nao representa uma arquitetura de producao`,
    },
    'en-us': {
      title: 'A minimal PyTorch language model',
      body: `This is the smallest model that still satisfies the full LM contract.

Minimum components:
- \`Embedding\`: IDs -> vectors.
- \`lm_head\`: vectors -> vocabulary logits.
- \`forward(idx, targets)\`: single path for training and inference.
- \`cross_entropy\`: error criterion when targets exist.

Critical reading:
- without \`targets\`: inference mode.
- with \`targets\`: returns loss for training.

Once this class is clear, larger models are "the same contract with a larger internal body".

Limits of this teaching model:
- no attention
- no sophisticated long-context handling
- not a production architecture`,
    },
  },
  visual: {
    id: 'pytorch-dual-panel',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Contrato' }],
        codePanel: {
          title: 'Classe minima de LM',
          description: 'Implementacao enxuta que ja suporta inferencia e treino com a mesma assinatura.',
          source: { snippetId: 'pytorch-lm/minimal-language-model', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 5], content: 'Imports minimos e declaracao de classe com contrato de LM.' },
            { lineRange: [6, 10], content: 'Estado da classe: embedding de entrada e cabeca final de logits.' },
            { lineRange: [11, 14], content: 'Forward retorna logits sempre e loss opcional quando targets existem.' },
          ],
        },
        visualPanel: {
          title: 'Contrato e limites',
          items: [
            { label: 'Entrada', value: '`idx (B,T)` sempre obrigatorio.' },
            { label: 'Targets opcionais', value: 'Quando presentes, ativam caminho de loss.' },
            { label: 'Saida 1', value: 'Logits `(B,T,V)` para todas as posicoes.' },
            { label: 'Saida 2', value: 'Loss escalar para backward (apenas no treino).' },
            { label: 'O que falta para virar GPT', value: 'atencao, posicao, blocos repetidos e um corpo interno muito mais expressivo.' },
          ],
          footer: 'Esse contrato reaparece em GPTs maiores com o mesmo principio.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Contract' }],
        codePanel: {
          title: 'Minimal LM class',
          description: 'Lean implementation that already supports inference and training under one signature.',
          source: { snippetId: 'pytorch-lm/minimal-language-model', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 5], content: 'Minimal imports and class declaration with LM contract.' },
            { lineRange: [6, 10], content: 'Class state: input embedding plus final logits head.' },
            { lineRange: [11, 14], content: 'Forward always returns logits and optional loss when targets exist.' },
          ],
        },
        visualPanel: {
          title: 'Contract and limits',
          items: [
            { label: 'Input', value: '`idx (B,T)` is always required.' },
            { label: 'Optional targets', value: 'When present, they enable the loss path.' },
            { label: 'Output 1', value: 'Logits `(B,T,V)` for all positions.' },
            { label: 'Output 2', value: 'Scalar loss for backward (training only).' },
            { label: 'What is missing for GPT', value: 'attention, positions, repeated blocks, and a much richer internal body.' },
          ],
          footer: 'The same contract reappears in larger GPT variants.',
        },
      },
    },
  },
});
