import { defineSlide } from './_factory';

export const neuralNetworkArchitecturesDeepDive = defineSlide({
  id: 'neural-network-architectures-deep-dive',
  type: 'custom',
  content: {
    'pt-br': {
      title: `Anatomia das Redes: MLP, CNN e Transformer`,
      body: ``,
    },
    'en-us': {
      title: `Network Anatomy: MLP, CNN, and Transformer`,
      body: ``,
    },
  },
  visual: {
    id: 'architecture-comparator',
    copy: {
      "pt-br": {
        "tabs": [
          {
          "label": "MLP",
          "title": "Multi-Layer Perceptron (Densa)",
          "description": "A arquitetura que construímos manualmente. Camadas totalmente conectadas onde cada neurônio processa a combinação de todas as entradas da camada anterior.",
          "diagramLabel": "Conexões Globais",
          "features": [
            "Dados Tabulares",
            "Conexão Total",
            "Somas Ponderadas"
          ],
          "source": {
            "snippetId": "architectures/mlp",
            "language": "python"
          },
          "codeExplanations": [
            {
            "lineRange": [
              1,
              4
            ],
            "content": "Definição das 'Features': aqui os dados tabulares (como idade e pressão) entram na rede."
          },
            {
            "lineRange": [
              6,
              13
            ],
            "content": "Os Parâmetros: pesos aprendidos que determinam a força de cada conexão."
          },
            {
            "lineRange": [
              16,
              23
            ],
            "content": "Lógica Densa: cada neurônio oculto processa TODAS as entradas da camada anterior."
          },
            {
            "lineRange": [
              20,
              20
            ],
            "content": "Produto Escalar: a soma ponderada que é a base de quase toda a IA."
          },
            {
            "lineRange": [
              22,
              22
            ],
            "content": "Função Sigmoid: garante que a saída seja um valor entre 0 e 1."
          }
          ]
        },
          {
          "label": "CNN",
          "title": "Rede Neural Convolucional",
          "description": "Focada em padrões locais. Em vez de olhar para a imagem inteira de uma vez, ela usa um 'filtro' que desliza buscando bordas e formas.",
          "diagramLabel": "Filtro Deslizante",
          "features": [
            "Imagens / Grades",
            "Padrões Locais",
            "Hierarquia Visual"
          ],
          "source": {
            "snippetId": "architectures/cnn",
            "language": "python"
          },
          "codeExplanations": [
            {
            "lineRange": [
              1,
              8
            ],
            "content": "Entrada de Imagem: uma grade 2D de pixels representando formas."
          },
            {
            "lineRange": [
              10,
              14
            ],
            "content": "O Kernel: um filtro pequeno (3x3) que 'procura' padrões específicos como bordas."
          },
            {
            "lineRange": [
              22,
              23
            ],
            "content": "Mecanismo Deslizante: o filtro percorre a imagem pixel por pixel."
          },
            {
            "lineRange": [
              25,
              29
            ],
            "content": "Convolução: cálculo local onde apenas os pixels vizinhos influenciam o resultado."
          }
          ]
        },
          {
          "label": "Transformer",
          "title": "Arquitetura de Atenção",
          "description": "O motor dos LLMs. Não usa filtros fixos; em vez disso, cada palavra calcula o quanto deve 'prestar atenção' nas outras para entender o contexto.",
          "diagramLabel": "Auto-Atenção",
          "features": [
            "Texto / Sequências",
            "Contexto Global",
            "Relações Dinâmicas"
          ],
          "source": {
            "snippetId": "architectures/transformer",
            "language": "python"
          },
          "codeExplanations": [
            {
            "lineRange": [
              1,
              7
            ],
            "content": "Embeddings: representação vetorial das palavras em um espaço semântico."
          },
            {
            "lineRange": [
              12,
              14
            ],
            "content": "Similaridade (Dot Product): o modelo compara as palavras para ver quais são relevantes."
          },
            {
            "lineRange": [
              17,
              19
            ],
            "content": "Pesos de Atenção: decide a importância relativa de cada palavra vizinha."
          },
            {
            "lineRange": [
              22,
              25
            ],
            "content": "Vetor de Contexto: a palavra original ganha um novo significado baseado em quem está ao redor."
          }
          ]
        }
        ],
        "footer": "Cada arquitetura resolve um desafio geométrico diferente dos dados."
      },
      "en-us": {
        "tabs": [
          {
          "label": "MLP",
          "title": "Multi-Layer Perceptron (Dense)",
          "description": "The architecture we built manually. Fully connected layers where each neuron processes the combination of all inputs from the previous layer.",
          "diagramLabel": "Global Connections",
          "features": [
            "Tabular Data",
            "Fully Connected",
            "Weighted Sums"
          ],
          "source": {
            "snippetId": "architectures/mlp",
            "language": "python"
          },
          "codeExplanations": [
            {
            "lineRange": [
              1,
              4
            ],
            "content": "Feature Definition: where tabular data (like age and pressure) enters the network."
          },
            {
            "lineRange": [
              6,
              13
            ],
            "content": "Parameters: learned weights that determine the strength of each connection."
          },
            {
            "lineRange": [
              16,
              23
            ],
            "content": "Dense Logic: every hidden neuron processes ALL inputs from the previous layer."
          },
            {
            "lineRange": [
              20,
              20
            ],
            "content": "Dot Product: the weighted sum that forms the foundation of almost all AI."
          },
            {
            "lineRange": [
              22,
              22
            ],
            "content": "Sigmoid Function: ensures the output is a value between 0 and 1."
          }
          ]
        },
          {
          "label": "CNN",
          "title": "Convolutional Neural Network",
          "description": "Focused on local patterns. Instead of looking at the entire image at once, it uses a sliding 'filter' to find edges and shapes.",
          "diagramLabel": "Sliding Filter",
          "features": [
            "Images / Grids",
            "Local Patterns",
            "Visual Hierarchy"
          ],
          "source": {
            "snippetId": "architectures/cnn",
            "language": "python"
          },
          "codeExplanations": [
            {
            "lineRange": [
              1,
              8
            ],
            "content": "Image Input: a 2D grid of pixels representing visual shapes."
          },
            {
            "lineRange": [
              10,
              14
            ],
            "content": "The Kernel: a small (3x3) filter that 'searches' for specific patterns like edges."
          },
            {
            "lineRange": [
              22,
              23
            ],
            "content": "Sliding Mechanism: the filter traverses the image pixel by pixel."
          },
            {
            "lineRange": [
              25,
              29
            ],
            "content": "Convolution: local computation where only neighboring pixels influence the result."
          }
          ]
        },
          {
          "label": "Transformer",
          "title": "Attention Architecture",
          "description": "The engine of LLMs. It doesn't use fixed filters; instead, each word calculates how much it should 'pay attention' to others to understand context.",
          "diagramLabel": "Self-Attention",
          "features": [
            "Text / Sequences",
            "Global Context",
            "Dynamic Relations"
          ],
          "source": {
            "snippetId": "architectures/transformer",
            "language": "python"
          },
          "codeExplanations": [
            {
            "lineRange": [
              1,
              7
            ],
            "content": "Embeddings: vector representation of words in a semantic space."
          },
            {
            "lineRange": [
              12,
              14
            ],
            "content": "Similarity (Dot Product): the model compares words to see which are relevant."
          },
            {
            "lineRange": [
              17,
              19
            ],
            "content": "Attention Weights: decides the relative importance of each neighboring word."
          },
            {
            "lineRange": [
              22,
              25
            ],
            "content": "Context Vector: the original word gains new meaning based on its surroundings."
          }
          ]
        }
        ],
        "footer": "Each architecture solves a different geometric challenge within the data."
      }
    },
  },
});
