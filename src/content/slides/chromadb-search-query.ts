import { defineSlide } from './_factory';

export const chromadbSearchQuery = defineSlide({
  id: 'chromadb-search-query',
  type: 'two-column',
  options: {
    "columnRatios": [0.5, 0.5]
  },
  content: {
    'pt-br': {
      title: `Busca Semântica no VectorDB`,
      body: `Agora que os documentos estão indexados, podemos fazer **busca por significado**, não por palavras-chave.

### Como funciona a busca

1. **Query → Embedding:** a pergunta do usuário vira um vetor com o mesmo modelo.

2. **Similaridade vetorial:** ChromaDB compara o vetor da query com todos os documentos indexados.

3. **Ranking:** retorna os top-k documentos mais próximos (menor distância = mais relevante).

### Exemplo prático

Query: *"Quais são os modelos de deep learning mais populares?"*

Resultados:
- **0.45** → "Transformers são modelos baseados em atenção."
- **0.62** → "PyTorch é o framework mais usado para deep learning."

> A busca encontra documentos semanticamente relevantes mesmo sem palavras-chave exatas. "Deep learning" encontra "Transformers" e "PyTorch" porque estão no mesmo espaço semântico.

\`\`\`python
snippet:chromadb/chromadb-search-query
\`\`\``,
    },
    'en-us': {
      title: `Semantic Search in the VectorDB`,
      body: `Now that documents are indexed, we can do **search by meaning**, not by keywords.

### How search works

1. **Query → Embedding:** the user's question becomes a vector with the same model.

2. **Vector similarity:** ChromaDB compares the query vector with all indexed documents.

3. **Ranking:** returns top-k closest documents (lower distance = more relevant).

### Practical example

Query: *"What are the most popular deep learning models?"*

Results:
- **0.45** → "Transformers are attention-based models."
- **0.62** → "PyTorch is the most used deep learning framework."

> Search finds semantically relevant documents even without exact keyword matches. "Deep learning" finds "Transformers" and "PyTorch" because they're in the same semantic space.

\`\`\`python
snippet:chromadb/chromadb-search-query
\`\`\``,
    },
  },
  visual: {
    id: 'chromadb-search-visual',
    copy: {
      "pt-br": {
        "title": "Busca Semântica: Query → ChromaDB → Resultados",
        "queryLabel": "Pergunta",
        "queryText": "Modelos de deep learning?",
        "dbLabel": "ChromaDB",
        "searchLabel": "Busca vetorial",
        "rankLabel": "Ranking por similaridade",
        "result1": "Transformers",
        "result2": "PyTorch",
        "result3": "Vector databases",
        "score1": "0.45",
        "score2": "0.62",
        "score3": "0.89",
        "topKLabel": "Top-K"
      },
      "en-us": {
        "title": "Semantic Search: Query → ChromaDB → Results",
        "queryLabel": "Question",
        "queryText": "Deep learning models?",
        "dbLabel": "ChromaDB",
        "searchLabel": "Vector search",
        "rankLabel": "Ranking by similarity",
        "result1": "Transformers",
        "result2": "PyTorch",
        "result3": "Vector databases",
        "score1": "0.45",
        "score2": "0.62",
        "score3": "0.89",
        "topKLabel": "Top-K"
      }
    },
  },
});
