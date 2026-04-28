import { defineSlide } from './_factory';

export const ragVectorSearch = defineSlide({
  id: 'rag-vector-search',
  type: 'two-column',
  options: {
    "columnRatios": [0.5, 0.5]
  },
  content: {
    'pt-br': {
      title: `Busca Vetorial: Cosine Similarity`,
      body: `A busca no RAG não é por **palavras-chave** — é por **significado**. Usamos **cosine similarity** para medir o ângulo entre vetores.

### Cosine Similarity

Mede o cosseno do ângulo entre dois vetores:
- **1.0** = vetores idênticos (mesmo significado)
- **0.0** = vetores ortogonais (significados não relacionados)
- **-1.0** = vetores opostos (significados contrários)

### Por que funciona?

Frases semanticamente similares, mesmo com palavras diferentes, produzem vetores com **ângulo pequeno** entre eles.

> *"Quem ganhou a Copa?"* e *"O Brasil venceu em 2002"* → cosine ~0.85
> *"Quem ganhou a Copa?"* e *"Python é uma linguagem"* → cosine ~0.02

### Vector Stores na prática

Para milhões de documentos, usamos **ANN (Approximate Nearest Neighbor)**:
- **FAISS** (Meta): busca rápida em GPU/CPU
- **ChromaDB**: simples, embeddado, bom para protótipos
- **Pinecone**: gerenciado, escala automaticamente

\`\`\`python
snippet:rag/rag-vector-search
\`\`\``,
    },
    'en-us': {
      title: `Vector Search: Cosine Similarity`,
      body: `RAG search isn't by **keywords** — it's by **meaning**. We use **cosine similarity** to measure the angle between vectors.

### Cosine Similarity

Measures the cosine of the angle between two vectors:
- **1.0** = identical vectors (same meaning)
- **0.0** = orthogonal vectors (unrelated meanings)
- **-1.0** = opposite vectors (opposite meanings)

### Why it works

Semantically similar sentences, even with different words, produce vectors with a **small angle** between them.

> *"Who won the Cup?"* and *"Brazil won in 2002"* → cosine ~0.85
> *"Who won the Cup?"* and *"Python is a language"* → cosine ~0.02

### Vector Stores in practice

For millions of documents, we use **ANN (Approximate Nearest Neighbor)**:
- **FAISS** (Meta): fast GPU/CPU search
- **ChromaDB**: simple, embedded, good for prototypes
- **Pinecone**: managed, auto-scales

\`\`\`python
snippet:rag/rag-vector-search
\`\`\``,
    },
  },
  visual: {
    id: 'rag-vector-search-visual',
    copy: {
      "pt-br": {
        "title": "Busca por Similaridade Semântica",
        "queryLabel": "Pergunta",
        "doc1Label": "Copa 2002",
        "doc2Label": "Python ML",
        "doc3Label": "Copa 1998",
        "doc4Label": "JavaScript",
        "scoreLabel": "Score",
        "rankLabel": "Rank"
      },
      "en-us": {
        "title": "Semantic Similarity Search",
        "queryLabel": "Query",
        "doc1Label": "World Cup 2002",
        "doc2Label": "Python ML",
        "doc3Label": "World Cup 1998",
        "doc4Label": "JavaScript",
        "scoreLabel": "Score",
        "rankLabel": "Rank"
      }
    },
  },
});
