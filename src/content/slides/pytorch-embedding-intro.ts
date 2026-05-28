import { defineSlide } from './_factory';

export const pytorchEmbeddingIntro = defineSlide({
  id: 'pytorch-embedding-intro',
  type: 'two-column',
  options: { columnRatios: [0.54, 0.46] },
  content: {
    'pt-br': {
      title: 'Embedding: de ID inteiro para vetor',
      body: `Antes de o modelo "pensar" em linguagem, ele precisa transformar tokens em números úteis.

Cada token começa como um ID inteiro:

\`\`\`text
idx.shape = (2, 3)
\`\`\`

Mas um ID como \`42\` sozinho não carrega significado vetorial. Por isso usamos uma tabela de embedding:

\`\`\`text
embedding.weight.shape = (V, C)
\`\`\`

No exemplo:

\`\`\`text
V = 1000 tokens possíveis
C = 16 dimensões por token
\`\`\`

Essa tabela tem uma linha para cada token do vocabulário. Quando passamos IDs para o embedding, o PyTorch faz um lookup: cada ID pega sua linha correspondente.

Assim:

\`\`\`text
token 42 → linha 42 da tabela → vetor de tamanho 16
\`\`\`

O resultado é:

\`\`\`text
tok_vectors.shape = (2, 3, 16)
\`\`\`

Ou seja: para cada token da sequência, agora temos uma representação vetorial treinável.

Importante:

\`\`\`text
embedding.weight.requires_grad = True
\`\`\`

Isso significa que a tabela de embeddings aprende durante o treinamento. Os vetores começam aleatórios, mas são ajustados por gradiente para representar melhor os tokens.

Conceitualmente, embedding é parecido com:

\`\`\`text
one-hot do token @ matriz W
\`\`\`

Um **one-hot** é um vetor do tamanho do vocabulário, cheio de zeros, com apenas um \`1\` na posição do token.

Por exemplo, para o token \`42\`, seria um vetor de tamanho \`1000\` com \`1\` na posição \`42\` e \`0\` em todas as outras.

Mas, na prática, o PyTorch não cria esse vetor one-hot gigante. Ele simplesmente indexa direto a linha certa da tabela:

\`\`\`text
embedding.weight[42]
\`\`\``,
    },
    'en-us': {
      title: 'Embedding: from integer ID to vector',
      body: `Before the model can "think" in language, it needs to turn tokens into useful numbers.

Each token starts as an integer ID:

\`\`\`text
idx.shape = (2, 3)
\`\`\`

But an ID like \`42\` alone carries no vector meaning. So we use an embedding table:

\`\`\`text
embedding.weight.shape = (V, C)
\`\`\`

In the example:

\`\`\`text
V = 1000 possible tokens
C = 16 dimensions per token
\`\`\`

This table has one row for each token in the vocabulary. When we pass IDs to the embedding, PyTorch does a lookup: each ID fetches its corresponding row.

Like this:

\`\`\`text
token 42 → row 42 of the table → vector of size 16
\`\`\`

The result is:

\`\`\`text
tok_vectors.shape = (2, 3, 16)
\`\`\`

That means: for each token in the sequence, we now have a trainable vector representation.

Important:

\`\`\`text
embedding.weight.requires_grad = True
\`\`\`

This means the embedding table learns during training. The vectors start random but are adjusted by gradient to better represent the tokens.

Conceptually, embedding is similar to:

\`\`\`text
one-hot of token @ matrix W
\`\`\`

A **one-hot** is a vector the size of the vocabulary, full of zeros, with a single \`1\` at the token's position.

For example, for token \`42\`, it would be a vector of size \`1000\` with \`1\` at position \`42\` and \`0\` everywhere else.

But in practice, PyTorch does not build this giant one-hot vector. It simply indexes the right row directly:

\`\`\`text
embedding.weight[42]
\`\`\``,
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
