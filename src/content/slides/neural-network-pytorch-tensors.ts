import { defineSlide } from './_factory';

export const neuralNetworkPytorchTensors = defineSlide({
  id: 'neural-network-pytorch-tensors',
  type: 'two-column',
  options: { columnRatios: [0.56, 0.44] },
  content: {
    'pt-br': {
      title: 'Tensores no PyTorch: leitura operacional',
      body: `Nos slides anteriores, fechamos a leitura de **rank** e **shape**: contar eixos, nomear o papel de cada eixo e só então ler os números. Agora aplicamos essa leitura em um caso real: **texto cru não entra direto em uma rede neural**.

(B=lote, T=comprimento da sequência, C=largura da representação interna, V=tamanho do vocabulário)

Para um modelo de linguagem, a sequência operacional mais comum é esta:
1. **token_ids** -> tensor \`(B, T)\`
2. **hidden_states** -> tensor \`(B, T, C)\`
3. **output_scores** -> tensor \`(B, T, V)\`

O papel de cada um:
1. **token_ids**: IDs inteiros dos tokens de entrada. Aqui o modelo ainda não está “entendendo” texto; ele só recebeu índices organizados por lote e posição.
2. **hidden_states**: vetores internos produzidos para cada token. Cada posição agora carrega \`C\` números que resumem a representação daquele token dentro do modelo.
3. **output_scores**: pontuações brutas para cada token possível do vocabulário. Em cada posição da sequência, o modelo gera um placar com \`V\` candidatos.

Leitura operacional dos eixos:
1. **B / batch**: quantas sequências entram juntas;
2. **T / sequence**: quantas posições existem em cada sequência;
3. **C / width**: quantos números representam cada token internamente;
4. **V / vocabulary**: quantos candidatos de saída existem por posição.

Ponte curta com o que veio antes:
- rank/shape já explicaram **como ler eixos**;
- este slide mostra **quais tensores aparecem** quando texto vira entrada de modelo.

Ordem didática daqui para frente:
- neste slide, \`output_scores\` são só **pontuações de saída**;
- no próximo, fechamos o contrato de \`dtype\`;
- depois formalizamos o nome técnico dessas pontuações e como elas viram previsão.

Regra mental para guardar: **IDs entram no modelo -> viram vetores internos -> viram scores sobre o vocabulário**.`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/tensor-primer
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 7], content: 'Primeiro definimos o contrato base do exemplo: batch, comprimento da sequência, largura interna e vocabulário.' },
        { lineRange: [9, 13], content: 'Aqui aparece o primeiro tensor do pipeline: `token_ids` em `(B, T)`, com IDs inteiros organizados por lote e posição.' },
        { lineRange: [15, 19], content: 'Depois simulamos os outros dois tensores típicos: `hidden_states` em `(B, T, C)` e `output_scores` em `(B, T, V)`.' },
        { lineRange: [21, 24], content: 'Esses acessos pontuais tiram a abstração: um índice isolado em `token_ids`, um vetor de largura `C` em `hidden_states` e um vetor de largura `V` em `output_scores`.' },
        { lineRange: [26, 29], content: 'Fechamos lendo o pipeline inteiro por shape e dtype: entrada discreta, representação interna e placar de saída.' },
      ],
    },
    'en-us': {
      title: 'PyTorch tensors: operational reading',
      body: `In previous slides, we established how to read **rank** and **shape**: count axes, name what each axis does, and only then read the numbers. Now we apply that reading to a real case: **raw text does not go straight into a neural network**.

(B=batch size, T=sequence length, C=internal representation width, V=vocabulary size)

For a language model, the most common operational sequence is:
1. **token_ids** -> tensor \`(B, T)\`
2. **hidden_states** -> tensor \`(B, T, C)\`
3. **output_scores** -> tensor \`(B, T, V)\`

What each one does:
1. **token_ids**: integer IDs for the input tokens. At this stage the model is not “understanding text” yet; it has only received indices arranged by batch and position.
2. **hidden_states**: internal vectors produced for each token. Each position now carries \`C\` numbers summarizing that token's representation inside the model.
3. **output_scores**: raw scores for every possible vocabulary token. At each sequence position, the model produces a scoreboard with \`V\` candidates.

Operational axis reading:
1. **B / batch**: how many sequences enter together;
2. **T / sequence**: how many positions each sequence has;
3. **C / width**: how many numbers represent each token internally;
4. **V / vocabulary**: how many output candidates exist per position.

Short bridge to what came before:
- rank/shape already explained **how to read axes**;
- this slide shows **which tensors appear** when text becomes model input.

Didactic order from here:
- in this slide, \`output_scores\` are only **output scores**;
- next we lock the \`dtype\` contract;
- after that we formalize the technical name for those scores and how they become predictions.

Mental rule to keep: **IDs enter the model -> become internal vectors -> become scores over the vocabulary**.`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/tensor-primer
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 7], content: 'We start by defining the base contract of the example: batch, sequence length, internal width, and vocabulary size.' },
        { lineRange: [9, 13], content: 'This is the first tensor in the pipeline: `token_ids` in `(B, T)`, with integer IDs organized by batch and position.' },
        { lineRange: [15, 19], content: 'Then we simulate the other two common tensors: `hidden_states` in `(B, T, C)` and `output_scores` in `(B, T, V)`.' },
        { lineRange: [21, 24], content: 'These targeted accesses reduce abstraction: one scalar ID in `token_ids`, one width-`C` vector in `hidden_states`, and one width-`V` vector in `output_scores`.' },
        { lineRange: [26, 29], content: 'We close by reading the full pipeline through shape and dtype: discrete input, internal representation, and output scoreboard.' },
      ],
    },
  },
});
