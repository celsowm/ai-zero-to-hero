import { defineSlide } from './_factory';

export const neuralNetworkPytorchPrediction = defineSlide({
  id: 'neural-network-pytorch-prediction',
  type: 'two-column',
  options: { columnRatios: [0.54, 0.46] },
  content: {
    'pt-br': {
      title: 'Inferência: eval, no_grad e próximo token',
      body: `Na inferência, a lógica muda pouco, mas a intenção muda bastante:

- não queremos gradientes
- não queremos dropout ativo
- queremos olhar para a última posição`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/model-lifecycle
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 4], content: 'Usamos um modelo simples só para fixar o ritual de inferência em PyTorch.' },
        { lineRange: [5, 8], content: 'Treino e inferência podem ter o mesmo input, mas não o mesmo comportamento interno.' },
        { lineRange: [9, 14], content: '`eval()` e `no_grad()` formam o par padrão para previsão e geração.' },
      ],
    },
    'en-us': {
      title: 'Inference: eval, no_grad, and next token',
      body: `At inference time, the logic changes only a little, but the intent changes a lot:

- we do not want gradients
- we do not want active dropout
- we want to inspect the last position`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/model-lifecycle
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 4], content: 'We use a tiny model just to freeze the standard PyTorch inference ritual.' },
        { lineRange: [5, 8], content: 'Training and inference may share the same input, but not the same internal behavior.' },
        { lineRange: [9, 14], content: '`eval()` and `no_grad()` are the standard pair for prediction and generation.' },
      ],
    },
  },
});
