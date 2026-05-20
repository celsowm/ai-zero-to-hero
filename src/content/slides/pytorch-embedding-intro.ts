import { defineSlide } from './_factory';

export const pytorchEmbeddingIntro = defineSlide({
  id: 'pytorch-embedding-intro',
  type: 'two-column',
  options: { columnRatios: [0.54, 0.46] },
  content: {
    'pt-br': {
      title: 'Embedding: de ID inteiro para vetor',
      body: `No slide anterior (\`nn.Linear\`), vimos como projetar vetores (\`C -> V\`). Agora falta responder **de onde vem esse vetor \`C\`**.

É exatamente esse o papel de \`Embedding\`:
- antes: \`idx\` é inteiro em \`(B,T)\` (identidade simbólica, sem geometria útil);
- depois: cada ID vira vetor denso treinável, e o tensor passa a \`(B,T,C)\`.

Leitura prática:
1. a tabela \`E\` tem uma linha por token do vocabulário (\`V\`);
2. cada linha tem largura \`C\` (hidden/embedding dimension);
3. \`embedding(idx)\` faz lookup dessas linhas, preservando \`B\` e \`T\`.

O que cada dimensão significa:
- \`V\`: quantos tokens diferentes o modelo consegue indexar;
- \`C\`: quanta capacidade vetorial cada token recebe para carregar informação contextual ao longo da rede.

**Formal (curto):**
- $$idx \\in \\mathbb{Z}^{B\\times T}$$
- $$E \\in \\mathbb{R}^{V\\times C}$$
- $$H = E[idx] \\in \\mathbb{R}^{B\\times T\\times C}$$

Leitura de engenharia:
- conceitualmente equivale a \`one-hot @ W\`;
- operacionalmente é lookup eficiente (não multiplica vetor one-hot explícito);
- \`E\` é treinável, então tokens semanticamente próximos podem acabar próximos no espaço vetorial.

Checklist de debug neste ponto:
- \`idx\` precisa ser inteiro (\`torch.long\`);
- valores de \`idx\` precisam estar no intervalo \`[0, V-1]\`;
- shape esperado após embedding: \`(B,T,C)\`.

Conexão com próximos slides:
- este \`H\` é a entrada das projeções lineares;
- no próximo passo, \`Linear(C,V)\` transforma representação em logits por token.

Resumo mental: **Embedding não decide token; embedding cria representação para o resto da rede decidir.**`,
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
      body: `In the previous slide (\`nn.Linear\`), we saw how to project vectors (\`C -> V\`). Now one key question remains: **where does that \`C\`-wide vector come from?**

That is exactly the job of \`Embedding\`:
- before: \`idx\` is integer-only data in \`(B,T)\` (symbolic identity, no useful geometry yet);
- after: each ID becomes a trainable dense vector, so shape becomes \`(B,T,C)\`.

Practical reading:
1. table \`E\` has one row per vocabulary token (\`V\`);
2. each row has width \`C\` (hidden/embedding dimension);
3. \`embedding(idx)\` performs row lookup while preserving \`B\` and \`T\`.

What each dimension means:
- \`V\`: how many distinct tokens can be indexed;
- \`C\`: how much vector capacity each token gets to carry information through the network.

**Formal (short):**
- $$idx \\in \\mathbb{Z}^{B\\times T}$$
- $$E \\in \\mathbb{R}^{V\\times C}$$
- $$H = E[idx] \\in \\mathbb{R}^{B\\times T\\times C}$$

Engineering reading:
- conceptually this matches \`one-hot @ W\`;
- operationally it is efficient lookup (no explicit one-hot multiplication);
- \`E\` is trainable, so semantically related tokens can move closer in vector space.

Debug checklist at this stage:
- \`idx\` must be integer type (\`torch.long\`);
- \`idx\` values must stay in range \`[0, V-1]\`;
- expected post-embedding shape is \`(B,T,C)\`.

Connection to next slides:
- this \`H\` is the input consumed by linear projections;
- next, \`Linear(C,V)\` turns representation into per-token logits.

Mental summary: **Embedding does not choose the token; embedding builds the representation so the network can choose.**`,
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
