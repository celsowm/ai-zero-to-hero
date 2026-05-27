import { defineSlide } from './_factory';

export const ragEvaluation = defineSlide({
  id: 'rag-evaluation',
  type: 'two-column',
  options: { columnRatios: [0.42, 0.58] },
  content: {
    'pt-br': {
      title: 'Avalie retrieval antes da resposta',
      body: `Em RAG, há dois sistemas para avaliar:

1. **retriever:** encontrou as fontes corretas?
2. **generator:** respondeu fielmente às fontes?

Se você avalia só a resposta final, não sabe onde o erro nasceu.

### Métricas iniciais

- **recall@k:** a fonte correta apareceu entre os k resultados?
- **precisão de fonte:** os chunks recuperados eram realmente úteis?
- **fidelidade:** a resposta disse algo que não estava no contexto?

> Primeiro faça o RAG achar a página certa. Depois faça o LLM escrever bem.`,
      rightBody: `\`\`\`python
snippet:rag_v2/evaluation-mini
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 4], content: 'Gabarito pequeno: cada pergunta tem uma ou mais fontes que deveriam aparecer no retrieval.' },
        { lineRange: [6, 9], content: 'Resultado simulado do retriever, separado da geração do LLM.' },
        { lineRange: [11, 14], content: 'A métrica mínima checa se pelo menos uma fonte correta apareceu no top-k.' },
      ],
    },
    'en-us': {
      title: 'Evaluate retrieval before the answer',
      body: `In RAG, there are two systems to evaluate:

1. **retriever:** did it find the right sources?
2. **generator:** did it answer faithfully from the sources?

If you only evaluate the final answer, you do not know where the error started.

### Starter metrics

- **recall@k:** did the correct source appear in the k results?
- **source precision:** were the retrieved chunks actually useful?
- **faithfulness:** did the answer say something not in context?

> First make RAG find the right page. Then make the LLM write well.`,
      rightBody: `\`\`\`python
snippet:rag_v2/evaluation-mini
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 4], content: 'Small gold set: each question has one or more sources that should appear in retrieval.' },
        { lineRange: [6, 9], content: 'Simulated retriever result, separated from LLM generation.' },
        { lineRange: [11, 14], content: 'The minimal metric checks whether at least one correct source appeared in top-k.' },
      ],
    },
  },
});
