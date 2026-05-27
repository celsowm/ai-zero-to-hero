import { defineSlide } from './_factory';

export const ragVectordb = defineSlide({
  id: 'rag-vectordb',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'VectorDB: onde a busca semântica mora',
      body: `Um **VectorDB** armazena embeddings e permite buscar vetores próximos rapidamente.

### No nosso bloco

Usaremos **ChromaDB** como banco vetorial principal porque ele é local, simples e bom para aprender o pipeline inteiro.

### Comparação rápida

| Opção | Melhor uso |
|---|---|
| ChromaDB | protótipo local e ensino |
| FAISS | índice vetorial embutido e performático |
| Pinecone | serviço gerenciado |
| Weaviate | vector DB com recursos de busca híbrida |

> O VectorDB não gera resposta. Ele só escolhe quais evidências merecem entrar no prompt.`,
    },
    'en-us': {
      title: 'VectorDB: where semantic search lives',
      body: `A **VectorDB** stores embeddings and lets us search nearby vectors quickly.

### In this block

We will use **ChromaDB** as the main vector database because it is local, simple, and good for learning the full pipeline.

### Quick comparison

| Option | Best use |
|---|---|
| ChromaDB | local prototypes and teaching |
| FAISS | embedded high-performance vector index |
| Pinecone | managed service |
| Weaviate | vector DB with hybrid search features |

> The VectorDB does not generate the answer. It only chooses which evidence deserves to enter the prompt.`,
    },
  },
  visual: {
    id: 'chromadb-index-visual',
    copy: {
      'pt-br': {
        title: 'Indexando chunks no ChromaDB',
        docLabel: 'Chunk',
        embedLabel: 'Embedding',
        dbLabel: 'ChromaDB',
        dimLabel: '384 dimensões',
        doc1: 'Reembolso...',
        doc2: 'Plano Pro...',
        doc3: 'Slack...',
        doc4: 'Faturamento...',
        addLabel: 'collection.add()',
        embedderLabel: 'Embedding model',
      },
      'en-us': {
        title: 'Indexing chunks in ChromaDB',
        docLabel: 'Chunk',
        embedLabel: 'Embedding',
        dbLabel: 'ChromaDB',
        dimLabel: '384 dimensions',
        doc1: 'Refund...',
        doc2: 'Pro plan...',
        doc3: 'Slack...',
        doc4: 'Billing...',
        addLabel: 'collection.add()',
        embedderLabel: 'Embedding model',
      },
    },
  },
});
