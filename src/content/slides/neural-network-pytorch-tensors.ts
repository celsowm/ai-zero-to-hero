import { defineSlide } from './_factory';

export const neuralNetworkPytorchTensors = defineSlide({
  id: 'neural-network-pytorch-tensors',
  type: 'two-column',
  options: { columnRatios: [0.56, 0.44] },
  content: {
    'pt-br': {
      title: 'Tensores no PyTorch: leitura operacional',
      body: `No slide anterior, vimos como contar eixos. Agora a pergunta muda de forma: **onde isso aparece no problema de texto que o modelo realmente recebe?**

Termo novo com contexto:
- **token** = menor unidade de texto que o modelo processa.
- Por que aparece agora: o modelo não recebe frase crua; recebe IDs inteiros de tokens em tensor.
- Onde reaparece depois: no treino/autograd e em APIs como Hugging Face com \`return_tensors="pt"\`.

Fluxo causal deste bloco:
\`texto -> tokenização -> IDs inteiros -> tensor (B,T) -> embedding -> output scores\`

Observacao de ordem didatica:
- neste slide, tratamos apenas como **scores de saida**;
- no proximo slide, fechamos para que esses scores servem e formalizamos o nome tecnico **logits**.

Leitura operacional dos eixos:
1. **batch**: quantas sequências entram juntas;
2. **time/sequence**: quantas posições por sequência;
3. **width**: tamanho da representação interna por token;
4. **vocabulary**: quantidade de candidatos de próximo token.

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
      body: `In the previous slide, we learned how to count axes. Now the question changes form: **where does that show up in the text problem the model actually receives?**

New term with context:
- **token** = smallest text unit processed by the model.
- Why it appears now: the model does not consume raw sentences; it consumes integer token IDs in tensors.
- Where it returns later: training/autograd and APIs like Hugging Face with \`return_tensors="pt"\`.

Causal flow for this block:
\`text -> tokenization -> integer IDs -> tensor (B,T) -> embedding -> output scores\`

Didactic ordering note:
- in this slide, we treat them only as **output scores**;
- in the next slide, we close what those scores are for and formalize the technical term **logits**.

Operational axis reading:
1. **batch**: how many sequences enter together;
2. **time/sequence**: how many positions per sequence;
3. **width**: internal representation size per token;
4. **vocabulary**: number of next-token candidates.

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
