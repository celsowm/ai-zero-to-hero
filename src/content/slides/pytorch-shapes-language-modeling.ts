import { defineSlide } from './_factory';

export const pytorchShapesLanguageModeling = defineSlide({
  id: 'pytorch-shapes-language-modeling',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Quando a entrada vira sequência: B, T, C, V',
      body: `No slide anterior, o batch era uma tabela: \`X (B,F) -> hidden (B,H) -> y_hat (B,O)\`. Agora a entrada deixa de ser “uma linha com colunas” e passa a ser **uma sequência de tokens**.

A primeira ideia continua igual: **B ainda é o batch**. O que muda é que cada exemplo do batch agora tem várias posições.

### O novo eixo: T

Em dados tabulares, cada paciente era descrito por features.

Em texto, cada exemplo é uma sequência:

\`token_ids (B,T)\`

- **B = batch**: quantas sequências entram juntas.
- **T = sequence length**: quantas posições/tokens existem em cada sequência.

Exemplo: \`(2,4)\` significa **2 sequências**, cada uma com **4 tokens**.

### Quando cada token vira vetor: C

Depois que os IDs entram no modelo, cada token vira uma representação interna:

\`hidden_states (B,T,C)\`

- **C = hidden width**: quantos números representam cada token internamente.

Exemplo: \`(2,4,8)\` significa: para cada uma das 2 sequências, em cada uma das 4 posições, existe um vetor com 8 números.

### Quando o modelo precisa escolher o próximo token: V

Para prever texto, o modelo não devolve só um número. Ele cria um placar para o vocabulário inteiro:

\`output_scores (B,T,V)\`

- **V = vocabulary size**: quantos tokens possíveis o modelo conhece.

Exemplo: \`(2,4,50)\` significa: em cada posição, o modelo produziu 50 scores, um para cada candidato do vocabulário.

Regra mental:

\`IDs (B,T) -> vetores internos (B,T,C) -> scores de saída (B,T,V)\`

Esse slide é só o contrato de shape. No próximo, travamos o contrato de \`dtype\`: IDs são inteiros; vetores e scores são floats.`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/tensor-primer
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 10], content: 'O contrato começa nomeando B, T, C e V. A diferença para o slide tabular é a entrada de T: o eixo da sequência.' },
        { lineRange: [12, 19], content: '`token_ids` é `(B, T)`: cada linha é uma sequência e cada coluna é uma posição/token. Como são IDs, o dtype é `torch.long`.' },
        { lineRange: [21, 23], content: '`hidden_states` é `(B, T, C)`: cada token, em cada posição, ganha um vetor interno de largura C.' },
        { lineRange: [25, 29], content: '`output_scores` é `(B, T, V)`: cada posição recebe um placar com V candidatos de vocabulário.' },
        { lineRange: [31, 36], content: 'Os acessos `token_ids[0,1]`, `hidden_states[0,1]` e `output_scores[0,1]` mostram a mesma posição atravessando os três níveis.' },
        { lineRange: [38, 41], content: 'Os prints finais fecham a leitura operacional por shape e dtype.' },
      ],
    },
    'en-us': {
      title: 'When input becomes a sequence: B, T, C, V',
      body: `In the previous slide, the batch was a table: \`X (B,F) -> hidden (B,H) -> y_hat (B,O)\`. Now the input stops being “one row with columns” and becomes **a sequence of tokens**.

The first idea remains the same: **B is still the batch**. What changes is that each example in the batch now has multiple positions.

### The new axis: T

In tabular data, each patient was described by features.

In text, each example is a sequence:

\`token_ids (B,T)\`

- **B = batch**: how many sequences enter together.
- **T = sequence length**: how many positions/tokens each sequence has.

Example: \`(2,4)\` means **2 sequences**, each with **4 tokens**.

### When each token becomes a vector: C

After IDs enter the model, each token becomes an internal representation:

\`hidden_states (B,T,C)\`

- **C = hidden width**: how many numbers represent each token internally.

Example: \`(2,4,8)\` means: for each of the 2 sequences, at each of the 4 positions, there is a vector with 8 numbers.

### When the model must choose the next token: V

To predict text, the model does not return just one number. It creates a scoreboard over the full vocabulary:

\`output_scores (B,T,V)\`

- **V = vocabulary size**: how many possible tokens the model knows.

Example: \`(2,4,50)\` means: at each position, the model produced 50 scores, one for each vocabulary candidate.

Mental rule:

\`IDs (B,T) -> internal vectors (B,T,C) -> output scores (B,T,V)\`

This slide is only the shape contract. Next, we lock the \`dtype\` contract: IDs are integers; vectors and scores are floats.`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/tensor-primer
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 10], content: 'The contract starts by naming B, T, C, and V. The difference from the tabular slide is T: the sequence axis.' },
        { lineRange: [12, 19], content: '`token_ids` is `(B, T)`: each row is a sequence and each column is a token position. Since these are IDs, dtype is `torch.long`.' },
        { lineRange: [21, 23], content: '`hidden_states` is `(B, T, C)`: each token at each position gets an internal width-C vector.' },
        { lineRange: [25, 29], content: '`output_scores` is `(B, T, V)`: each position receives a scoreboard with V vocabulary candidates.' },
        { lineRange: [31, 36], content: 'The accesses `token_ids[0,1]`, `hidden_states[0,1]`, and `output_scores[0,1]` show the same position crossing the three levels.' },
        { lineRange: [38, 41], content: 'The final prints close the operational reading by shape and dtype.' },
      ],
    },
  },
});
