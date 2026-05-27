import { defineSlide } from './_factory';

export const ragChunking = defineSlide({
  id: 'rag-chunking',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Chunking: cortar sem destruir contexto',
      body: `Documentos longos raramente entram inteiros no vector store. Eles são quebrados em **chunks**.

### Tradeoff principal

- **Chunk pequeno:** busca mais precisa, mas pode perder contexto.
- **Chunk grande:** preserva contexto, mas mistura assuntos e piora o ranking.
- **Overlap:** repete um pedaço entre chunks para não cortar uma ideia no meio.

### Regra prática

Comece com chunks de 300 a 800 tokens, overlap de 10% a 20%, e ajuste medindo retrieval.

> Chunking é uma decisão de recuperação, não só uma decisão de tamanho.`,
      rightBody: `\`\`\`txt
Documento:
[ política de reembolso ... plano Pro ... exceções ... ]

Sem overlap:
[ política de reembolso ... ]
                    [ plano Pro ... exceções ... ]

Com overlap:
[ política de reembolso ... plano Pro ]
                    [ plano Pro ... exceções ... ]
\`\`\``,
    },
    'en-us': {
      title: 'Chunking: split without destroying context',
      body: `Long documents rarely enter the vector store whole. They are split into **chunks**.

### Main tradeoff

- **Small chunk:** more precise search, but context may be lost.
- **Large chunk:** preserves context, but mixes topics and hurts ranking.
- **Overlap:** repeats a slice between chunks so an idea is not cut in half.

### Practical rule

Start with 300 to 800 token chunks, 10% to 20% overlap, then tune by measuring retrieval.

> Chunking is a retrieval decision, not just a size decision.`,
      rightBody: `\`\`\`txt
Document:
[ refund policy ... Pro plan ... exceptions ... ]

No overlap:
[ refund policy ... ]
                  [ Pro plan ... exceptions ... ]

With overlap:
[ refund policy ... Pro plan ]
                  [ Pro plan ... exceptions ... ]
\`\`\``,
    },
  },
});
