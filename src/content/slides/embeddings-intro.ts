import { defineSlide } from './_factory';

export const embeddingsIntro = defineSlide({
  id: 'embeddings-intro',
  type: 'two-column',
  options: { columnRatios: [0.44, 0.56] },
  content: {
    'pt-br': {
      title: 'O residual stream nasce aqui',
      body: `No slide anterior, a frase "We the people" virou os IDs \`[1135, 262, 661]\` num tensor \`idx\` de shape \`(B,T)\`. Mas esses números são só rótulos: a distância entre 1135 e 262 não significa nada. Eles não têm **geometria útil** — não dá para comparar, somar ou medir similaridade entre IDs.

A primeira transformação real do GPT-2 é dar geometria a esses IDs: convertê-los em vetores contínuos. As siglas que aparecem agora:

- **B (batch)**: 1 (uma frase por vez)
- **T (time/sequence length)**: 3 (três tokens)
- **C (channel / embedding dimension)**: 4 (largura do vetor de cada token, valor didático; no GPT-2 real é 768)

O forward começa com:

\`\`\`txt
x = wte(idx) + wpe(pos)
\`\`\`

**\`wte\`** ("weight token embedding" — abreviação usada no código original do GPT-2) é uma tabela treinável de shape \`(V, C)\` onde \`V\` é o tamanho do vocabulário (2048 no nosso exemplo). Cada linha \`wte[id]\` guarda o vetor que representa aquele token. \`wte(idx)\` faz um lookup: para cada ID em \`idx\`, busca a linha correspondente e devolve um tensor \`(B,T,C)\`.

**\`wpe\`** ("weight position embedding") é outra tabela treinável de shape \`(max_pos, C)\` — uma linha para cada posição possível na sequência. \`wpe(pos)\` faz o lookup posicional: posição 0 ganha um vetor, posição 1 ganha outro, etc.

**Por que duas tabelas separadas?** Conteúdo e posição são informações ortogonais: o token "the" pode estar na posição 0, 1 ou 2, e o significado muda. Ter duas tabelas permite que o modelo aprenda representações independentes para o que o token **é** e para **onde** ele está.

**A soma:**
\`\`\`txt
token_vectors = wte(idx)      # (B,T,C) — conteúdo
position_vectors = wpe(pos)   # (B,T,C) — posição
x = token_vectors + position_vectors  # (B,T,C)
\`\`\`

Cada posição no tensor resultado carrega a informação combinada de "que token está aqui" e "em que posição da sequência ele aparece". A soma (e não concatenação) mantém \`C\` fixo e força a rede a aprender a separar os dois sinais nas camadas seguintes.

**O residual stream:** Esse \`x\` de shape \`(B,T,C)\` é o barramento de informações do modelo. Todos os blocos seguintes (atenção, MLP) vão **ler** desse tensor e **escrever de volta** nele, somando suas saídas ao valor atual. Por isso se chama "residual" — cada transformação é um desvio (resíduo) que se acumula no stream original. O shape \`(B,T,C)\` nunca muda a partir daqui; só a representação interna evolui.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/embedding-residual-start
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 7], content: 'Começamos com `idx` (os IDs do slide anterior), extraímos `B` e `T` do shape, escolhemos `C=4` para didática e geramos posições com `torch.arange`.' },
        { lineRange: [9, 22], content: 'Criamos as tabelas `wte` (token, 2048×4) e `wpe` (posição, 16×4) e preenchemos manualmente com valores fixos. Cada token e cada posição ganha seu próprio vetor.' },
        { lineRange: [23, 25], content: 'O core da lição: `wte(idx)` busca vetores de conteúdo, `wpe(positions)` busca vetores de posição, e a soma dos dois gera `x` — o residual stream inicial.' },
        { lineRange: [27, 30], content: 'Os prints confirmam a mudança de shape: entrada `(B,T)` → vetores `(B,T,C)` → saída `(B,T,C)`. A dimensão `C` nasce aqui e nunca mais muda.' },
      ],
    },
    'en-us': {
      title: 'The residual stream starts here',
      body: `In the previous slide, the phrase "We the people" became IDs \`[1135, 262, 661]\` in a tensor \`idx\` of shape \`(B,T)\`. But those numbers are just labels: the distance between 1135 and 262 means nothing. IDs have no **useful geometry** — you cannot compare, sum, or measure similarity between them.

GPT-2's first real transformation is to give geometry to these IDs: convert them into continuous vectors. The abbreviations that now appear:

- **B (batch)**: 1 (one sentence at a time)
- **T (time/sequence length)**: 3 (three tokens)
- **C (channel / embedding dimension)**: 4 (width of each token's vector, didactic value; in real GPT-2 it is 768)

The forward pass starts with:

\`\`\`txt
x = wte(idx) + wpe(pos)
\`\`\`

**\`wte\`** ("weight token embedding" — the abbreviation used in the original GPT-2 code) is a trainable table of shape \`(V, C)\` where \`V\` is the vocabulary size (2048 in our example). Each row \`wte[id]\` stores the vector representing that token. \`wte(idx)\` performs a lookup: for every ID in \`idx\`, it fetches the corresponding row and returns a tensor \`(B,T,C)\`.

**\`wpe\`** ("weight position embedding") is another trainable table of shape \`(max_pos, C)\` — one row for each possible position in the sequence. \`wpe(pos)\` does the positional lookup: position 0 gets one vector, position 1 gets another, etc.

**Why two separate tables?** Content and position are orthogonal signals: the token "the" could be at position 0, 1, or 2, and its meaning changes. Having two tables lets the model learn independent representations for what the token **is** and **where** it sits.

**The sum:**
\`\`\`txt
token_vectors = wte(idx)      # (B,T,C) — content
position_vectors = wpe(pos)   # (B,T,C) — position
x = token_vectors + position_vectors  # (B,T,C)
\`\`\`

Each position in the result tensor carries combined information: "which token is here" and "where in the sequence it appears". Summing (instead of concatenating) keeps \`C\` fixed and forces the network to learn how to separate the two signals in later layers.

**The residual stream:** This \`x\` of shape \`(B,T,C)\` is the model's information bus. Every subsequent block (attention, MLP) will **read** from this tensor and **write back** to it by adding their outputs to the current value. That is why it's called "residual" — each transformation is a bypass (residue) that accumulates on the original stream. The shape \`(B,T,C)\` never changes from here on; only the internal representation evolves.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/embedding-residual-start
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 7], content: 'We start with `idx` (the IDs from the previous slide), extract `B` and `T` from its shape, pick `C=4` for clarity, and generate positions with `torch.arange`.' },
        { lineRange: [9, 22], content: 'We create `wte` (token, 2048×4) and `wpe` (position, 16×4) tables and manually fill them with fixed values. Each token and each position gets its own vector.' },
        { lineRange: [23, 25], content: 'The core lesson: `wte(idx)` fetches content vectors, `wpe(positions)` fetches position vectors, and their sum yields `x` — the initial residual stream.' },
        { lineRange: [27, 30], content: 'The prints confirm the shape change: input `(B,T)` → vectors `(B,T,C)` → output `(B,T,C)`. The `C` dimension is born here and never changes again.' },
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
