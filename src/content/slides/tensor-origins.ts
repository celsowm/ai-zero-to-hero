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
      body: `O termo **"tensor"** veio da física e da matemática — não do deep learning. A palavra vem do latim *tendere* ("esticar", "tensionar"), usada no século XIX para descrever como forças deformam materiais.

### A hierarquia
Na matemática, tensores são uma **generalização** de objetos numéricos:
- **Escalar (0D):** um número isolado — ex: temperatura em um ponto (25°C)
- **Vetor (1D):** uma direção com magnitude — ex: velocidade [x, y, z]
- **Matriz (2D):** uma transformação linear — ex: tabela de pesos
- **Tensor (3D+):** relações entre múltiplas dimensões — ex: curvatura do espaço-tempo

### Física vs Deep Learning
Na **física**, o que define um tensor é como ele se **transforma** quando você muda o sistema de coordenadas. Na equação de Einstein, $G_{\mu\nu} = (8\pi G/c^4) \cdot T_{\mu\nu}$, o lado esquerdo descreve a curvatura do espaço-tempo e o lado direito ($T_{\mu\nu}$, o tensor energia-momento) descreve como matéria e energia se distribuem — independente de como você mede.

No **PyTorch**, "tensor" é mais simples: é um **array N-dimensional otimizado** para computação numérica. Não precisa seguir regras de transformação de coordenadas — só precisa ser rápido e rodar em GPU.

> **O nome vem da física, mas no PyTorch é uma estrutura N-dimensional que roda em GPU.**

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
        }
      ],
    },
    'en-us': {
      title: `Tensor: Where Does This Name Come From?`,
      body: `The term **"tensor"** came from physics and mathematics — not deep learning. The word comes from Latin *tendere* ("to stretch", "to tense"), used in the 19th century to describe how forces deform materials.

### The hierarchy
In mathematics, tensors are a **generalization** of numerical objects:
- **Scalar (0D):** a single number — e.g., temperature at a point (25°C)
- **Vector (1D):** a direction with magnitude — e.g., velocity [x, y, z]
- **Matrix (2D):** a linear transformation — e.g., weight table
- **Tensor (3D+):** relations between multiple dimensions — e.g., spacetime curvature

### Physics vs Deep Learning
In **physics**, what defines a tensor is how it **transforms** when you change the coordinate system. In Einstein's equation, $G_{\mu\nu} = (8\pi G/c^4) \cdot T_{\mu\nu}$, the left side describes spacetime curvature and the right side ($T_{\mu\nu}$, the energy-momentum tensor) describes how matter and energy are distributed — regardless of how you measure.

In **PyTorch**, "tensor" is simpler: it's an **N-dimensional array optimized** for numerical computation. It doesn't need to follow coordinate transformation rules — it just needs to be fast and run on GPU.

> **The name comes from physics, but in PyTorch it's an N-dimensional structure that runs on GPU.**

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
          takeaway: 'O nome "tensor" foi emprestado da física/matemática porque os dados são naturalmente multidimensionais e as operações usam álgebra linear — mas no ML, o foco é eficiência computacional, não transformação de coordenadas.',
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
          footer: 'No PyTorch, use .ndim ou .dim() para ver a dimensionalidade de um tensor. Cada dimensão adicional agrega uma "direção" de informação.',
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
          takeaway: 'The name "tensor" was borrowed from physics/math because data is naturally multidimensional and operations use linear algebra — but in ML, the focus is computational efficiency, not coordinate transformation.',
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
          footer: 'In PyTorch, use .ndim or .dim() to see a tensor\'s dimensionality. Each additional dimension adds a "direction" of information.',
        },
      },
    },
  },
});
