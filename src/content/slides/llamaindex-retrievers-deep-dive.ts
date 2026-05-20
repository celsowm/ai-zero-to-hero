import { defineSlide } from './_factory';

export const llamaindexRetrieversDeepDive = defineSlide({
  id: 'llamaindex-retrievers-deep-dive',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Retrievers: Vector, BM25 e Router',
      body: `O **retriever** é o componente que busca os nodes mais relevantes. O LlamaIndex oferece vários tipos, cada um com pontos fortes.

### VectorIndexRetriever (semântico)

Busca por **similaridade de cosseno** no espaço de embeddings. A query vira **query embedding** antes do ranking. Bom para conceitos e significado.

\`\`\`python
snippet:llamaindex/vector-retriever
\`\`\`

### BM25Retriever (keyword)

Busca por **termos exatos** como um motor de busca. Bom para nomes próprios, siglas, códigos.

### RouterQueryEngine (inteligente)

Escolhe **automaticamente** o melhor retriever baseado na query. Combina os dois mundos.

> **Regra prática:** se a pergunta usa termos técnicos → BM25. Se é conceitual → Vector. Na dúvida → Router.`,
    },
    'en-us': {
      title: 'Retrievers: Vector, BM25 and Router',
      body: `The **retriever** is the component that searches for the most relevant nodes. LlamaIndex offers several types, each with different strengths.

### VectorIndexRetriever (semantic)

Searches by **cosine similarity** in embedding space. The query is converted into a **query embedding** before ranking. Good for concepts and meaning.

\`\`\`python
snippet:llamaindex/vector-retriever
\`\`\`

### BM25Retriever (keyword)

Searches by **exact terms** like a search engine. Good for proper nouns, acronyms, code.

### RouterQueryEngine (intelligent)

**Automatically** chooses the best retriever based on the query. Combines both worlds.

> **Rule of thumb:** if the question uses technical terms → BM25. If conceptual → Vector. When in doubt → Router.`,
    },
  },
  visual: {
    id: 'llamaindex-retrievers-visual',
    copy: {
      'pt-br': {
        title: 'Tipos de Retriever',
        vectorLabel: 'Vector',
        bm25Label: 'BM25',
        routerLabel: 'Router',
        semanticDesc: 'Busca por significado — ideal para perguntas conceituais',
        keywordDesc: 'Busca por termos exatos — ideal para nomes e códigos',
        autoSelectDesc: 'Escolhe automaticamente o melhor retriever para a query',
        scoreLabel: 'Scores de similaridade',
        topKLabel: 'top_k',
      },
      'en-us': {
        title: 'Retriever Types',
        vectorLabel: 'Vector',
        bm25Label: 'BM25',
        routerLabel: 'Router',
        semanticDesc: 'Searches by meaning — ideal for conceptual questions',
        keywordDesc: 'Searches by exact terms — ideal for names and code',
        autoSelectDesc: 'Automatically picks the best retriever for the query',
        scoreLabel: 'Similarity scores',
        topKLabel: 'top_k',
      },
    },
  },
});
