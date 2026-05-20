import { defineSlide } from './_factory';

export const ragArchitecture = defineSlide({
  id: 'rag-architecture',
  type: 'two-column',
  options: {
    "columnRatios": [0.45, 0.55]
  },
  content: {
    'pt-br': {
      title: `Arquitetura RAG Completa`,
      body: `Um pipeline RAG tem **4 componentes principais** que trabalham juntos:

### 1. Vector Store (Banco Vetorial)
Armazena documentos como vetores. Permite busca semântica rápida por similaridade. Exemplos: **ChromaDB**, **FAISS**, **Pinecone**, **Weaviate**.

### 2. Embedding Model
Transforma texto em vetores densos. Esse **embedding model** é usado tanto na indexação dos documentos quanto no **query embedding** da pergunta.

### 3. Retriever
Dada uma query, encontra os top-k documentos mais similares no vector store usando **cosine similarity**.

### 4. Generator (LLM)
Recebe o prompt aumentado com contexto e gera a resposta final.

> A magia do RAG está na **separação de responsabilidades**: o embedding model entende semântica, o vector store busca eficientemente, e o LLM apenas gera texto com contexto.

\`\`\`python
snippet:rag/rag-architecture
\`\`\``,
    },
    'en-us': {
      title: `Complete RAG Architecture`,
      body: `A RAG pipeline has **4 main components** working together:

### 1. Vector Store
Stores documents as vectors. Enables fast semantic search by similarity. Examples: **ChromaDB**, **FAISS**, **Pinecone**, **Weaviate**.

### 2. Embedding Model
Transforms text into dense vectors. The same **embedding model** is used for document indexing and for the query embedding.

### 3. Retriever
Given a query, finds the top-k most similar documents in the vector store using **cosine similarity**.

### 4. Generator (LLM)
Receives the augmented prompt with context and generates the final answer.

> RAG's magic is in the **separation of concerns**: the embedding model understands semantics, the vector store searches efficiently, and the LLM just generates text with context.

\`\`\`python
snippet:rag/rag-architecture
\`\`\``,
    },
  },
  visual: {
    id: 'rag-architecture-visual',
    copy: {
      "pt-br": {
        "title": "Pipeline RAG",
        "ingestPhase": "Fase de Indexação",
        "queryPhase": "Fase de Consulta",
        "documentsLabel": "Documentos",
        "embedLabel": "Embed",
        "vectorStoreLabel": "Vector Store",
        "queryLabel": "Query",
        "retrieveLabel": "Retrieve",
        "contextLabel": "Contexto",
        "promptLabel": "Prompt + Contexto",
        "llmLabel": "LLM Generator",
        "answerLabel": "Resposta"
      },
      "en-us": {
        "title": "RAG Pipeline",
        "ingestPhase": "Indexing Phase",
        "queryPhase": "Query Phase",
        "documentsLabel": "Documents",
        "embedLabel": "Embed",
        "vectorStoreLabel": "Vector Store",
        "queryLabel": "Query",
        "retrieveLabel": "Retrieve",
        "contextLabel": "Context",
        "promptLabel": "Prompt + Context",
        "llmLabel": "LLM Generator",
        "answerLabel": "Answer"
      }
    },
  },
});
