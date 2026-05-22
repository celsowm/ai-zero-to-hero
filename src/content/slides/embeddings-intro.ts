import { defineSlide } from './_factory';

export const embeddingsIntro = defineSlide({
  id: 'embeddings-intro',
  type: 'two-column',
  options: { columnRatios: [0.44, 0.56] },
  content: {
    'pt-br': {
      title: 'O residual stream nasce aqui',
      body: `IDs não têm geometria útil. O GPT-2 precisa transformar \`idx (B,T)\` em vetores contínuos.

O primeiro passo real do forward é:

\`\`\`txt
x = wte(idx) + wpe(pos)
\`\`\`

O que cada termo faz:

1. \`wte\`: tabela treinável de conteúdo do token
2. \`wpe\`: tabela treinável de posição
3. soma: junta "o que é o token" com "onde ele está"

Depois dessa soma, temos \`x (B,T,C)\`. Esse é o residual stream inicial que será modificado por todos os blocos.

Leitura importante: o shape muda de \`(B,T)\` para \`(B,T,C)\`; a partir daqui, a torre preserva esse shape e muda a representação.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/embedding-residual-start
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 7], content: 'Começamos com `idx`, extraímos `B,T`, escolhemos uma largura didática `C=4` e criamos posições.' },
        { lineRange: [9, 22], content: 'As tabelas `wte` e `wpe` são preenchidas com valores fixos para mostrar conteúdo e posição separadamente.' },
        { lineRange: [23, 25], content: 'Token vectors e position vectors são somados para formar `x`, o residual stream inicial.' },
        { lineRange: [27, 30], content: 'Os prints confirmam os shapes: entrada `(B,T)`, vetores `(B,T,C)` e saída `(B,T,C)`.' },
      ],
    },
    'en-us': {
      title: 'The residual stream starts here',
      body: `IDs do not have useful geometry. GPT-2 must turn \`idx (B,T)\` into continuous vectors.

The first real forward step is:

\`\`\`txt
x = wte(idx) + wpe(pos)
\`\`\`

What each term does:

1. \`wte\`: trainable token-content table
2. \`wpe\`: trainable position table
3. sum: combines "what the token is" with "where it is"

After this sum, we have \`x (B,T,C)\`. This is the initial residual stream that every block will modify.

Key reading: shape changes from \`(B,T)\` to \`(B,T,C)\`; from here on, the tower preserves that shape and changes the representation.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/embedding-residual-start
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 7], content: 'We start with `idx`, extract `B,T`, choose a teaching width `C=4`, and create positions.' },
        { lineRange: [9, 22], content: '`wte` and `wpe` are filled with fixed values to show content and position separately.' },
        { lineRange: [23, 25], content: 'Token vectors and position vectors are summed to form `x`, the initial residual stream.' },
        { lineRange: [27, 30], content: 'The prints verify shapes: input `(B,T)`, vectors `(B,T,C)`, and output `(B,T,C)`.' },
      ],
    },
  },
  visual: {
    id: 'gpt2-embedding-residual',
    copy: {
      'pt-br': {
        title: 'Nascimento de x',
        subtitle: 'IDs discretos entram em duas tabelas treináveis e viram o residual stream inicial.',
        idxLabel: 'idx',
        tokenEmbeddingLabel: 'wte(idx)',
        positionEmbeddingLabel: 'wpe(pos)',
        sumLabel: 'soma',
        outputLabel: 'x: (B,T,C)',
        tokens: ['We', ' the', ' people'],
        tokenIds: [1135, 262, 661],
        positions: [0, 1, 2],
        tokenVectors: [
          [1.0, 0.2, 0.0, 0.1],
          [0.1, 1.0, 0.3, 0.0],
          [0.7, 0.4, 1.0, 0.2],
        ],
        positionVectors: [
          [0.0, 0.0, 0.0, 0.0],
          [0.1, 0.0, 0.0, 0.2],
          [0.2, 0.1, 0.0, 0.3],
        ],
        outputVectors: [
          [1.0, 0.2, 0.0, 0.1],
          [0.2, 1.0, 0.3, 0.2],
          [0.9, 0.5, 1.0, 0.5],
        ],
        takeaways: [
          'Token embedding carrega conteúdo.',
          'Position embedding carrega ordem.',
          'A soma vira o estado que os blocos editam.',
        ],
      },
      'en-us': {
        title: 'Birth of x',
        subtitle: 'Discrete IDs enter two trainable tables and become the initial residual stream.',
        idxLabel: 'idx',
        tokenEmbeddingLabel: 'wte(idx)',
        positionEmbeddingLabel: 'wpe(pos)',
        sumLabel: 'sum',
        outputLabel: 'x: (B,T,C)',
        tokens: ['We', ' the', ' people'],
        tokenIds: [1135, 262, 661],
        positions: [0, 1, 2],
        tokenVectors: [
          [1.0, 0.2, 0.0, 0.1],
          [0.1, 1.0, 0.3, 0.0],
          [0.7, 0.4, 1.0, 0.2],
        ],
        positionVectors: [
          [0.0, 0.0, 0.0, 0.0],
          [0.1, 0.0, 0.0, 0.2],
          [0.2, 0.1, 0.0, 0.3],
        ],
        outputVectors: [
          [1.0, 0.2, 0.0, 0.1],
          [0.2, 1.0, 0.3, 0.2],
          [0.9, 0.5, 1.0, 0.5],
        ],
        takeaways: [
          'Token embedding carries content.',
          'Position embedding carries order.',
          'The sum becomes the state edited by blocks.',
        ],
      },
    },
  },
});
