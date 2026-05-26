import { defineSlide } from './_factory';

export const pytorchTensorRanks0d4d = defineSlide({
  id: 'pytorch-tensor-ranks-0d-4d',
  type: 'two-column',
  options: { columnRatios: [0.52, 0.48] },
  content: {
    'pt-br': {
      title: 'Progressão de tensor: 0D até 4D',
      body: `Se tensor, neste curso, é a estrutura multidimensional do PyTorch, a pergunta seguinte é inevitável: **como contar e interpretar os eixos dessa estrutura?**

Começo do contrato:
1. **Tensor não é só "uma caixa de números".** Ele organiza valores em eixos.
2. **Rank** é a contagem desses eixos.
3. **Shape** vem depois: ele registra o tamanho de cada eixo.

Então a progressão correta é esta:
1. **0D (escalar)**: nenhum eixo, apenas um número. Ex.: uma loss.
2. **1D (vetor)**: um eixo. Ex.: lista de valores ou embedding de um token.
3. **2D (matriz)**: dois eixos. Ex.: tabela ou sequência organizada em linhas e colunas.
4. **3D**: três eixos. Aqui começa a leitura que reaparece em modelos: lote, posição e conteúdo.
5. **4D**: quatro eixos. Ex.: batch de imagens \`(2, 3, 28, 28)\` — lote (2 imagens), canais (3: RGB), altura (28px), largura (28px). Os limites de cada eixo são: batch [0..1], canal [0..2], altura [0..27], largura [0..27].

Leitura mental certa:
- primeiro conte os eixos;
- depois nomeie o papel de cada um;
- só então leia o \`shape\` como a assinatura numérica desses papéis.

O próximo passo é usar essa leitura em um caso real: texto tokenizado virando tensor no PyTorch.

Ponte de critério: esse escalar 0D pode ser MSE (regressão) ou CE (classificação em LM).`,
    },
    'en-us': {
      title: 'Tensor progression: 0D to 4D',
      body: `If a tensor, in this course, is PyTorch's multidimensional structure, the next question is unavoidable: **how do we count and interpret that structure's axes?**

Start with the contract:
1. **A tensor is not just "a box of numbers".** It organizes values along axes.
2. **Rank** is the count of those axes.
3. **Shape** comes after that: it records the size of each axis.

So the correct progression is:
1. **0D (scalar)**: no axis, just one number. For example, a loss.
2. **1D (vector)**: one axis. For example, a value list or one token embedding.
3. **2D (matrix)**: two axes. For example, a table or a sequence arranged in rows and columns.
4. **3D**: three axes. This is where the reading that reappears in models begins: batch, position, and content.
5. **4D**: four axes. For example, a batch of images \`(2, 3, 28, 28)\` — batch (2 images), channels (3: RGB), height (28px), width (28px). Axis limits: batch [0..1], channel [0..2], height [0..27], width [0..27].

Correct mental reading:
- first count the axes;
- then name the role of each axis;
- only then read the \`shape\` as the numeric signature of those roles.

The next step is to use that reading in a real case: tokenized text becoming a tensor in PyTorch.

Criterion bridge: that 0D scalar can be MSE (regression) or CE (LM classification).`,
    },
  },
  visual: {
    id: 'tensor-3d-explorer',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Código' }, { label: 'Explorador 3D' }],
        codePanel: {
          title: 'Do escalar ao tensor 4D em PyTorch',
          description: 'Exemplo curto para ligar numero de eixos, rank e shape antes de aplicar essa leitura em texto tokenizado.',
          source: { snippetId: 'neural-networks/tensor-origins', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 2], content: 'Importa PyTorch para criar tensores com ranks diferentes.' },
            { lineRange: [4, 5], content: 'Escalar: rank 0, sem eixos.' },
            { lineRange: [7, 8], content: 'Vetor: rank 1, um eixo com shape (4,).' },
            { lineRange: [10, 11], content: 'Matriz: rank 2, shape (3, 4) — três linhas, quatro colunas.' },
            { lineRange: [13, 14], content: 'Tensor 3D: rank 3, shape (2, 3, 4) — batch, posição e conteúdo.' },
            { lineRange: [16, 17], content: 'Tensor 4D: `batch = torch.randn(2, 3, 28, 28)`. Leitura operacional de limites: batch [0..1], canal [0..2], altura [0..27], largura [0..27].' },
            { lineRange: [19, 23], content: 'Exemplo explícito de `shape` em todos os ranks: 0D (`[]`), 1D (`[4]`), 2D (`[3, 4]`), 3D (`[2, 3, 4]`) e 4D (`[2, 3, 28, 28]`).' },
          ],
        },
        interactivePanel: {
          eyebrow: 'Eixos, rank e shape',
          title: 'Navegue nos ranks em 3D',
          description: 'Altere o rank e observe como a geometria muda no canvas. A leitura correta e: quantos eixos existem, o que cada eixo representa e so depois qual shape aparece.',
          shapeLabel: 'Shape atual',
          rankLabel: 'Rank atual',
          scalarLabel: 'Escalar',
          vectorLabel: 'Vetor',
          matrixLabel: 'Matriz',
          tensor3dLabel: 'Tensor 3D',
          tensor4dLabel: 'Tensor 4D',
          footer: 'Regra operacional: rank não é decoracao. Ele diz quantos eixos você precisa explicar para entender o tensor.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: '3D Explorer' }],
        codePanel: {
          title: 'From scalar to 4D tensor in PyTorch',
          description: 'Short example connecting axis count, rank, and shape before applying that reading to tokenized text.',
          source: { snippetId: 'neural-networks/tensor-origins', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 2], content: 'Imports PyTorch to create tensors at different ranks.' },
            { lineRange: [4, 5], content: 'Scalar: rank 0, no axes.' },
            { lineRange: [7, 8], content: 'Vector: rank 1, one axis with shape (4,).' },
            { lineRange: [10, 11], content: 'Matrix: rank 2, shape (3, 4) — three rows, four columns.' },
            { lineRange: [13, 14], content: '3D tensor: rank 3, shape (2, 3, 4) — batch, position, and content.' },
            { lineRange: [16, 17], content: '4D tensor: `batch = torch.randn(2, 3, 28, 28)`. Operational axis limits: batch [0..1], channel [0..2], height [0..27], width [0..27].' },
            { lineRange: [19, 23], content: 'Explicit `shape` readout across ranks: 0D (`[]`), 1D (`[4]`), 2D (`[3, 4]`), 3D (`[2, 3, 4]`), and 4D (`[2, 3, 28, 28]`).' },
          ],
        },
        interactivePanel: {
          eyebrow: 'Axes, rank, and shape',
          title: 'Explore tensor ranks in 3D',
          description: 'Switch rank and watch geometry change on canvas. The correct reading is: how many axes exist, what each axis means, and only then what shape appears.',
          shapeLabel: 'Current shape',
          rankLabel: 'Current rank',
          scalarLabel: 'Scalar',
          vectorLabel: 'Vector',
          matrixLabel: 'Matrix',
          tensor3dLabel: '3D tensor',
          tensor4dLabel: '4D tensor',
          footer: 'Operational rule: rank is not decoration. It tells you how many axes you must explain to understand the tensor.',
        },
      },
    },
  },
});
