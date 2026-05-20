import { defineSlide } from './_factory';

export const pytorchEmbeddingIntro = defineSlide({
  id: 'pytorch-embedding-intro',
  type: 'two-column',
  options: { columnRatios: [0.54, 0.46] },
  content: {
    'pt-br': {
      title: 'Embedding: de ID inteiro para vetor',
      body: `**Intuição:** um token ID (ex: \`42\`) é só um índice. \`Embedding\` é a etapa que "insere/imersa" esse índice em espaço contínuo.

**Operação:**
1. cada linha da tabela representa um token do vocabulário
2. a largura da linha é \`C\` (hidden size)
3. \`embedding(idx)\` troca \`(B, T)\` por \`(B, T, C)\`

**Formal (curto):**
- $$idx \in \mathbb{Z}^{B\times T}$$
- $$E \in \mathbb{R}^{V\times C}$$
- $$H = E[idx] \in \mathbb{R}^{B\times T\times C}$$

Leitura de engenharia:
- conceitualmente equivale a \`one-hot @ W\`
- operacionalmente é lookup eficiente (busca só as linhas necessárias)
- a tabela é treinável, então a geometria útil é aprendida`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/embedding-intro
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'Definimos tamanho de vocabulário e largura dos vetores e criamos a tabela de embedding.' },
        { lineRange: [6, 8], content: 'A entrada ainda é inteira: cada ID funciona como índice para uma linha da tabela.' },
        { lineRange: [10, 13], content: 'A chamada da embedding devolve vetores densos e deixa explícita a conversão de ID para representação contínua.' },
      ],
    },
    'en-us': {
      title: 'Embedding: from integer ID to vector',
      body: `**Intuition:** a token ID (for example \`42\`) is only an index. \`Embedding\` is the step that inserts/immerses this index into continuous space.

**Operation:**
1. each table row represents one vocabulary token
2. row width is \`C\` (hidden size)
3. \`embedding(idx)\` turns \`(B, T)\` into \`(B, T, C)\`

**Formal (short):**
- $$idx \in \mathbb{Z}^{B\times T}$$
- $$E \in \mathbb{R}^{V\times C}$$
- $$H = E[idx] \in \mathbb{R}^{B\times T\times C}$$

Engineering reading:
- conceptually this matches \`one-hot @ W\`
- operationally it is an efficient lookup (fetch only required rows)
- the table is trainable, so useful geometry is learned`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/embedding-intro
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'We define vocabulary size and vector width, then initialize the embedding table.' },
        { lineRange: [6, 8], content: 'Inputs are still integers: each token ID indexes one row in that table.' },
        { lineRange: [10, 13], content: 'Embedding lookup returns dense vectors and makes the ID -> representation conversion explicit.' },
      ],
    },
  },
});
