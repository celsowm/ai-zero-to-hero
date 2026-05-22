import { defineSlide } from './_factory';

export const pytorchShapesLanguageModeling = defineSlide({
  id: 'pytorch-shapes-language-modeling',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'De features para sequência: B, T, C, V',
      body: `No caso dos pacientes, cada exemplo cabia em uma linha fixa: idade, pressão, colesterol e fumante. Esse contrato era suficiente para uma rede tabular:

\`X (B,F) -> hidden (B,H) -> y_hat (B,O)\`

Mas para **problemas de linguagem**, o dado não chega assim. Uma frase não é só um conjunto de colunas: ela é uma sequência ordenada de tokens. A posição importa, porque trocar a ordem dos tokens muda o sentido e muda também o que o modelo deve prever.

Por isso, o contrato muda. O batch continua existindo — ainda podemos processar vários exemplos ao mesmo tempo — mas cada exemplo agora tem um eixo interno de posições.

Esse novo eixo é **T**.

### Primeiro contrato: tokens como IDs

Texto cru não entra direto na rede. Antes, ele vira IDs inteiros de tokens:

\`token_ids (B,T)\`

- **B = batch**: quantas sequências entram juntas.
- **T = sequence length**: quantas posições/tokens existem em cada sequência.

Exemplo: \`(2,4)\` significa **2 sequências**, cada uma com **4 posições**.

### Segundo contrato: IDs viram representação interna

IDs inteiros são bons para indexar tokens, mas ainda são pobres para cálculo neural. Dentro do modelo, cada posição vira um vetor:

\`hidden_states (B,T,C)\`

- **C = hidden width**: quantos números representam cada token internamente.

Exemplo: \`(2,4,8)\` significa: para cada uma das 2 sequências, em cada uma das 4 posições, existe um vetor com 8 números.

### Terceiro contrato: prever linguagem exige vocabulário

Se a tarefa é prever o próximo token, o modelo precisa comparar candidatos. Ele não devolve uma única resposta: ele cria um placar para o vocabulário inteiro.

\`output_scores (B,T,V)\`

- **V = vocabulary size**: quantos tokens possíveis o modelo conhece.

Exemplo: \`(2,4,50)\` significa: em cada posição, o modelo produziu 50 scores, um para cada candidato do vocabulário.

Regra mental:

\`IDs (B,T) -> vetores internos (B,T,C) -> scores de saída (B,T,V)\`

Esse slide é a ponte entre rede tabular e modelo de linguagem: **B permanece**, mas linguagem adiciona **T**, transforma cada posição em **C** e prevê sobre **V**.`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/tensor-primer
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'O contrato começa nomeando B, T, C e V. A motivação é a mudança de problema: de tabela tabular para sequência de linguagem.' },
        { lineRange: [12, 19], content: '`token_ids` é `(B, T)`: cada linha é uma sequência e cada coluna é uma posição/token. Como são IDs, o dtype é `torch.long`.' },
        { lineRange: [21, 23], content: '`hidden_states` é `(B, T, C)`: cada token, em cada posição, ganha um vetor interno de largura C.' },
        { lineRange: [25, 29], content: '`output_scores` é `(B, T, V)`: cada posição recebe um placar com V candidatos de vocabulário, porque o problema é prever tokens.' },
        { lineRange: [31, 36], content: 'Os acessos `token_ids[0,1]`, `hidden_states[0,1]` e `output_scores[0,1]` mostram a mesma posição atravessando os três níveis.' },
        { lineRange: [36, 40], content: 'Os prints finais fecham a leitura operacional por shape e dtype.' },
      ],
    },
    'en-us': {
      title: 'From features to sequences: B, T, C, V',
      body: `In the patient example, each input fit into one fixed row: age, blood pressure, cholesterol, and smoker. That contract was enough for a tabular network:

\`X (B,F) -> hidden (B,H) -> y_hat (B,O)\`

But for **language problems**, data does not arrive that way. A sentence is not just a set of columns: it is an ordered sequence of tokens. Position matters, because changing token order changes meaning and also changes what the model should predict.

So the contract changes. The batch still exists — we can still process multiple examples at once — but each example now has an internal axis of positions.

That new axis is **T**.

### First contract: tokens as IDs

Raw text does not go directly into the network. First, it becomes integer token IDs:

\`token_ids (B,T)\`

- **B = batch**: how many sequences enter together.
- **T = sequence length**: how many positions/tokens each sequence has.

Example: \`(2,4)\` means **2 sequences**, each with **4 positions**.

### Second contract: IDs become internal representations

Integer IDs are useful for indexing tokens, but still poor for neural computation. Inside the model, each position becomes a vector:

\`hidden_states (B,T,C)\`

- **C = hidden width**: how many numbers represent each token internally.

Example: \`(2,4,8)\` means: for each of the 2 sequences, at each of the 4 positions, there is a vector with 8 numbers.

### Third contract: predicting language requires vocabulary

If the task is to predict the next token, the model must compare candidates. It does not return one single answer: it creates a scoreboard over the whole vocabulary.

\`output_scores (B,T,V)\`

- **V = vocabulary size**: how many possible tokens the model knows.

Example: \`(2,4,50)\` means: at each position, the model produced 50 scores, one for each vocabulary candidate.

Mental rule:

\`IDs (B,T) -> internal vectors (B,T,C) -> output scores (B,T,V)\`

This slide is the bridge between tabular networks and language models: **B remains**, but language adds **T**, turns each position into **C**, and predicts over **V**.`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/tensor-primer
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'The contract starts by naming B, T, C, and V. The motivation is the problem shift: from tabular data to language sequences.' },
        { lineRange: [12, 19], content: '`token_ids` is `(B, T)`: each row is a sequence and each column is a token position. Since these are IDs, dtype is `torch.long`.' },
        { lineRange: [21, 23], content: '`hidden_states` is `(B, T, C)`: each token at each position gets an internal width-C vector.' },
        { lineRange: [25, 29], content: '`output_scores` is `(B, T, V)`: each position receives a scoreboard with V vocabulary candidates, because the problem is token prediction.' },
        { lineRange: [31, 36], content: 'The accesses `token_ids[0,1]`, `hidden_states[0,1]`, and `output_scores[0,1]` show the same position crossing the three levels.' },
        { lineRange: [36, 40], content: 'The final prints close the operational reading by shape and dtype.' },
      ],
    },
  },
});
