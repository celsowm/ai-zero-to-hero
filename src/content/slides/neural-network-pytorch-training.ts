import { defineSlide } from './_factory';

export const neuralNetworkPytorchTraining = defineSlide({
  id: 'neural-network-pytorch-training',
  type: 'two-column',
  options: { columnRatios: [0.54, 0.46] },
  content: {
    'pt-br': {
      title: 'Loop de treino para next-token',
      body: `O loop de treino de um language model é o loop padrão do PyTorch, com uma diferença prática: o target é a sequência deslocada.

Checklist:

1. pegar \`x\` e \`y\`
2. chamar \`model(x, y)\`
3. zerar gradiente
4. fazer backward
5. atualizar pesos`,
    },
    'en-us': {
      title: 'Training loop for next-token prediction',
      body: `A language-model training loop is the standard PyTorch loop, with one practical twist: the target is the shifted sequence.

Checklist:

1. fetch \`x\` and \`y\`
2. call \`model(x, y)\`
3. zero gradients
4. run backward
5. update weights`,
    },
  },
  visual: {
    id: 'pytorch-dual-panel',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Checklist' }],
        codePanel: {
          title: 'Modelo minimo treinavel',
          description: 'Classe pequena com `Embedding`, `lm_head` e `forward(idx, targets)` que retorna logits e loss.',
          source: { snippetId: 'pytorch-lm/minimal-language-model', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 5], content: 'Importamos o necessario para um modelo minimo de linguagem com perda.' },
            { lineRange: [6, 10], content: 'Embedding e `lm_head` ja montam um LM treinavel.' },
            { lineRange: [11, 14], content: 'O `forward` recebe IDs, produz logits e opcionalmente devolve loss.' },
          ],
        },
        visualPanel: {
          title: 'Ordem do loop de treino',
          subtitle: 'A ordem importa para evitar gradiente acumulado e update errado.',
          items: [
            { label: '1. Forward', value: 'roda `model(x, y)` e coleta logits/loss.' },
            { label: '2. zero_grad', value: 'limpa gradiente antigo antes do backward atual.' },
            { label: '3. backward', value: 'propaga erro da loss para os parametros.' },
            { label: '4. step', value: 'otimizador atualiza pesos com base no gradiente.' },
          ],
          footer: 'Diagnostico rapido: loss nao cai -> verificar ordem do loop e se `targets` estao deslocados.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Checklist' }],
        codePanel: {
          title: 'Minimal trainable model',
          description: 'Small class with `Embedding`, `lm_head`, and `forward(idx, targets)` returning logits and loss.',
          source: { snippetId: 'pytorch-lm/minimal-language-model', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 5], content: 'We import what is needed for a tiny language model with loss.' },
            { lineRange: [6, 10], content: 'Embedding and `lm_head` are enough to build a trainable LM.' },
            { lineRange: [11, 14], content: '`forward` receives IDs, produces logits, and optionally returns loss.' },
          ],
        },
        visualPanel: {
          title: 'Training-loop order',
          subtitle: 'Order matters to avoid stale gradients and wrong updates.',
          items: [
            { label: '1. Forward', value: 'run `model(x, y)` and collect logits/loss.' },
            { label: '2. zero_grad', value: 'clear previous gradients before current backward.' },
            { label: '3. backward', value: 'propagate loss error into parameters.' },
            { label: '4. step', value: 'optimizer updates weights using gradients.' },
          ],
          footer: 'Quick diagnosis: loss not decreasing -> check loop order and shifted targets.',
        },
      },
    },
  },
});
