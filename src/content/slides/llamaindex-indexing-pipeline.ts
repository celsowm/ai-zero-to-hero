import { defineSlide } from './_factory';

export const llamaindexIndexingPipeline = defineSlide({
  id: 'llamaindex-indexing-pipeline',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Indexing Pipeline: Documents → Vetores',
      body: `O coração do LlamaIndex é o **indexing pipeline** — transforma documentos brutos em uma estrutura indexada para busca semântica.

### Etapas do pipeline

1. **Loading**: loaders leem os dados brutos → \`Document[]\`
2. **Parsing**: cada Document é quebrado em **Nodes** (chunks)
3. **Transformations**: chunking, limpeza, extração de metadata
4. **Embedding**: cada node vira um vetor via modelo de embedding
5. **Storage**: vetores + metadata são salvos no **VectorStore**

### Chunking inteligente

O LlamaIndex usa **TokenTextSplitter** que respeita limites de tokens:

\`\`\`python
snippet:llamaindex/chunking-pipeline
\`\`\`

> Node ≠ Document. Um Document vira **múltiplos Nodes** após o chunking.

### VectorStoreIndex

O index mais comum é o **VectorStoreIndex** — armazena embeddings e permite busca semântica por similaridade de cosseno.`,
    },
    'en-us': {
      title: 'Indexing Pipeline: Documents → Vectors',
      body: `The heart of LlamaIndex is the **indexing pipeline** — transforms raw documents into an indexed structure for semantic search.

### Pipeline stages

1. **Loading**: loaders read raw data → \`Document[]\`
2. **Parsing**: each Document is split into **Nodes** (chunks)
3. **Transformations**: chunking, cleaning, metadata extraction
4. **Embedding**: each node becomes a vector via embedding model
5. **Storage**: vectors + metadata are saved to **VectorStore**

### Intelligent chunking

LlamaIndex uses **TokenTextSplitter** that respects token boundaries:

\`\`\`python
snippet:llamaindex/chunking-pipeline
\`\`\`

> Node ≠ Document. One Document becomes **multiple Nodes** after chunking.

### VectorStoreIndex

The most common index is **VectorStoreIndex** — stores embeddings and enables semantic search by cosine similarity.`,
    },
  },
  visual: {
    id: 'llamaindex-pipeline-visual',
    copy: {
      'pt-br': {
        title: 'Indexing & Query Pipeline',
        ingestPhase: 'FASE DE INDEXAÇÃO',
        queryPhase: 'FASE DE QUERY',
        documentsLabel: '📄 Documents',
        chunkLabel: '✂️ Chunking',
        embedLabel: '🔢 Embedding',
        indexLabel: '📇 VectorStoreIndex',
        questionLabel: '❓ Pergunta',
        retrieveLabel: '🔍 Retrieve',
        contextLabel: '📋 Contexto',
        llmLabel: '🤖 LLM',
        answerLabel: '✅ Resposta',
      },
      'en-us': {
        title: 'Indexing & Query Pipeline',
        ingestPhase: 'INDEXING PHASE',
        queryPhase: 'QUERY PHASE',
        documentsLabel: '📄 Documents',
        chunkLabel: '✂️ Chunking',
        embedLabel: '🔢 Embedding',
        indexLabel: '📇 VectorStoreIndex',
        questionLabel: '❓ Question',
        retrieveLabel: '🔍 Retrieve',
        contextLabel: '📋 Context',
        llmLabel: '🤖 LLM',
        answerLabel: '✅ Answer',
      },
    },
  },
});
