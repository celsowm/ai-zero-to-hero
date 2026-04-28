import { defineSlide } from './_factory';

export const langchainRagLangchain = defineSlide({
  id: 'langchain-rag-langchain',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'RAG com LangChain',
      body: `LangChain também faz RAG — de forma diferente do LlamaIndex, mas com o mesmo conceito fundamental.

### Ingest pipeline

\`\`\`python
snippet:langchain/rag-ingest
\`\`\`

### RetrievalQA Chain

\`\`\`python
snippet:langchain/retrieval-qa
\`\`\`

### Diferenças vs LlamaIndex

| Aspecto | LangChain | LlamaIndex |
|---|---|---|
| Foco | Orquestração geral | RAG especializado |
| Index | VectorStore genérico | VectorStoreIndex + otimizações |
| Retrievers | MultiQuery, ParentDoc | Vector, BM25, Router |
| Query Engines | RetrievalQA | QueryEngine, ChatEngine |

> LangChain RAG é mais **genérico**. LlamaIndex RAG é mais **refinado**.`,
    },
    'en-us': {
      title: 'RAG with LangChain',
      body: `LangChain also does RAG — differently from LlamaIndex, but with the same fundamental concept.

### Ingest pipeline

\`\`\`python
snippet:langchain/rag-ingest
\`\`\`

### RetrievalQA Chain

\`\`\`python
snippet:langchain/retrieval-qa
\`\`\`

### Differences vs LlamaIndex

| Aspect | LangChain | LlamaIndex |
|---|---|---|
| Focus | General orchestration | Specialized RAG |
| Index | Generic VectorStore | VectorStoreIndex + optimizations |
| Retrievers | MultiQuery, ParentDoc | Vector, BM25, Router |
| Query Engines | RetrievalQA | QueryEngine, ChatEngine |

> LangChain RAG is more **generic**. LlamaIndex RAG is more **refined**.`,
    },
  },
  visual: {
    id: 'langchain-rag-langchain-visual',
    copy: {
      'pt-br': {
        title: 'RAG Pipeline com LangChain',
        loadLabel: 'Load',
        splitLabel: 'Split',
        storeLabel: 'Store',
        retrieveLabel: 'Retrieve',
        answerLabel: 'Answer',
        documentLabel: 'Documents',
        chunkLabel: 'Chunks',
        vectorstoreLabel: 'VectorStore',
        retrieverLabel: 'Retriever',
        qaChainLabel: 'RetrievalQA Chain',
      },
      'en-us': {
        title: 'RAG Pipeline with LangChain',
        loadLabel: 'Load',
        splitLabel: 'Split',
        storeLabel: 'Store',
        retrieveLabel: 'Retrieve',
        answerLabel: 'Answer',
        documentLabel: 'Documents',
        chunkLabel: 'Chunks',
        vectorstoreLabel: 'VectorStore',
        retrieverLabel: 'Retriever',
        qaChainLabel: 'RetrievalQA Chain',
      },
    },
  },
});
