import { defineSlide } from './_factory';

export const ragIngestion = defineSlide({
  id: 'rag-ingestion',
  type: 'two-column',
  options: { columnRatios: [0.52, 0.48] },
  content: {
    'pt-br': {
      title: 'Ingestão: documento não é só texto',
      body: `Antes da busca existir, a base precisa ser preparada. Essa fase é chamada de **ingestão**.

### O que entra no índice

- **Texto:** o conteúdo que pode responder perguntas.
- **ID estável:** um identificador que não muda a cada execução.
- **Metadata:** fonte, página, data, produto, permissão, idioma.

### Por que isso importa

Sem metadata, você até recupera um trecho, mas não consegue citar fonte, filtrar por produto ou auditar a resposta.

\`\`\`txt
arquivo -> Document(text, metadata) -> chunks -> embeddings -> vector store
\`\`\`

> Um RAG confiável começa antes do LLM: começa na forma como os documentos são carregados.`,
    },
    'en-us': {
      title: 'Ingestion: a document is not just text',
      body: `Before search exists, the knowledge base must be prepared. This phase is called **ingestion**.

### What goes into the index

- **Text:** the content that can answer questions.
- **Stable ID:** an identifier that does not change on every run.
- **Metadata:** source, page, date, product, permission, language.

### Why this matters

Without metadata, you may retrieve a passage, but you cannot cite a source, filter by product, or audit the answer.

\`\`\`txt
file -> Document(text, metadata) -> chunks -> embeddings -> vector store
\`\`\`

> Reliable RAG starts before the LLM: it starts with how documents are loaded.`,
    },
  },
  visual: {
    id: 'rag-architecture-visual',
    copy: {
      'pt-br': {
        title: 'Duas fases do RAG',
        ingestPhase: 'Indexação',
        queryPhase: 'Consulta',
        documentsLabel: 'Documentos',
        embedLabel: 'Embed',
        vectorStoreLabel: 'Vector Store',
        queryLabel: 'Pergunta',
        retrieveLabel: 'Retrieve',
        contextLabel: 'Contexto',
        promptLabel: 'Prompt + Contexto',
        llmLabel: 'LLM',
        answerLabel: 'Resposta',
      },
      'en-us': {
        title: 'Two RAG phases',
        ingestPhase: 'Indexing',
        queryPhase: 'Query',
        documentsLabel: 'Documents',
        embedLabel: 'Embed',
        vectorStoreLabel: 'Vector Store',
        queryLabel: 'Question',
        retrieveLabel: 'Retrieve',
        contextLabel: 'Context',
        promptLabel: 'Prompt + Context',
        llmLabel: 'LLM',
        answerLabel: 'Answer',
      },
    },
  },
});
