import { defineSlide } from './_factory';

export const chromadbRagE2e = defineSlide({
  id: 'chromadb-rag-e2e',
  type: 'two-column',
  options: {
    "columnRatios": [0.4, 0.6]
  },
  content: {
    'pt-br': {
      title: `RAG Ponta a Ponta: ChromaDB + Transformers`,
      body: `Vamos unir **ChromaDB** (vector store) com **Transformers** (geração de texto) em um pipeline RAG completo e funcional.

### O pipeline

1. **INDEX:** documentos → embeddings (SentenceTransformer) → ChromaDB
2. **RETRIEVE:** query → embedding → busca semântica → contexto relevante
3. **GENERATE:** contexto + query → prompt → GPT-2 gera resposta fundamentada

### Código completo

\`\`\`python
snippet:chromadb/chromadb-rag-e2e
\`\`\`

### Dependências

\`\`\`bash
pip install chromadb sentence-transformers transformers torch
\`\`\`

### O que acontece

- ChromaDB encontra os documentos relevantes sobre a pergunta
- O contexto é injetado no prompt do GPT-2
- O modelo gera uma resposta **fundamentada nos documentos**, não inventada

> Este é o mesmo padrão que sistemas como ChatGPT com busca na web usam — só que rodando localmente, no seu PC.`,
    },
    'en-us': {
      title: `RAG End-to-End: ChromaDB + Transformers`,
      body: `Let's combine **ChromaDB** (vector store) with **Transformers** (text generation) in a complete, working RAG pipeline.

### The pipeline

1. **INDEX:** documents → embeddings (SentenceTransformer) → ChromaDB
2. **RETRIEVE:** query → embedding → semantic search → relevant context
3. **GENERATE:** context + query → prompt → GPT-2 generates grounded answer

### Complete code

\`\`\`python
snippet:chromadb/chromadb-rag-e2e
\`\`\`

### Dependencies

\`\`\`bash
pip install chromadb sentence-transformers transformers torch
\`\`\`

### What happens

- ChromaDB finds relevant documents about the question
- Context is injected into the GPT-2 prompt
- The model generates an answer **grounded in documents**, not invented

> This is the same pattern systems like ChatGPT with web search use — except running locally, on your PC.`,
    },
  },
  visual: {
    id: 'chromadb-rag-e2e-visual',
    copy: {
      "pt-br": {
        "title": "Pipeline RAG: ChromaDB + Transformers",
        "indexPhase": "INDEX",
        "retrievePhase": "RETRIEVE",
        "generatePhase": "GENERATE",
        "documentsLabel": "Documentos",
        "embedderLabel": "SentenceTransformer",
        "chromaLabel": "ChromaDB",
        "queryLabel": "Pergunta",
        "searchLabel": "Busca vetorial",
        "contextLabel": "Contexto",
        "promptLabel": "Prompt (contexto + query)",
        "modelLabel": "GPT-2 (Transformers)",
        "answerLabel": "Resposta fundamentada"
      },
      "en-us": {
        "title": "RAG Pipeline: ChromaDB + Transformers",
        "indexPhase": "INDEX",
        "retrievePhase": "RETRIEVE",
        "generatePhase": "GENERATE",
        "documentsLabel": "Documents",
        "embedderLabel": "SentenceTransformer",
        "chromaLabel": "ChromaDB",
        "queryLabel": "Question",
        "searchLabel": "Vector search",
        "contextLabel": "Context",
        "promptLabel": "Prompt (context + query)",
        "modelLabel": "GPT-2 (Transformers)",
        "answerLabel": "Grounded answer"
      }
    },
  },
});
