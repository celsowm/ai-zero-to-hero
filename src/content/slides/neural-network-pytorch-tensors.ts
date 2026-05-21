import { defineSlide } from './_factory';

export const neuralNetworkPytorchTensors = defineSlide({
  id: 'neural-network-pytorch-tensors',
  type: 'two-column',
  options: { columnRatios: [0.56, 0.44] },
  content: {
    'pt-br': {
      title: 'Tensores no PyTorch: leitura operacional',
      body: `Ate aqui, tensores foram estruturas abstratas: escalares, vetores, matrizes, shapes. Agora o curso enfrenta um problema concreto: **como representar texto para uma rede neural?**

Texto nao entra em numeros. Um modelo so recebe tensores — e texto precisa ser convertido em indices inteiros.

O caminho e este:
1. **Texto cru** → sequencia de palavras/subpalavras
2. **Tokenizacao** → cada pedaco vira um ID inteiro
3. **IDs organizados** → tensor (B, T): B = batch (quantas frases), T = time (quantos tokens por frase)
4. **Embedding** → cada ID vira vetor denso (B, T, C)
5. **Camadas internas** → representacao contextualizada
6. **Saida** → scores sobre o vocabulario (proximo token)

Termo novo com contexto:
- **sequencia** = cadeia ordenada de tokens que o modelo recebe de uma vez. Ex.: "Eu gosto de IA" → [Eu, gosto, de, IA, .] → T=5 posicoes.
- **token** = menor unidade de texto que o modelo processa.

Leitura operacional dos eixos:
1. **batch (B)**: quantas sequencias entram juntas;
2. **time/sequence (T)**: quantas posicoes por sequencia;
3. **width (C)**: tamanho da representacao interna por token;
4. **vocabulary (V)**: quantidade de candidatos de proximo token.

Observacao de ordem didatica:
- neste slide, tratamos apenas como **scores de saida**;
- no proximo slide, fechamos para que esses scores servem e formalizamos o nome tecnico **logits**.

Se voce identifica eixo, \`dtype\` e \`device\` em cada etapa, treino e debug deixam de ser adivinhacao.`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/tensor-primer
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 6], content: 'Damos nome aos eixos (`batch_size`, `sequence_length` etc.) para deixar claro o papel de cada dimensão do tensor.' },
        { lineRange: [8, 11], content: 'Montamos IDs inteiros de tokens, que é o formato de entrada usado pela camada de embedding.' },
        { lineRange: [13, 14], content: 'Criamos exemplos de estado interno e de saída preservando lote e sequência, mudando só a dimensão final.' },
        { lineRange: [16, 18], content: 'Os prints validam shape e dtype, que são os dois primeiros checkpoints quando algo quebra.' },
      ],
    },
    'en-us': {
      title: 'PyTorch tensors: operational reading',
      body: `So far, tensors were abstract structures: scalars, vectors, matrices, shapes. Now the course faces a concrete problem: **how to represent text for a neural network?**

Text does not enter as numbers. A model only consumes tensors — and text must be converted into integer indices.

The path is:
1. **Raw text** → sequence of words/subwords
2. **Tokenization** → each piece becomes an integer ID
3. **IDs organized** → tensor (B, T): B = batch (how many sentences), T = time (how many tokens per sentence)
4. **Embedding** → each ID becomes a dense vector (B, T, C)
5. **Internal layers** → contextualized representation
6. **Output** → scores over the vocabulary (next token)

New term with context:
- **sequence** = an ordered chain of tokens the model receives at once. For example, "I like AI" → [I, like, AI, .] → T=4 positions.
- **token** = smallest text unit processed by the model.

Operational axis reading:
1. **batch (B)**: how many sequences enter together;
2. **time/sequence (T)**: how many positions per sequence;
3. **width (C)**: internal representation size per token;
4. **vocabulary (V)**: number of next-token candidates.

Didactic ordering note:
- in this slide, we treat them only as **output scores**;
- in the next slide, we close what those scores are for and formalize the technical term **logits**.

If you can identify axis, \`dtype\`, and \`device\` at each step, training and debugging stop being guesswork.`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/tensor-primer
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 6], content: 'We name each axis explicitly (`batch_size`, `sequence_length`, etc.) so every tensor dimension has a clear role.' },
        { lineRange: [8, 11], content: 'We build integer token IDs, which is the standard input format for embedding lookup.' },
        { lineRange: [13, 14], content: 'Hidden-state and output examples keep batch and sequence axes intact while changing only the last dimension.' },
        { lineRange: [16, 18], content: 'The prints verify shape and dtype, the two first checks when debugging tensor-contract issues.' },
      ],
    },
  },
});
