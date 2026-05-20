import { defineSlide } from './_factory';

export const llamaindexE2e = defineSlide({
  id: 'llamaindex-e2e',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'E2E: Build a RAG App com LlamaIndex',
      body: `Vamos construir um **RAG completo do zero** com LlamaIndex em 5 passos.

### Passo 1: Carregar documentos

\`\`\`python
snippet:llamaindex/e2e-step1
\`\`\`

### Passo 2: Criar o Index

\`\`\`python
snippet:llamaindex/e2e-step2
\`\`\`

### Passo 3: Configurar o Retriever

\`\`\`python
snippet:llamaindex/e2e-step3
\`\`\`

### Passo 4: Criar o Query Engine

\`\`\`python
snippet:llamaindex/e2e-step4
\`\`\`

### Passo 5: Perguntar!

\`\`\`python
snippet:llamaindex/e2e-step5
\`\`\`

> Em **15 linhas de código** você tem um RAG production-ready com chunking inteligente, embedding model, query embedding, retrieval semântico e geração com contexto.`,
    },
    'en-us': {
      title: 'E2E: Build a RAG App with LlamaIndex',
      body: `Let's build a **complete RAG from scratch** with LlamaIndex in 5 steps.

### Step 1: Load documents

\`\`\`python
snippet:llamaindex/e2e-step1
\`\`\`

### Step 2: Create the Index

\`\`\`python
snippet:llamaindex/e2e-step2
\`\`\`

### Step 3: Configure the Retriever

\`\`\`python
snippet:llamaindex/e2e-step3
\`\`\`

### Step 4: Create the Query Engine

\`\`\`python
snippet:llamaindex/e2e-step4
\`\`\`

### Step 5: Ask!

\`\`\`python
snippet:llamaindex/e2e-step5
\`\`\`

> In **15 lines of code** you have a production-ready RAG with intelligent chunking, embedding model, query embedding, semantic retrieval and context generation.`,
    },
  },
  visual: {
    id: 'llamaindex-e2e-visual',
    copy: {
      'pt-br': {
        title: 'RAG Completo em 5 Passos',
        step1Label: 'Load',
        step1Desc: 'SimpleDirectoryReader lê todos os arquivos do diretório e retorna Document objects com texto + metadata.',
        step2Label: 'Index',
        step2Desc: 'VectorStoreIndex.from_documents() faz chunking automático, embedding com embedding model e armazenamento no vector store.',
        step3Label: 'Retrieve',
        step3Desc: 'index.as_retriever(similarity_top_k=3) configura busca semântica: query -> query embedding -> similaridade de cosseno.',
        step4Label: 'Query',
        step4Desc: 'RetrieverQueryEngine combina retriever + LLM para gerar respostas com contexto.',
        step5Label: 'Ask',
        step5Desc: 'query_engine.query("sua pergunta") — o RAG busca contexto e gera resposta fundamentada.',
      },
      'en-us': {
        title: 'Complete RAG in 5 Steps',
        step1Label: 'Load',
        step1Desc: 'SimpleDirectoryReader reads all files from directory and returns Document objects with text + metadata.',
        step2Label: 'Index',
        step2Desc: 'VectorStoreIndex.from_documents() does automatic chunking, embedding through an embedding model, and vector-store persistence.',
        step3Label: 'Retrieve',
        step3Desc: 'index.as_retriever(similarity_top_k=3) configures semantic search: query -> query embedding -> cosine similarity.',
        step4Label: 'Query',
        step4Desc: 'RetrieverQueryEngine combines retriever + LLM to generate responses with context.',
        step5Label: 'Ask',
        step5Desc: 'query_engine.query("your question") — the RAG searches context and generates grounded answers.',
      },
    },
  },
});
