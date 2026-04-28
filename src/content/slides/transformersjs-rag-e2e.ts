import { defineSlide } from './_factory';

export const transformersjsRagE2e = defineSlide({
  id: 'transformersjs-rag-e2e',
  type: 'two-column',
  options: {
    "columnRatios": [0.4, 0.6]
  },
  content: {
    'pt-br': {
      title: `RAG Completo no Browser: Ponta a Ponta`,
      body: `Vamos construir um **pipeline RAG completo 100% no browser** usando Transformers.js. Sem servidor Python, sem API externa, sem custo.

### O que vamos usar

1. **all-MiniLM-L6-v2** (~80MB): modelo de embeddings para busca semântica
2. **Llama-3.2-1B-Instruct** (~2GB): modelo de geração de texto

### As 3 fases

1. **INGEST**: documentos → embeddings → array (vector DB in-memory)
2. **RETRIEVE**: query → embedding → cosine similarity → top-k
3. **GENERATE**: contexto + query → prompt → Llama-3.2 responde no browser

### Setup

\`\`\`bash
npm install @xenova/transformers
\`\`\`

### Limitações

- Modelos grandes precisam de **bastante RAM** no browser
- Primeira carga: **download dos modelos** (pode demorar)
- Para produção: considere **Web Workers** para não travar a UI

\`\`\`javascript
snippet:transformersjs/transformersjs-rag-e2e
\`\`\`

> O futuro da IA pode ser **serverless de verdade**: modelos rodando no browser de cada usuário, com dados privados e custo zero.`,
    },
    'en-us': {
      title: `Complete RAG in the Browser: End-to-End`,
      body: `Let's build a **complete RAG pipeline 100% in the browser** using Transformers.js. No Python server, no external API, no cost.

### What we'll use

1. **all-MiniLM-L6-v2** (~80MB): embedding model for semantic search
2. **Llama-3.2-1B-Instruct** (~2GB): text generation model

### The 3 phases

1. **INGEST**: documents → embeddings → array (in-memory vector DB)
2. **RETRIEVE**: query → embedding → cosine similarity → top-k
3. **GENERATE**: context + query → prompt → Llama-3.2 answers in the browser

### Setup

\`\`\`bash
npm install @xenova/transformers
\`\`\`

### Limitations

- Large models need **plenty of RAM** in the browser
- First load: **model downloads** (can take time)
- For production: consider **Web Workers** to avoid freezing the UI

\`\`\`javascript
snippet:transformersjs/transformersjs-rag-e2e
\`\`\`

> The future of AI might be **truly serverless**: models running in each user's browser, with private data and zero cost.`,
    },
  },
  visual: {
    id: 'transformersjs-rag-e2e-visual',
    copy: {
      "pt-br": {
        "title": "RAG 100% Browser",
        "ingestPhase": "INGEST",
        "queryPhase": "QUERY",
        "documentsLabel": "Documentos",
        "embedLabel": "Embedder (MiniLM)",
        "vectorStoreLabel": "Vector DB (Array)",
        "questionLabel": "Pergunta",
        "searchLabel": "Busca Vetorial",
        "topKLabel": "Top-K Contexto",
        "promptLabel": "Prompt + Contexto",
        "generateLabel": "Generator (Llama-3.2)",
        "answerLabel": "Resposta"
      },
      "en-us": {
        "title": "RAG 100% Browser",
        "ingestPhase": "INGEST",
        "queryPhase": "QUERY",
        "documentsLabel": "Documents",
        "embedLabel": "Embedder (MiniLM)",
        "vectorStoreLabel": "Vector DB (Array)",
        "questionLabel": "Question",
        "searchLabel": "Vector Search",
        "topKLabel": "Top-K Context",
        "promptLabel": "Prompt + Context",
        "generateLabel": "Generator (Llama-3.2)",
        "answerLabel": "Answer"
      }
    },
  },
});
