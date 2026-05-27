import { defineSlide } from './_factory';

export const ragProductionChecklist = defineSlide({
  id: 'rag-production-checklist',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Checklist de RAG em produção',
      body: `Antes de chamar um RAG de pronto, cheque o pipeline inteiro.

### Retrieval

- chunking medido, não chutado;
- top-k ajustado por avaliação;
- filtros por permissão, produto e idioma;
- reranking quando o top-k semântico vier ruidoso.

### Geração

- prompt com regra de "não sei";
- fontes preservadas na resposta;
- limites de tamanho para contexto;
- logs de pergunta, chunks, resposta e latência.

### Operação

- cache para perguntas frequentes;
- custo por consulta monitorado;
- atualização/reindexação planejada;
- testes com perguntas reais.

> RAG bom é engenharia de busca mais engenharia de prompt, com avaliação no meio.`,
      rightBody: `\`\`\`txt
Pergunta real
  -> filtro de permissão
  -> retrieval top-k
  -> reranking opcional
  -> prompt com fontes
  -> resposta citável
  -> log + avaliação

Sinais para monitorar:
- fontes ausentes
- contexto grande demais
- latência alta
- custo por pergunta
- respostas sem evidência
\`\`\``,
    },
    'en-us': {
      title: 'Production RAG checklist',
      body: `Before calling a RAG system ready, check the whole pipeline.

### Retrieval

- measured chunking, not guessed;
- top-k tuned by evaluation;
- filters by permission, product, and language;
- reranking when semantic top-k is noisy.

### Generation

- prompt with an "I do not know" rule;
- sources preserved in the answer;
- size limits for context;
- logs for question, chunks, answer, and latency.

### Operation

- cache for frequent questions;
- cost per query monitored;
- planned update/reindexing;
- tests with real questions.

> Good RAG is search engineering plus prompt engineering, with evaluation in the middle.`,
      rightBody: `\`\`\`txt
Real question
  -> permission filter
  -> top-k retrieval
  -> optional reranking
  -> prompt with sources
  -> citable answer
  -> log + evaluation

Signals to monitor:
- missing sources
- oversized context
- high latency
- cost per question
- answers without evidence
\`\`\``,
    },
  },
});
