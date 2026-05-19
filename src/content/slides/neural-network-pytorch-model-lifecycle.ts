import { defineSlide } from './_factory';

export const neuralNetworkPytorchModelLifecycle = defineSlide({
  id: 'neural-network-pytorch-model-lifecycle',
  type: 'two-column',
  options: { columnRatios: [0.52, 0.48] },
  content: {
    'pt-br': {
      title: 'Ciclo de vida do modelo',
      body: `Todo projeto serio com PyTorch alterna modos de execucao. Se isso ficar confuso, o comportamento parece "aleatorio".

Contrato de ciclo de vida:
1. **\`model.train()\`**: ativa comportamento de treino (ex: dropout).
2. **\`model.eval()\`**: congela comportamento estocastico para inferencia.
3. **\`torch.no_grad()\`**: desliga grafo para economizar memoria e tempo.
4. **checkpoint**: persiste estado para retomar exatamente de onde parou.

Erro recorrente:
- avaliar sem \`eval()\` e culpar "instabilidade do modelo".
- inferir sem \`no_grad()\` e gastar memoria sem necessidade.`,
    },
    'en-us': {
      title: 'Model lifecycle',
      body: `Every serious PyTorch project alternates execution modes. If this is fuzzy, behavior feels random.

Lifecycle contract:
1. **\`model.train()\`**: enables training behavior (for example dropout).
2. **\`model.eval()\`**: freezes stochastic behavior for inference.
3. **\`torch.no_grad()\`**: disables graph building to save memory and time.
4. **checkpointing**: persists state to resume exactly where you stopped.

Recurring mistakes:
- evaluating without \`eval()\` then blaming model instability.
- inferring without \`no_grad()\` and wasting memory.`,
    },
  },
  visual: {
    id: 'pytorch-dual-panel',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Estados' }],
        codePanel: {
          title: 'Mudanca de modo em codigo',
          description: 'Mesmo modelo, dois comportamentos: treino com ruido e inferencia estavel.',
          source: { snippetId: 'pytorch-lm/model-lifecycle', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 4], content: 'Modelo pequeno com Dropout para tornar visivel a diferenca train/eval.' },
            { lineRange: [5, 8], content: 'Em treino, o forward pode injetar ruido.' },
            { lineRange: [9, 14], content: 'Em avaliacao, com no_grad, inferencia fica estavel e barata.' },
          ],
        },
        visualPanel: {
          title: 'Tabela de estados',
          items: [
            { label: 'train + grad', value: 'Usar durante ajuste de peso.' },
            { label: 'eval + no_grad', value: 'Usar para medicao/inferencia.' },
            { label: 'checkpoint save', value: 'Salvar peso + estado de treino.' },
            { label: 'checkpoint load', value: 'Retomar sem perder progresso.' },
          ],
          footer: 'Se o resultado muda sem motivo entre duas inferencias, cheque modo do modelo primeiro.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'States' }],
        codePanel: {
          title: 'Mode switching in code',
          description: 'Same model, two behaviors: noisy training and stable inference.',
          source: { snippetId: 'pytorch-lm/model-lifecycle', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 4], content: 'Tiny model with Dropout to make train/eval difference visible.' },
            { lineRange: [5, 8], content: 'In training mode, forward may inject noise.' },
            { lineRange: [9, 14], content: 'In eval mode with no_grad, inference is stable and cheaper.' },
          ],
        },
        visualPanel: {
          title: 'State table',
          items: [
            { label: 'train + grad', value: 'Use while updating weights.' },
            { label: 'eval + no_grad', value: 'Use for evaluation/inference.' },
            { label: 'checkpoint save', value: 'Save weights plus training state.' },
            { label: 'checkpoint load', value: 'Resume without losing progress.' },
          ],
          footer: 'If output changes unexpectedly between inferences, check model mode first.',
        },
      },
    },
  },
});
