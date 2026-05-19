import { defineSlide } from './_factory';

export const pytorchTensorRanks0d4d = defineSlide({
  id: 'pytorch-tensor-ranks-0d-4d',
  type: 'two-column',
  options: { columnRatios: [0.52, 0.48] },
  content: {
    'pt-br': {
      title: 'Progressão de tensor: 0D até 4D',
      body: `Antes das siglas de modelagem de linguagem, vale fixar o chão: **dimensão é só número de eixos**.

Leitura prática:
1. **0D (escalar)**: um número (ex.: uma loss).
2. **1D (vetor)**: uma lista (ex.: embedding de um token).
3. **2D (matriz)**: tabela (ex.: sequência de IDs).
4. **3D**: lote de sequências vetorizadas.
5. **4D**: eixo extra de grupos/canais (muito comum em visão, também útil para pensar batching mais rico).

Objetivo deste slide: quando você olhar um \`shape\`, bater o olho e saber "quantos eixos tenho e o que cada eixo representa".`,
    },
    'en-us': {
      title: 'Tensor progression: 0D to 4D',
      body: `Before language-model abbreviations, lock the basics: **dimension is just axis count**.

Practical reading:
1. **0D (scalar)**: one number (for example, a loss).
2. **1D (vector)**: one list (for example, one token embedding).
3. **2D (matrix)**: one table (for example, token ID sequence).
4. **3D**: batch of vectorized sequences.
5. **4D**: extra group/channel axis (common in vision, also useful for richer batching intuition).

Goal of this slide: when you see a \`shape\`, immediately know how many axes exist and what each axis means.`,
    },
  },
  visual: {
    id: 'tensor-3d-explorer',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Código' }, { label: 'Explorador 3D' }],
        codePanel: {
          title: 'Do escalar ao tensor 4D em PyTorch',
          description: 'Exemplo curto para conectar rank e shape antes do bloco de language modeling.',
          source: { snippetId: 'neural-networks/tensor-origins', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 2], content: 'Importa PyTorch para criar tensores com ranks diferentes.' },
            { lineRange: [4, 5], content: 'Escalar: rank 0, sem eixos.' },
            { lineRange: [7, 8], content: 'Vetor: rank 1, um eixo.' },
            { lineRange: [10, 11], content: 'Matriz: rank 2, dois eixos.' },
            { lineRange: [13, 14], content: 'Tensor 4D: quatro eixos, útil para batches estruturados.' },
          ],
        },
        interactivePanel: {
          eyebrow: 'Rank e shape',
          title: 'Navegue nos ranks em 3D',
          description: 'Altere o rank e observe como a geometria muda no canvas. Em seguida leia shape e rank da seleção.',
          shapeLabel: 'Shape atual',
          rankLabel: 'Rank atual',
          scalarLabel: 'Escalar',
          vectorLabel: 'Vetor',
          matrixLabel: 'Matriz',
          tensor3dLabel: 'Tensor 3D',
          footer: 'Regra operacional: cada eixo novo adiciona um grau de organização dos dados.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: '3D Explorer' }],
        codePanel: {
          title: 'From scalar to 4D tensor in PyTorch',
          description: 'Short example connecting rank and shape before the language-modeling block.',
          source: { snippetId: 'neural-networks/tensor-origins', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 2], content: 'Imports PyTorch to create tensors at different ranks.' },
            { lineRange: [4, 5], content: 'Scalar: rank 0, no axes.' },
            { lineRange: [7, 8], content: 'Vector: rank 1, one axis.' },
            { lineRange: [10, 11], content: 'Matrix: rank 2, two axes.' },
            { lineRange: [13, 14], content: '4D tensor: four axes, useful for structured batching.' },
          ],
        },
        interactivePanel: {
          eyebrow: 'Rank and shape',
          title: 'Explore tensor ranks in 3D',
          description: 'Switch rank and watch geometry change on canvas, then read shape and rank for that state.',
          shapeLabel: 'Current shape',
          rankLabel: 'Current rank',
          scalarLabel: 'Scalar',
          vectorLabel: 'Vector',
          matrixLabel: 'Matrix',
          tensor3dLabel: '3D tensor',
          footer: 'Operational rule: each new axis adds one more level of data organization.',
        },
      },
    },
  },
});
