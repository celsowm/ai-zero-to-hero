import { defineSlide } from './_factory';

export const ragFromScratch = defineSlide({
  id: 'rag-from-scratch',
  type: 'two-column',
  options: {
    "columnRatios": [0.4, 0.6]
  },
  content: {
    'pt-br': {
      title: `RAG do Zero: Pipeline Completo`,
      body: `Vamos construir um pipeline RAG completo com **ChromaDB** (vector store), **SentenceTransformer** (embeddings) e **GPT-2** (generator).

### O que o código faz

1. **__init__**: inicializa os 3 componentes (vector store, embedder, LLM)
2. **ingest()**: recebe uma lista de documentos, gera embeddings e salva no ChromaDB
3. **query()**: recebe uma pergunta, busca documentos similares, monta prompt e gera resposta

### Dependências

\`\`\`bash
pip install chromadb sentence-transformers transformers torch
\`\`\`

### Limitações deste exemplo

- GPT-2 é pequeno e pode não seguir instruções perfeitamente
- Para produção, use modelos maiores (Llama 3, Mistral, GPT-4)
- Adicione re-ranking e chunking para documentos longos

\`\`\`python
snippet:rag/rag-from-scratch
\`\`\``,
    },
    'en-us': {
      title: `RAG from Scratch: Complete Pipeline`,
      body: `Let's build a complete RAG pipeline with **ChromaDB** (vector store), **SentenceTransformer** (embeddings), and **GPT-2** (generator).

### What the code does

1. **__init__**: initializes 3 components (vector store, embedder, LLM)
2. **ingest()**: receives a list of documents, generates embeddings and saves to ChromaDB
3. **query()**: receives a question, searches for similar documents, builds prompt and generates answer

### Dependencies

\`\`\`bash
pip install chromadb sentence-transformers transformers torch
\`\`\`

### Limitations of this example

- GPT-2 is small and may not follow instructions perfectly
- For production, use larger models (Llama 3, Mistral, GPT-4)
- Add re-ranking and chunking for long documents

\`\`\`python
snippet:rag/rag-from-scratch
\`\`\``,
    },
  },
  visual: {
    id: 'rag-from-scratch-visual',
    copy: {
      "pt-br": {
        "title": "Pipeline RAG End-to-End",
        "ingestPhase": "INGEST",
        "queryPhase": "QUERY",
        "documentsLabel": "Documentos brutos",
        "embedLabel": "Embedding",
        "vectorStoreLabel": "Vector Store",
        "questionLabel": "Pergunta",
        "searchLabel": "Busca Vetorial",
        "topKLabel": "Top-K Contexto",
        "promptLabel": "Prompt + Contexto",
        "generateLabel": "Geração",
        "answerLabel": "Resposta Fundamentada"
      },
      "en-us": {
        "title": "RAG Pipeline End-to-End",
        "ingestPhase": "INGEST",
        "queryPhase": "QUERY",
        "documentsLabel": "Raw Documents",
        "embedLabel": "Embedding",
        "vectorStoreLabel": "Vector Store",
        "questionLabel": "Question",
        "searchLabel": "Vector Search",
        "topKLabel": "Top-K Context",
        "promptLabel": "Prompt + Context",
        "generateLabel": "Generation",
        "answerLabel": "Grounded Answer"
      }
    },
  },
});
