import { defineSlide } from './_factory';

export const tensorOrigins = defineSlide({
  id: 'tensor-origins',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.52,
      0.48
    ]
  },
  content: {
    'pt-br': {
      title: `Tensor: de onde vem esse nome?`,
      body: `No slide anterior, \`torch\` apareceu como o núcleo numérico do ecossistema. Agora falta responder: **o que exatamente é um tensor aqui?**

O nome **"tensor"** veio da física e da matemática, não do deep learning. A palavra vem do latim *tendere* ("esticar", "tensionar"), ligada historicamente a ideias de deformação e tensão.

O contraste que importa para o curso é este:
- na **física**, tensor é um objeto definido por como se transforma quando você muda de coordenadas;
- no **PyTorch**, "tensor" é a versão operacional do termo: um **array N-dimensional otimizado** para computação numérica.

Então a tradução útil para o aluno é:
- o nome veio de um contexto matemático mais pesado;
- mas aqui ele significa uma estrutura de dados multidimensional;
- e é essa estrutura que depois vamos ler por **eixos, rank e shape**.

> Regra de leitura para esta trilha: em PyTorch, pense em tensor como a caixa multidimensional que carrega números, roda operações vetorizadas e pode viver em CPU ou GPU.

---

### Exemplos em código
\`\`\`python
snippet:neural-networks/tensor-origins
\`\`\``,
      codeExplanations: [
        {
          "lineRange": [1, 2],
          "content": "Importamos o PyTorch — tudo aqui é tensor."
        },
        {
          "lineRange": [4, 5],
          "content": "Escalar (0D): um único número, como uma loss."
        },
        {
          "lineRange": [7, 8],
          "content": "Vetor (1D): um array com direção, como um embedding."
        },
        {
          "lineRange": [10, 11],
          "content": "Matriz (2D): uma tabela — o mais comum em redes neurais."
        },
        {
          "lineRange": [13, 15],
          "content": "Tensor 4D: batch de imagens [batch, canais, altura, largura]."
        },
        {
          "lineRange": [19, 23],
          "content": "Imprime os shapes explicitamente para conectar rank e assinatura: [], [4], [3, 4], [2, 3, 4] e [2, 3, 28, 28]."
        }
      ],
    },
    'en-us': {
      title: `Tensor: Where Does This Name Come From?`,
      body: `In the previous slide, \`torch\` appeared as the numeric core of the ecosystem. Now one question remains: **what exactly is a tensor in that world?**

The name **"tensor"** came from physics and mathematics, not deep learning. The word comes from Latin *tendere* ("to stretch", "to tense"), historically tied to deformation and tension ideas.

The contrast that matters here is:
- in **physics**, a tensor is defined by how it transforms under coordinate changes;
- in **PyTorch**, "tensor" is the operational version of the term: an **N-dimensional array optimized** for numerical computation.

So the useful translation for the learner is:
- the name came from a heavier mathematical context;
- but here it means a multidimensional data structure;
- and that is the structure we will soon read in terms of **axes, rank, and shape**.

> Reading rule for this track: in PyTorch, think of a tensor as the multidimensional box that carries numbers, runs vectorized operations, and can live on CPU or GPU.

---

### Code examples
\`\`\`python
snippet:neural-networks/tensor-origins
\`\`\``,
      codeExplanations: [
        {
          "lineRange": [1, 2],
          "content": "We import PyTorch — everything here is a tensor."
        },
        {
          "lineRange": [4, 5],
          "content": "Scalar (0D): a single number, like a loss."
        },
        {
          "lineRange": [7, 8],
          "content": "Vector (1D): an array with direction, like an embedding."
        },
        {
          "lineRange": [10, 11],
          "content": "Matrix (2D): a table — the most common in neural networks."
        },
        {
          "lineRange": [13, 15],
          "content": "4D tensor: image batch [batch, channels, height, width]."
        },
        {
          "lineRange": [19, 23],
          "content": "Prints shapes explicitly to connect rank with its signature: [], [4], [3, 4], [2, 3, 4], and [2, 3, 28, 28]."
        }
      ],
    },
  },
  visual: {
    id: 'tensor-origins-visual',
    copy: {
    'pt-br': {
        tabs: [
          { label: 'Física vs ML' },
          { label: 'Hierarquia Interativa' },
        ],
        physicsVsMl: {
          eyebrow: 'Origem do termo',
          title: 'Física vs Deep Learning',
          physicsTitle: '🌌 Física',
          physicsEquation: 'G_μν = 8πG/c⁴ · T_μν',
          physicsBody: 'Na relatividade geral, o tensor energia-momento (T_μν) descreve como matéria e energia curvam o espaço-tempo. Um tensor "de verdade" segue regras específicas de transformação quando você muda de coordenadas.',
          physicsLabels: {
            tensorName: 'T_μν — tensor energia-momento',
            tensorDesc: 'Descreve densidade de energia, fluxo de momento e pressão — tudo em uma estrutura 4×4 que se transforma corretamente sob mudanças de coordenadas.',
          },
          mlTitle: '🤖 PyTorch / ML',
          mlCode: 'x = torch.tensor([[1,2],[3,4]])',
          mlBody: 'No deep learning, "tensor" = array N-dimensional eficiente para computação numérica. O nome foi reaproveitado porque os dados são naturalmente multidimensionais e a implementação usa álgebra linear.',
          mlLabels: {
            tensorName: 'torch.tensor — array N-dimensional',
            tensorDesc: 'Estrutura de dados otimizada com suporte a GPU, autograd e operações vetorizadas. Não precisa seguir regras de transformação de coordenadas.',
          },
          bridgeLabel: 'Nome herdado da álgebra linear',
          takeaway: 'Para esta trilha, a conclusao importante e simples: no PyTorch, tensor e a estrutura multidimensional que depois vamos ler por eixos, rank e shape.',
        },
        hierarchy: {
          eyebrow: 'Hierarquia visual',
          title: 'De escalar a tensor 4D',
          description: 'Selecione um nível abaixo para ver como a dimensionalidade evolui — com exemplos da física e do deep learning.',
          sliderLabel: 'Nível de dimensão',
          dimensionLabel: 'Dimensão',
          shapeLabel: 'Shape (PyTorch)',
          physicsLabel: 'Exemplo na física',
          mlLabel: 'Exemplo no ML',
          footer: 'Ponte para o proximo slide: se tensor e uma estrutura multidimensional, a pergunta seguinte e como contar e interpretar seus eixos.',
        },
      },
      'en-us': {
        tabs: [
          { label: 'Physics vs ML' },
          { label: 'Interactive Hierarchy' },
        ],
        physicsVsMl: {
          eyebrow: 'Term origin',
          title: 'Physics vs Deep Learning',
          physicsTitle: '🌌 Physics',
          physicsEquation: 'G_μν = 8πG/c⁴ · T_μν',
          physicsBody: 'In general relativity, the energy-momentum tensor (T_μν) describes how matter and energy curve spacetime. A "real" tensor follows specific transformation rules when you change coordinates.',
          physicsLabels: {
            tensorName: 'T_μν — energy-momentum tensor',
            tensorDesc: 'Describes energy density, momentum flux, and pressure — all in a 4×4 structure that transforms correctly under coordinate changes.',
          },
          mlTitle: '🤖 PyTorch / ML',
          mlCode: 'x = torch.tensor([[1,2],[3,4]])',
          mlBody: 'In deep learning, "tensor" = efficient N-dimensional array for numerical computation. The name was repurposed because data is naturally multidimensional and the implementation uses linear algebra.',
          mlLabels: {
            tensorName: 'torch.tensor — N-dimensional array',
            tensorDesc: 'Optimized data structure with GPU support, autograd, and vectorized operations. Does not need to follow coordinate transformation rules.',
          },
          bridgeLabel: 'Name borrowed from linear algebra',
          takeaway: 'For this track, the important conclusion is simple: in PyTorch, a tensor is the multidimensional structure we will soon read through axes, rank, and shape.',
        },
        hierarchy: {
          eyebrow: 'Visual hierarchy',
          title: 'From scalar to 4D tensor',
          description: 'Select a level below to see how dimensionality evolves — with examples from physics and deep learning.',
          sliderLabel: 'Dimension level',
          dimensionLabel: 'Dimension',
          shapeLabel: 'Shape (PyTorch)',
          physicsLabel: 'Physics example',
          mlLabel: 'ML example',
          footer: 'Bridge to the next slide: if a tensor is multidimensional, the next question is how to count and interpret its axes.',
        },
      },
    },
  },
});
