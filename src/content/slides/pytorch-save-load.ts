import { defineSlide } from './_factory';

export const pytorchSaveLoad = defineSlide({
  id: 'pytorch-save-load',
  type: 'two-column',
  options: { columnRatios: [0.52, 0.48] },
  content: {
    'pt-br': {
      title: 'Salvar e recarregar checkpoint',
      body: `Quando o treino demora, checkpoint não é detalhe: é parte do fluxo.

O mínimo útil para retomar trabalho depois é:

1. pesos do modelo
2. estado do otimizador
3. passo atual`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/save-load
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'Criamos modelo e otimizador para capturar pesos e estado do treino no mesmo payload.' },
        { lineRange: [6, 10], content: 'O dicionário do checkpoint junta tudo o que precisamos para continuar depois.' },
        { lineRange: [12, 14], content: '`torch.save` grava o arquivo e `torch.load` reconstrói o conteúdo em memória.' },
      ],
    },
    'en-us': {
      title: 'Save and reload a checkpoint',
      body: `When training takes time, checkpointing is not an extra. It is part of the workflow.

The minimum useful state for resuming later is:

1. model weights
2. optimizer state
3. current step`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/save-load
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'We create a model and optimizer so weights and training state live in the same payload.' },
        { lineRange: [6, 10], content: 'The checkpoint dictionary groups everything needed to continue later.' },
        { lineRange: [12, 14], content: '`torch.save` writes the file and `torch.load` reconstructs its contents in memory.' },
      ],
    },
  },
});
