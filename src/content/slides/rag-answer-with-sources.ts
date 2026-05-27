import { defineSlide } from './_factory';

export const ragAnswerWithSources = defineSlide({
  id: 'rag-answer-with-sources',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Resposta boa vem com fonte',
      body: `Em RAG, a resposta não deve ser apenas fluente. Ela precisa ser **auditável**.

### O formato desejável

1. resposta curta e direta;
2. fonte usada;
3. indicação de incerteza quando a fonte não cobre a pergunta.

### Exemplo

\`\`\`txt
Resposta:
O prazo de reembolso é de até 7 dias.

Fonte:
politicas.md
\`\`\`

Se o modelo não mostra de onde tirou a informação, você não consegue depurar retrieval, prompt ou geração.

> Fonte não é decoração. Fonte é parte da interface de confiança.`,
    },
    'en-us': {
      title: 'A good answer includes sources',
      body: `In RAG, the answer should not only be fluent. It must be **auditable**.

### Desired shape

1. short and direct answer;
2. source used;
3. uncertainty when the source does not cover the question.

### Example

\`\`\`txt
Answer:
The refund window is up to 7 days.

Source:
policies.md
\`\`\`

If the model does not show where the information came from, you cannot debug retrieval, prompt, or generation.

> Source is not decoration. Source is part of the trust interface.`,
    },
  },
  visual: {
    id: 'rag-from-scratch-visual',
    copy: {
      'pt-br': {
        title: 'Da evidência à resposta',
        ingestPhase: 'INGEST',
        queryPhase: 'QUERY',
        documentsLabel: 'Documentos',
        embedLabel: 'Embedding',
        vectorStoreLabel: 'Vector Store',
        questionLabel: 'Pergunta',
        searchLabel: 'Busca',
        topKLabel: 'Contexto + fontes',
        promptLabel: 'Prompt',
        generateLabel: 'Geração',
        answerLabel: 'Resposta citável',
      },
      'en-us': {
        title: 'From evidence to answer',
        ingestPhase: 'INGEST',
        queryPhase: 'QUERY',
        documentsLabel: 'Documents',
        embedLabel: 'Embedding',
        vectorStoreLabel: 'Vector Store',
        questionLabel: 'Question',
        searchLabel: 'Search',
        topKLabel: 'Context + sources',
        promptLabel: 'Prompt',
        generateLabel: 'Generation',
        answerLabel: 'Citable answer',
      },
    },
  },
});
