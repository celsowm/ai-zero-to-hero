import { defineSlide } from './_factory';

export const pytorchSaveLoad = defineSlide({
  id: 'pytorch-save-load',
  type: 'two-column',
  options: { columnRatios: [0.52, 0.48] },
  content: {
    'pt-br': {
      title: 'Salvar e recarregar checkpoint',
      body: `Checkpoint nao e backup eventual. E contrato de continuidade de treino.

Estado minimo serio:
1. **pesos do modelo** (\`state_dict\`).
2. **estado do otimizador** (momento, acumuladores).
3. **passo/epoca atual** para retomar agenda de treino.

Sem estado do otimizador, voce "retoma" com outra dinamica de update.
Sem passo atual, metricas e scheduler ficam inconsistentes.

Objetivo: reiniciar o processo sem perder historico operacional.

Dois casos de uso:
- **inferencia**: salvar so pesos do modelo ja basta
- **retomada de treino**: salvar modelo + optimizer + passo`,
    },
    'en-us': {
      title: 'Save and reload a checkpoint',
      body: `Checkpointing is not occasional backup. It is a training continuity contract.

Minimum serious state:
1. **model weights** (\`state_dict\`).
2. **optimizer state** (momenta, accumulators).
3. **current step/epoch** to resume training schedule.

Without optimizer state, resume starts with different update dynamics.
Without step metadata, metrics and scheduler become inconsistent.

Goal: restart process without losing operational history.

Two use cases:
- **inference**: saving only model weights is enough
- **training resume**: save model + optimizer + step`,
    },
  },
  visual: {
    id: 'pytorch-dual-panel',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Payload' }],
        codePanel: {
          title: 'Checkpoint minimo',
          description: 'Exemplo curto de save/load com modelo, otimizador e passo.',
          source: { snippetId: 'pytorch-lm/save-load', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 5], content: 'Criamos modelo e otimizador para capturar estado completo de treino.' },
            { lineRange: [6, 10], content: 'Dicionario junta pesos, estado do otimizador e passo atual.' },
            { lineRange: [12, 14], content: '`torch.save` escreve arquivo e `torch.load` reconstrui em memoria.' },
          ],
        },
        visualPanel: {
          title: 'Minimo para inferencia vs treino',
          items: [
            { label: 'Inferencia', value: 'model/state_dict: suficiente para reproduzir o forward.' },
            { label: 'Treino completo', value: 'model + optimizer + step para retomar com a mesma dinamica.' },
            { label: 'step', value: 'Posicao no treino para log/scheduler/retomada correta.' },
            { label: 'arquivo .pt', value: 'Unidade de retomada e transferencia entre execucoes.' },
          ],
          footer: 'Regra: checkpoint bom permite retomar e obter curva de treino continua.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Payload' }],
        codePanel: {
          title: 'Minimal checkpoint',
          description: 'Short save/load example with model, optimizer, and step metadata.',
          source: { snippetId: 'pytorch-lm/save-load', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 5], content: 'We build model and optimizer so full training state can be serialized.' },
            { lineRange: [6, 10], content: 'Dictionary groups weights, optimizer internals, and current step.' },
            { lineRange: [12, 14], content: '`torch.save` writes file and `torch.load` reconstructs in memory.' },
          ],
        },
        visualPanel: {
          title: 'Minimum for inference vs training',
          items: [
            { label: 'Inference', value: 'model/state_dict: enough to reproduce the forward pass.' },
            { label: 'Full training', value: 'model + optimizer + step to resume with the same dynamics.' },
            { label: 'step', value: 'Training position for logging/scheduler/resume correctness.' },
            { label: 'file .pt', value: 'Resume and transfer unit across runs.' },
          ],
          footer: 'Rule: good checkpoint resumes with a continuous training curve.',
        },
      },
    },
  },
});
