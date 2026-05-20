import { defineSlide } from './_factory';

export const chromadbIndexDocuments = defineSlide({
  id: 'chromadb-index-documents',
  type: 'two-column',
  options: {
    "columnRatios": [0.5, 0.5]
  },
  content: {
    'pt-br': {
      title: `VectorDB: Indexando Documentos com ChromaDB`,
      body: `**Intuição:** o **vector store** guarda semântica em vez de só texto literal. Em vez de palavra-chave, buscamos por significado.

**Operação:** documentos passam pelo **embedding model** e os vetores resultantes são indexados.

### Como funciona

1. **Documento → Embedding:** cada texto vira um vetor de 384 dimensões (SentenceTransformer como embedding model).

2. **Indexação:** os vetores são salvos no ChromaDB com o texto original.

3. **Busca:** a query também vira vetor. ChromaDB encontra os documentos mais próximos no espaço vetorial.

### Por que ChromaDB?

- **Open-source e gratuito**
- **Local**: roda no seu PC, sem servidor externo
- **Simples**: API de 3 linhas para adicionar e buscar
- **Integra com tudo**: funciona com SentenceTransformer, OpenAI e outros embedders

\`\`\`python
snippet:chromadb/chromadb-index-documents
\`\`\`

> ChromaDB transforma sua coleção de documentos em um **banco de dados semântico** — pronto para RAG.`,
    },
    'en-us': {
      title: `VectorDB: Indexing Documents with ChromaDB`,
      body: `**Intuition:** the **vector store** keeps semantics, not only literal text. Instead of keywords, we search by meaning.

**Operation:** documents go through an **embedding model** and resulting vectors are indexed.

### How it works

1. **Document → Embedding:** each text becomes a 384-dimensional vector (SentenceTransformer as embedding model).

2. **Indexing:** vectors are saved in ChromaDB with the original text.

3. **Search:** the query also becomes a vector. ChromaDB finds the closest documents in vector space.

### Why ChromaDB?

- **Open-source and free**
- **Local**: runs on your PC, no external server
- **Simple**: 3-line API to add and search
- **Integrates with everything**: works with SentenceTransformer, OpenAI, and other embedders

\`\`\`python
snippet:chromadb/chromadb-index-documents
\`\`\`

> ChromaDB turns your document collection into a **semantic database** — ready for RAG.`,
    },
  },
  visual: {
    id: 'chromadb-index-visual',
    copy: {
      "pt-br": {
        "title": "Indexando Documentos no ChromaDB",
        "docLabel": "Documento",
        "embedLabel": "Embedding",
        "dbLabel": "ChromaDB",
        "dimLabel": "384 dimensões",
        "doc1": "Transformers são...",
        "doc2": "PyTorch é o...",
        "doc3": "Vector databases...",
        "doc4": "ChromaDB é...",
        "addLabel": "collection.add()",
        "embedderLabel": "SentenceTransformer"
      },
      "en-us": {
        "title": "Indexing Documents in ChromaDB",
        "docLabel": "Document",
        "embedLabel": "Embedding",
        "dbLabel": "ChromaDB",
        "dimLabel": "384 dimensions",
        "doc1": "Transformers are...",
        "doc2": "PyTorch is the...",
        "doc3": "Vector databases...",
        "doc4": "ChromaDB is...",
        "addLabel": "collection.add()",
        "embedderLabel": "SentenceTransformer"
      }
    },
  },
});
