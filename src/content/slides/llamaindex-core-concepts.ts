import { defineSlide } from './_factory';

export const llamaindexCoreConcepts = defineSlide({
  id: 'llamaindex-core-concepts',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Core Concepts do LlamaIndex',
      body: `O LlamaIndex é construído em torno de **5 conceitos fundamentais** que formam o pipeline de RAG.

### Os 5 pilares

1. **Documents** — seus dados brutos (PDFs, textos, HTML, SQL)
2. **Nodes** — chunks dos documentos com metadata (após parsing)
3. **Index** — estrutura que organiza os Nodes para retrieval
4. **Retriever** — mecanismo que busca nodes relevantes para uma query
5. **Query Engine** — combina retriever + LLM para gerar resposta
6. **Chat Engine** — como Query Engine, mas com memória de conversação

### Pipeline típico

\`\`\`
Documents → Nodes → Index → Retriever → Query Engine → Resposta
\`\`\`

> Cada conceito é **componível**: você pode trocar o retriever sem mudar o query engine.`,
    },
    'en-us': {
      title: 'LlamaIndex Core Concepts',
      body: `LlamaIndex is built around **5 fundamental concepts** that form the RAG pipeline.

### The 5 pillars

1. **Documents** — your raw data (PDFs, texts, HTML, SQL)
2. **Nodes** — document chunks with metadata (after parsing)
3. **Index** — structure that organizes Nodes for retrieval
4. **Retriever** — mechanism that finds relevant nodes for a query
5. **Query Engine** — combines retriever + LLM to generate a response
6. **Chat Engine** — like Query Engine, but with conversation memory

### Typical pipeline

\`\`\`
Documents → Nodes → Index → Retriever → Query Engine → Response
\`\`\`

> Each concept is **composable**: you can swap the retriever without changing the query engine.`,
    },
  },
  visual: {
    id: 'llamaindex-core-concepts-visual',
    copy: {
      'pt-br': {
        title: 'Pipeline do LlamaIndex',
        documentLabel: 'Dados brutos (PDF, TXT, HTML)',
        indexLabel: 'Organiza nodes para busca',
        retrieverLabel: 'Busca nodes relevantes',
        queryEngineLabel: 'Retriever + LLM = Resposta',
        chatEngineLabel: 'Query Engine + Memória',
        flowArrow: '→',
        conceptDoc: '📄 Document',
        conceptIndex: '📇 Index',
        conceptRetriever: '🔍 Retriever',
        conceptQuery: '❓ Query Engine',
        conceptChat: '💬 Chat Engine',
      },
      'en-us': {
        title: 'LlamaIndex Pipeline',
        documentLabel: 'Raw data (PDF, TXT, HTML)',
        indexLabel: 'Organizes nodes for search',
        retrieverLabel: 'Finds relevant nodes',
        queryEngineLabel: 'Retriever + LLM = Response',
        chatEngineLabel: 'Query Engine + Memory',
        flowArrow: '→',
        conceptDoc: '📄 Document',
        conceptIndex: '📇 Index',
        conceptRetriever: '🔍 Retriever',
        conceptQuery: '❓ Query Engine',
        conceptChat: '💬 Chat Engine',
      },
    },
  },
});
