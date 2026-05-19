import { defineSlide } from './_factory';

export const neuralNetworkPytorchPrediction = defineSlide({
  id: 'neural-network-pytorch-prediction',
  type: 'two-column',
  options: { columnRatios: [0.54, 0.46] },
  content: {
    'pt-br': {
      title: 'Inferência: eval, no_grad e próximo token',
      body: `Inferencia nao e "treino sem step". E outro modo de execucao.

Objetivos da inferencia:
- nao construir gradiente.
- nao manter dropout ativo.
- extrair decisao do ultimo passo temporal.

No fluxo autoregressivo:
1. roda forward no contexto atual.
2. pega \`logits[:, -1, :]\`.
3. escolhe proximo token (argmax ou sampling).
4. concatena e repete.

Se voce esquecer \`eval()\` e \`no_grad()\`, desempenho cai e saida fica menos estavel.`,
    },
    'en-us': {
      title: 'Inference: eval, no_grad, and next token',
      body: `Inference is not "training without step". It is a different execution mode.

Inference goals:
- avoid graph construction.
- disable training-time stochastic behavior.
- extract decision from the last time step.

In autoregressive flow:
1. run forward on current context.
2. take \`logits[:, -1, :]\`.
3. pick next token (argmax or sampling).
4. append and repeat.

If you forget \`eval()\` and \`no_grad()\`, performance drops and outputs become less stable.`,
    },
  },
  visual: {
    id: 'pytorch-dual-panel',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Passos' }],
        codePanel: {
          title: 'Ritual de inferencia',
          description: 'Snippet curto para fixar a troca train -> eval e uso de no_grad.',
          source: { snippetId: 'pytorch-lm/model-lifecycle', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 4], content: 'Modelo simples para demonstrar comportamento de inferencia.' },
            { lineRange: [5, 8], content: 'Treino e inferencia podem receber mesmo input, mas comportamento interno muda.' },
            { lineRange: [9, 14], content: '`eval()` e `no_grad()` formam o par padrao para previsao/geracao.' },
          ],
        },
        visualPanel: {
          title: 'Passos de geracao',
          items: [
            { label: 'Contexto', value: 'Entrada atual com shape (B,T).' },
            { label: 'Forward', value: 'Produz logits para cada posicao do contexto.' },
            { label: 'Ultimo passo', value: 'Usa apenas a linha temporal final para decidir proximo token.' },
            { label: 'Loop', value: 'Concatena token novo e repete ate condicao de parada.' },
          ],
          footer: 'Padrao mental: treino usa todas posicoes; inferencia decide uma posicao por vez.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Steps' }],
        codePanel: {
          title: 'Inference ritual',
          description: 'Short snippet to lock in train -> eval switch and no_grad usage.',
          source: { snippetId: 'pytorch-lm/model-lifecycle', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 4], content: 'Tiny model to expose inference behavior.' },
            { lineRange: [5, 8], content: 'Training and inference may share input while internal behavior differs.' },
            { lineRange: [9, 14], content: '`eval()` and `no_grad()` are the default pair for prediction/generation.' },
          ],
        },
        visualPanel: {
          title: 'Generation steps',
          items: [
            { label: 'Context', value: 'Current input with shape (B,T).' },
            { label: 'Forward', value: 'Produces logits for each context position.' },
            { label: 'Last step', value: 'Use final time index only to decide next token.' },
            { label: 'Loop', value: 'Append token and repeat until stop condition.' },
          ],
          footer: 'Mental model: training consumes all positions; inference decides one position at a time.',
        },
      },
    },
  },
});
