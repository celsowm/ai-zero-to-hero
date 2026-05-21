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
- depois: cada ID vira vetor denso treinável, e o tensor passa a \`(B,T,C)\` (\`C\` = largura do vetor de embedding / dimensão vetorial por token).

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
    },
    'en-us': {
      title: 'Embedding: from integer ID to vector',
      body: `In the previous slide (\`nn.Linear\`), we saw how to project vectors (\`C -> V\`). Now one key question remains: **where does that \`C\`-wide vector come from?**

That is exactly the job of \`Embedding\`:
- before: \`idx\` is integer-only data in \`(B,T)\` (symbolic identity, no useful geometry yet);
- after: each ID becomes a trainable dense vector, so shape becomes \`(B,T,C)\` (\`C\` = embedding vector width / per-token representation dimension).

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
    },
  },
  visual: {
    id: 'pytorch-embedding-intro',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Código' }, { label: 'Explorador' }],
        codePanel: {
          title: 'Embedding: lookup na tabela',
          description: 'Exemplo curto que mostra o lookup de IDs inteiros na tabela de embedding.',
          source: { snippetId: 'pytorch-lm/embedding-intro', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 6], content: 'Importamos torch e nn. Definimos V (vocabulário), C (dimensão do embedding) e criamos a tabela de embedding.' },
            { lineRange: [7, 10], content: 'A tabela de embedding tem shape (V, C) e é treinável — gradientes fluem por ela durante o backward.' },
            { lineRange: [11, 14], content: 'Criamos um tensor de índices inteiros (batch=2, seq=3) e fazemos lookup na tabela.' },
            { lineRange: [15, 18], content: 'Shape após lookup: (B,T,C). Token 42 ganha um vetor de 16 dimensões.' },
            { lineRange: [19, 23], content: 'Internamente é um one-hot indexado, não multiplicado — eficiente porque evita construir a matriz one-hot gigante.' },
          ],
        },
        embedExplorer: {
          title: 'Tabela de embedding interativa',
          subtitle: 'Clique em uma linha para ver como o lookup funciona: ID inteiro → vetor denso.',
          sequenceLabel: 'Entrada idx (B,T)',
          tableLabel: 'Tabela E (V,C)',
          outputLabel: 'Saida H (B,T,C)',
          vocabSizeLabel: 'Vocabulário (V)',
          embedDimLabel: 'Dimensão (C)',
          rowLabel: 'Token',
          maxIdLabel: 'Lookup ativo',
          stepperLabel: 'Percorra posicoes (b,t)',
          prevLabel: 'Anterior',
          nextLabel: 'Proximo',
          activePositionLabel: 'Posicao ativa',
          selectedTokenLabel: 'ID selecionado',
          selectedVectorLabel: 'Vetor retornado',
          lookupLabel: 'Lookup',
          lookupBody: 'embedding(idx) percorre a linha correspondente e retorna o vetor. Não há multiplicação de matriz — é puramente indexação.',
          sharedWeightsHint: 'A mesma tabela é usada para todas as posições da sequência e todos os batches. Não existe uma tabela por token de entrada.',
          footer: 'Regra: embedding não computa representação contextual — ele apenas fornece o ponto de partida vetorial para cada token.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Explorer' }],
        codePanel: {
          title: 'Embedding: table lookup',
          description: 'Short example showing the integer-ID lookup in the embedding table.',
          source: { snippetId: 'pytorch-lm/embedding-intro', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 6], content: 'Import torch and nn. Define V (vocab size), C (embedding dim), then create the embedding table.' },
            { lineRange: [7, 10], content: 'The embedding table has shape (V, C) and is trainable — gradients flow through it during backward.' },
            { lineRange: [11, 14], content: 'Create an integer index tensor (batch=2, seq=3) and look up rows in the table.' },
            { lineRange: [15, 18], content: 'Post-lookup shape: (B,T,C). Token 42 gets a 16-dimensional vector.' },
            { lineRange: [19, 23], content: 'Internally: indexed one-hot, not multiplied — efficient because it avoids building the huge one-hot matrix.' },
          ],
        },
        embedExplorer: {
          title: 'Interactive embedding table',
          subtitle: 'Click a row to see how lookup works: integer ID → dense vector.',
          sequenceLabel: 'Input idx (B,T)',
          tableLabel: 'Embedding table E (V,C)',
          outputLabel: 'Output H (B,T,C)',
          vocabSizeLabel: 'Vocabulary (V)',
          embedDimLabel: 'Dimension (C)',
          rowLabel: 'Token',
          maxIdLabel: 'Active lookup',
          stepperLabel: 'Walk positions (b,t)',
          prevLabel: 'Prev',
          nextLabel: 'Next',
          activePositionLabel: 'Active position',
          selectedTokenLabel: 'Selected ID',
          selectedVectorLabel: 'Returned vector',
          lookupLabel: 'Lookup',
          lookupBody: 'embedding(idx) walks the matching row and returns the vector. No matrix multiplication — it is pure indexing.',
          sharedWeightsHint: 'The same table is shared across all sequence positions and batches. There is no per-input-token table.',
          footer: 'Rule: embedding does not compute contextual representation — it only provides the starting vector for each token.',
        },
      },
    },
  },
});
