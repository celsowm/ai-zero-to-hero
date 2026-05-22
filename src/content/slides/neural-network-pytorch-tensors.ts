import { defineSlide } from './_factory';

export const neuralNetworkPytorchTensors = defineSlide({
  id: 'neural-network-pytorch-tensors',
  type: 'two-column',
  options: { columnRatios: [0.56, 0.44] },
  content: {
    'pt-br': {
      title: 'Tensores no PyTorch: leitura operacional',
      body: `Nos slides anteriores, fechamos rank e shape como leitura de eixos. Agora vem o problema real de produto: **rede neural não lê texto cru**.

Ela só consome números organizados em tensor. Então, para modelagem de texto, precisamos de um contrato que transforme linguagem em entrada numérica sem perder ordem.

O caminho é este:
1. **Texto cru** → sequencia de palavras/subpalavras
2. **Tokenização** → cada pedaço vira um ID inteiro
3. **IDs organizados** → tensor (B, T): B = batch (quantas frases), T = sequência (quantos tokens por frase)
4. **Embedding** → cada ID vira vetor denso (B, T, C)
5. **Camadas internas** → representação contextualizada
6. **Saída** → scores sobre o vocabulário (próximo token)

Termo novo com contexto:
- **sequência** = cadeia ordenada de tokens que o modelo recebe de uma vez. Ex.: "Eu gosto de IA" → [Eu, gosto, de, IA, .] → T=5 posições.
- **token** = menor unidade de texto que o modelo processa.

Agora, com a necessidade clara, a notação faz sentido.

Leitura operacional dos eixos:
1. **batch (B)**: quantas sequências entram juntas;
2. **sequence (T)**: quantas posições por sequência;
3. **width (C)**: tamanho da representação interna por token;
4. **vocabulary (V)**: quantidade de candidatos de próximo token.

Observação de ordem didática:
- neste slide, tratamos apenas como **scores de saída**;
- no próximo slide, fechamos o contrato de **dtype** para não misturar papel discreto e contínuo;
- na sequência, formalizamos para que esses scores servem e o nome técnico **logits**.

Se você identifica eixo, \`dtype\` e \`device\` em cada etapa, treino e debug deixam de ser adivinhação.`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/tensor-primer
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 6], content: 'Primeiro fixamos o problema com variáveis explícitas: quantas sequências entram, quanto cabe em cada sequência e quais larguras internas serão usadas.' },
        { lineRange: [8, 11], content: 'Aqui acontece a conversão de texto para entrada do modelo: IDs inteiros organizados por sequência.' },
        { lineRange: [13, 14], content: 'Depois do contrato de entrada, simulamos a etapa interna `(B,T,C)` e a etapa de saída `(B,T,V)`.' },
        { lineRange: [16, 18], content: 'Esses prints são validação operacional do pipeline: shape + dtype antes de seguir para embedding/logits.' },
      ],
    },
    'en-us': {
      title: 'PyTorch tensors: operational reading',
      body: `In previous slides, we established rank/shape as axis reading. Now we hit the real product problem: **a neural network does not consume raw text**.

It only consumes numbers arranged as tensors. So for text modeling we need a contract that converts language into numeric input while preserving order.

The path is:
1. **Raw text** → sequence of words/subwords
2. **Tokenization** → each piece becomes an integer ID
3. **IDs organized** → tensor (B, T): B = batch (how many sentences), T = sequence (how many tokens per sentence)
4. **Embedding** → each ID becomes a dense vector (B, T, C)
5. **Internal layers** → contextualized representation
6. **Output** → scores over the vocabulary (next token)

New term with context:
- **sequence** = an ordered chain of tokens the model receives at once. For example, "I like AI" → [I, like, AI, .] → T=4 positions.
- **token** = smallest text unit processed by the model.

Now that the need is clear, notation becomes useful.

Operational axis reading:
1. **batch (B)**: how many sequences enter together;
2. **sequence (T)**: how many positions per sequence;
3. **width (C)**: internal representation size per token;
4. **vocabulary (V)**: number of next-token candidates.

Didactic ordering note:
- in this slide, we treat them only as **output scores**;
- in the next slide, we close the **dtype** contract so discrete and continuous roles stay explicit;
- right after that, we formalize what those scores are for and the technical term **logits**.

If you can identify axis, \`dtype\`, and \`device\` at each step, training and debugging stop being guesswork.`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/tensor-primer
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 6], content: 'We first anchor the problem with explicit variables: how many sequences, how long each sequence is, and the internal/output widths.' },
        { lineRange: [8, 11], content: 'This is the text-to-model bridge: integer token IDs organized per sequence.' },
        { lineRange: [13, 14], content: 'After input contract, we mock the internal `(B,T,C)` and output `(B,T,V)` stages.' },
        { lineRange: [16, 18], content: 'These prints are operational checkpoints: shape + dtype before moving to embedding/logits.' },
      ],
    },
  },
});
