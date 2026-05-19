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
    id: 'pytorch-decision-matrix',
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
        matrixPanel: {
          title: 'Minimo para inferencia vs treino',
          subtitle: 'Checkpoint bom não é arquivo “salvo”. É payload suficiente para reproduzir o comportamento certo no contexto certo.',
          columns: ['O que precisa', 'O que garante', 'O que quebra se faltar'],
          callouts: [
            { label: 'Inferência', value: 'Para reproduzir forward, `state_dict` do modelo já costuma bastar.' },
            { label: 'Retomada de treino', value: 'Para continuar a mesma curva, você precisa modelo + optimizer + passo/época.' },
          ],
          rows: [
            { label: 'Pesos do modelo', cells: ['`model.state_dict()`', 'Reconstruir a função que gera logits.', 'Você nem reproduz a inferência corretamente.'] },
            { label: 'Estado do optimizer', cells: ['Momentos, acumuladores e buffers internos.', 'Retomar a mesma dinâmica de update.', 'A curva volta com outra inércia e outro comportamento.'] },
            { label: 'Passo/época', cells: ['Metadado operacional do treino.', 'Scheduler, log e retomada coerentes.', 'Métricas e agenda ficam desalinhadas.'] },
            { label: 'Arquivo `.pt`', cells: ['Container de serialização do payload.', 'Transferência entre execuções e máquinas.', 'Você salva pedaços desconectados e depois não recompõe o estado real.'] },
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
        matrixPanel: {
          title: 'Minimum for inference vs training',
          subtitle: 'A good checkpoint is not merely “a saved file”. It is enough payload to reproduce the right behavior in the right context.',
          columns: ['What is needed', 'What it guarantees', 'What breaks if missing'],
          callouts: [
            { label: 'Inference', value: 'To reproduce forward behavior, model `state_dict` is often enough.' },
            { label: 'Training resume', value: 'To continue the same curve, you need model + optimizer + step/epoch metadata.' },
          ],
          rows: [
            { label: 'Model weights', cells: ['`model.state_dict()`', 'Reconstruct the function that generates logits.', 'You cannot even reproduce inference correctly.'] },
            { label: 'Optimizer state', cells: ['Moments, accumulators, and internal buffers.', 'Resume the same update dynamics.', 'The curve restarts with different inertia and behavior.'] },
            { label: 'Step/epoch', cells: ['Operational training metadata.', 'Consistent scheduler, logging, and resume behavior.', 'Metrics and schedule drift out of alignment.'] },
            { label: '`.pt` file', cells: ['Serialization container for the payload.', 'Transfer across runs and machines.', 'You save disconnected pieces and fail to reconstruct the real state.'] },
          ],
          footer: 'Rule: a good checkpoint lets training resume with a continuous curve.',
        },
      },
    },
  },
});
