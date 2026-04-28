import { defineSlide } from './_factory';

export const ragEmbeddingModel = defineSlide({
  id: 'rag-embedding-model',
  type: 'two-column',
  options: {
    "columnRatios": [0.5, 0.5]
  },
  content: {
    'pt-br': {
      title: `Como Documentos Viram Vetores`,
      body: `O coração do RAG é o **embedding model** — uma rede neural que transforma texto em vetores numéricos.

### O que é um embedding?

Um embedding é um **vetor denso** (ex: 384 números) que captura o **significado semântico** do texto. Frases com significado similar ficam **próximas no espaço vetorial**.

### Exemplo intuitivo

- *"O gato dormiu no sofá"* → vetor [0.82, -0.15, 0.43, ...]
- *"O felino descansou no móvel"* → vetor [0.79, -0.12, 0.41, ...]
- *"A receita de bolo de chocolate"* → vetor [-0.31, 0.67, -0.22, ...]

Os dois primeiros vetores são **próximos** (significados similares). O terceiro é **distante** (domínio diferente).

### Modelos populares

- **all-MiniLM-L6-v2**: 384 dimensões, rápido, bom para maioria dos casos
- **text-embedding-3-small** (OpenAI): 1536 dimensões, mais preciso
- **bge-large**: 1024 dimensões, excelente para RAG

\`\`\`python
snippet:rag/rag-embedding-model
\`\`\``,
    },
    'en-us': {
      title: `How Documents Become Vectors`,
      body: `The heart of RAG is the **embedding model** — a neural network that transforms text into numerical vectors.

### What is an embedding?

An embedding is a **dense vector** (e.g., 384 numbers) that captures the **semantic meaning** of text. Sentences with similar meaning are **close in vector space**.

### Intuitive example

- *"The cat slept on the couch"* → vector [0.82, -0.15, 0.43, ...]
- *"The feline rested on the furniture"* → vector [0.79, -0.12, 0.41, ...]
- *"Chocolate cake recipe"* → vector [-0.31, 0.67, -0.22, ...]

The first two vectors are **close** (similar meanings). The third is **far** (different domain).

### Popular models

- **all-MiniLM-L6-v2**: 384 dimensions, fast, good for most cases
- **text-embedding-3-small** (OpenAI): 1536 dimensions, more accurate
- **bge-large**: 1024 dimensions, excellent for RAG

\`\`\`python
snippet:rag/rag-embedding-model
\`\`\``,
    },
  },
  visual: {
    id: 'rag-embedding-visual',
    copy: {
      "pt-br": {
        "title": "Espaço Semântico de Documentos",
        "doc1Label": "Copa 2022",
        "doc2Label": "Python ML",
        "doc3Label": "Rio Amazonas",
        "doc4Label": "Revolução Francesa",
        "queryLabel": "Sua Pergunta",
        "similarLabel": "Semanticamente próximos",
        "dissimilarLabel": "Semanticamente distantes",
        "embeddingDim": "384 dimensões"
      },
      "en-us": {
        "title": "Semantic Space of Documents",
        "doc1Label": "World Cup 2022",
        "doc2Label": "Python ML",
        "doc3Label": "Amazon River",
        "doc4Label": "French Revolution",
        "queryLabel": "Your Query",
        "similarLabel": "Semantically close",
        "dissimilarLabel": "Semantically distant",
        "embeddingDim": "384 dimensions"
      }
    },
  },
});
