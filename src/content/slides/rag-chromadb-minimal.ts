import { defineSlide } from './_factory';

export const ragChromadbMinimal = defineSlide({
  id: 'rag-chromadb-minimal',
  type: 'two-column',
  options: { columnRatios: [0.42, 0.58] },
  content: {
    'pt-br': {
      title: 'ChromaDB mínimo: add e query',
      body: `Agora o pipeline deixa de ser desenho e vira código.

### O que este exemplo mostra

1. criar uma coleção local;
2. indexar documentos com IDs e metadata;
3. consultar por significado;
4. imprimir distância e fonte.

### Dependências

\`\`\`bash
pip install chromadb sentence-transformers
\`\`\`

> Este é o menor loop útil de VectorDB: adicionar evidência e recuperar evidência.`,
      rightBody: `\`\`\`python
snippet:rag_v2/chromadb-minimal
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'Imports, documentos de exemplo e embedding function. O mesmo embedder será usado para documentos e query.' },
        { lineRange: [13, 17], content: 'Cliente local do ChromaDB e coleção com embedding function acoplada.' },
        { lineRange: [19, 27], content: 'Indexação: IDs estáveis, texto original e metadata de fonte entram juntos.' },
        { lineRange: [29, 40], content: 'Consulta: a pergunta vira embedding, o ChromaDB ranqueia os documentos próximos e devolve texto, metadata e distância.' },
      ],
    },
    'en-us': {
      title: 'Minimal ChromaDB: add and query',
      body: `Now the pipeline stops being a diagram and becomes code.

### What this example shows

1. create a local collection;
2. index documents with IDs and metadata;
3. query by meaning;
4. print distance and source.

### Dependencies

\`\`\`bash
pip install chromadb sentence-transformers
\`\`\`

> This is the smallest useful VectorDB loop: add evidence and retrieve evidence.`,
      rightBody: `\`\`\`python
snippet:rag_v2/chromadb-minimal
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'Imports, sample documents, and embedding function. The same embedder will be used for documents and query.' },
        { lineRange: [13, 17], content: 'Local ChromaDB client and collection with an attached embedding function.' },
        { lineRange: [19, 27], content: 'Indexing: stable IDs, original text, and source metadata are stored together.' },
        { lineRange: [29, 40], content: 'Query: the question becomes an embedding, ChromaDB ranks nearby documents and returns text, metadata, and distance.' },
      ],
    },
  },
});
