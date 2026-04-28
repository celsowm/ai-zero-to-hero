import { defineSlide } from './_factory';

export const transformersjsVectorSearch = defineSlide({
  id: 'transformersjs-vector-search',
  type: 'two-column',
  options: {
    "columnRatios": [0.45, 0.55]
  },
  content: {
    'pt-br': {
      title: `Vector DB no Browser: Sem Servidor Necessário`,
      body: `No RAG tradicional, usamos **ChromaDB** ou **FAISS** rodando em servidor Python. Com Transformers.js, podemos fazer **tudo no browser**.

### Vector DB client-side

Um "vector database" no browser é simplesmente um **array de objetos** com embeddings pré-computados. Para milhares de documentos, isso funciona perfeitamente.

### Como funciona a busca

1. Embedda a query com o mesmo modelo
2. Calcula cosine similarity com cada documento (dot product)
3. Ordena e retorna os top-k

### Quando precisa de algo mais pesado?

- **> 10.000 documentos**: use FAISS-WASM ou Annoy no browser
- **Milhões de documentos**: servidor com Pinecone/Weaviate
- **Para a maioria dos apps**: array simples + brute force funciona

### Vantagens do browser-only

- **Zero infraestrutura**: hospeda em GitHub Pages e funciona
- **Dados do usuário**: embeddings gerados localmente
- **Sem latência de rede**: busca instantânea

\`\`\`javascript
snippet:transformersjs/transformersjs-vector-search
\`\`\``,
    },
    'en-us': {
      title: `Vector DB in the Browser: No Server Needed`,
      body: `In traditional RAG, we use **ChromaDB** or **FAISS** running on a Python server. With Transformers.js, we can do **everything in the browser**.

### Client-side vector DB

A "vector database" in the browser is simply an **array of objects** with pre-computed embeddings. For thousands of documents, this works perfectly.

### How search works

1. Embed the query with the same model
2. Compute cosine similarity with each document (dot product)
3. Sort and return top-k

### When do you need something heavier?

- **> 10,000 documents**: use FAISS-WASM or Annoy in the browser
- **Millions of documents**: server with Pinecone/Weaviate
- **For most apps**: simple array + brute force works

### Browser-only advantages

- **Zero infrastructure**: host on GitHub Pages and it works
- **User data**: embeddings generated locally
- **No network latency**: instant search

\`\`\`javascript
snippet:transformersjs/transformersjs-vector-search
\`\`\``,
    },
  },
  visual: {
    id: 'transformersjs-vector-search-visual',
    copy: {
      "pt-br": {
        "title": "Busca Vetorial no Browser",
        "queryLabel": "Query: 'Quem criou o GPT?'",
        "doc1Label": "GPT-2 pela OpenAI",
        "doc2Label": "Python para ML",
        "doc3Label": "Copa 2022 no Catar",
        "score1": "0.85",
        "score2": "0.02",
        "score3": "0.01",
        "rankLabel": "Ranking",
        "searchLabel": "Busca ~5ms",
        "noServerLabel": "Sem Servidor"
      },
      "en-us": {
        "title": "Vector Search in the Browser",
        "queryLabel": "Query: 'Who created GPT?'",
        "doc1Label": "GPT-2 by OpenAI",
        "doc2Label": "Python for ML",
        "doc3Label": "World Cup 2022 Qatar",
        "score1": "0.85",
        "score2": "0.02",
        "score3": "0.01",
        "rankLabel": "Ranking",
        "searchLabel": "Search ~5ms",
        "noServerLabel": "No Server"
      }
    },
  },
});
