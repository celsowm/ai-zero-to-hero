import { defineSlide } from './_factory';

export const ragRetrieval = defineSlide({
  id: 'rag-retrieval',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Retrieval: o ranking que decide o contexto',
      body: `Retrieval é a etapa que recebe a pergunta e escolhe os chunks que entrarão no prompt.

### Controles principais

- **top-k:** quantos chunks retornar.
- **score/distância:** quão perto cada chunk está da pergunta.
- **filtro de metadata:** restringe por produto, idioma, permissão ou data.
- **busca híbrida:** combina semântica com palavra-chave quando necessário.

### Erros comuns

- top-k baixo demais perde evidência.
- top-k alto demais polui o contexto.
- filtro ausente pode vazar documento de outro produto ou cliente.

> A resposta final herda os acertos e erros do ranking.`,
    },
    'en-us': {
      title: 'Retrieval: the ranking that chooses context',
      body: `Retrieval is the step that receives the question and chooses the chunks that will enter the prompt.

### Main controls

- **top-k:** how many chunks to return.
- **score/distance:** how close each chunk is to the question.
- **metadata filter:** restricts by product, language, permission, or date.
- **hybrid search:** combines semantics with keyword matching when needed.

### Common mistakes

- top-k too low loses evidence.
- top-k too high pollutes the context.
- missing filters may leak a document from another product or customer.

> The final answer inherits the ranking's wins and mistakes.`,
    },
  },
  visual: {
    id: 'chromadb-search-visual',
    copy: {
      'pt-br': {
        title: 'Query -> VectorDB -> Ranking',
        queryLabel: 'Pergunta',
        queryText: 'prazo de reembolso?',
        dbLabel: 'VectorDB',
        searchLabel: 'Busca vetorial',
        rankLabel: 'Ranking por similaridade',
        result1: 'Política de reembolso',
        result2: 'Plano Pro',
        result3: 'Integrações',
        score1: '0.18',
        score2: '0.51',
        score3: '0.88',
        topKLabel: 'Top-K',
      },
      'en-us': {
        title: 'Query -> VectorDB -> Ranking',
        queryLabel: 'Question',
        queryText: 'refund window?',
        dbLabel: 'VectorDB',
        searchLabel: 'Vector search',
        rankLabel: 'Ranking by similarity',
        result1: 'Refund policy',
        result2: 'Pro plan',
        result3: 'Integrations',
        score1: '0.18',
        score2: '0.51',
        score3: '0.88',
        topKLabel: 'Top-K',
      },
    },
  },
});
