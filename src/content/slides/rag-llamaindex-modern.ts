import { defineSlide } from './_factory';

export const ragLlamaindexModern = defineSlide({
  id: 'rag-llamaindex-modern',
  type: 'two-column',
  options: { columnRatios: [0.4, 0.6] },
  content: {
    'pt-br': {
      title: 'RAG moderno com LlamaIndex',
      body: `LlamaIndex é especializado em conectar dados a LLMs. A API favorece loaders, nodes, índices, retrievers e query engines.

### O padrão mínimo

1. carregar documentos com \`SimpleDirectoryReader\`;
2. criar \`VectorStoreIndex.from_documents()\`;
3. consultar com \`index.as_query_engine()\`.

### Dependências

\`\`\`bash
pip install llama-index llama-index-llms-openai
\`\`\`

> LlamaIndex deixa a trilha de dados explícita: documento -> node -> índice -> query engine.`,
      rightBody: `\`\`\`python
snippet:rag_v2/llamaindex-modern-rag
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 3], content: 'Imports centrais: loader de diretório, VectorStoreIndex e LLM.' },
        { lineRange: [5, 8], content: 'SimpleDirectoryReader carrega arquivos e preserva metadata útil para fontes.' },
        { lineRange: [10, 13], content: 'VectorStoreIndex cria nodes, embeddings e índice vetorial a partir dos documentos.' },
        { lineRange: [15, 18], content: 'Query engine combina retriever e LLM. O top-k controla quantos nodes entram no contexto.' },
        { lineRange: [20, 27], content: 'A resposta vem com source_nodes, o que facilita auditoria e citação das fontes.' },
      ],
    },
    'en-us': {
      title: 'Modern RAG with LlamaIndex',
      body: `LlamaIndex specializes in connecting data to LLMs. The API favors loaders, nodes, indexes, retrievers, and query engines.

### The minimal pattern

1. load documents with \`SimpleDirectoryReader\`;
2. create \`VectorStoreIndex.from_documents()\`;
3. query with \`index.as_query_engine()\`.

### Dependencies

\`\`\`bash
pip install llama-index llama-index-llms-openai
\`\`\`

> LlamaIndex makes the data path explicit: document -> node -> index -> query engine.`,
      rightBody: `\`\`\`python
snippet:rag_v2/llamaindex-modern-rag
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 3], content: 'Core imports: directory loader, VectorStoreIndex, and LLM.' },
        { lineRange: [5, 8], content: 'SimpleDirectoryReader loads files and preserves useful source metadata.' },
        { lineRange: [10, 13], content: 'VectorStoreIndex creates nodes, embeddings, and a vector index from the documents.' },
        { lineRange: [15, 18], content: 'The query engine combines retriever and LLM. Top-k controls how many nodes enter the context.' },
        { lineRange: [20, 27], content: 'The response includes source_nodes, which makes source auditing and citation easier.' },
      ],
    },
  },
});
