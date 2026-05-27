import { defineSlide } from './_factory';

export const ragEmbeddings = defineSlide({
  id: 'rag-embeddings',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Embeddings: texto vira coordenada',
      body: `O embedding model transforma texto em vetor. Documentos e pergunta precisam passar pelo **mesmo modelo** para cair no mesmo espaço semântico.

### Operação

1. Cada chunk vira um vetor.
2. A pergunta vira um query embedding.
3. O retriever mede proximidade entre vetores.

**Forma curta:**

\`\`\`txt
score = cosine(embedding(pergunta), embedding(chunk))
\`\`\`

Se os embeddings forem ruins para o domínio, o RAG recupera contexto errado mesmo com um LLM excelente.

> Retrieval ruim não é corrigido magicamente na geração.`,
    },
    'en-us': {
      title: 'Embeddings: text becomes coordinates',
      body: `The embedding model turns text into vectors. Documents and the question must go through the **same model** to land in the same semantic space.

### Operation

1. Each chunk becomes a vector.
2. The question becomes a query embedding.
3. The retriever measures proximity between vectors.

**Short form:**

\`\`\`txt
score = cosine(embedding(question), embedding(chunk))
\`\`\`

If embeddings are poor for the domain, RAG retrieves the wrong context even with an excellent LLM.

> Bad retrieval is not magically fixed during generation.`,
    },
  },
  visual: {
    id: 'rag-embedding-visual',
    copy: {
      'pt-br': {
        title: 'Espaço semântico de documentos',
        doc1Label: 'Reembolso',
        doc2Label: 'Plano Pro',
        doc3Label: 'Slack',
        doc4Label: 'Faturamento',
        queryLabel: 'Pergunta',
        similarLabel: 'Próximos',
        dissimilarLabel: 'Distantes',
        embeddingDim: '384 dimensões',
      },
      'en-us': {
        title: 'Semantic document space',
        doc1Label: 'Refund',
        doc2Label: 'Pro plan',
        doc3Label: 'Slack',
        doc4Label: 'Billing',
        queryLabel: 'Question',
        similarLabel: 'Nearby',
        dissimilarLabel: 'Far',
        embeddingDim: '384 dimensions',
      },
    },
  },
});
