import { defineSlide } from './_factory';

export const neuralNetworkPytorchTensors = defineSlide({
  id: 'neural-network-pytorch-tensors',
  type: 'two-column',
  options: { columnRatios: [0.56, 0.44] },
  content: {
    'pt-br': {
      title: 'Tensores úteis para language modeling',
      body: `Neste bloco, tensor importa menos como teoria abstrata e mais como **estrutura com shape previsível**.

Padrão que vai se repetir:

1. **\`(B, T)\`** para token IDs
2. **\`(B, T, C)\`** para hidden states
3. **\`(B, T, V)\`** para logits

Quando você lê PyTorch para LM, quase tudo fica mais simples se souber responder:

- qual é o batch?
- qual é o comprimento da sequência?
- qual é a largura do vetor ou do vocabulário?`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/tensor-shapes
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 3], content: 'Importamos o PyTorch e nomeamos as dimensões base que vão aparecer em todo o bloco.' },
        { lineRange: [5, 8], content: 'Os token IDs já nascem como uma matriz `(B, T)` de inteiros.' },
        { lineRange: [10, 11], content: 'Depois do embedding e das projeções, o modelo passa a carregar vetores e logits por token.' },
        { lineRange: [13, 15], content: 'Os três `print`s fixam a convenção que vai reaparecer do mini LM até o GPT-2.' },
      ],
    },
    'en-us': {
      title: 'Tensors that matter for language modeling',
      body: `In this block, tensors matter less as abstract theory and more as **structures with predictable shapes**.

The pattern that keeps coming back is:

1. **\`(B, T)\`** for token IDs
2. **\`(B, T, C)\`** for hidden states
3. **\`(B, T, V)\`** for logits

When reading PyTorch for LM, most of the code becomes easier once you can answer:

- what is the batch?
- what is the sequence length?
- what is the hidden width or vocabulary size?`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/tensor-shapes
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 3], content: 'We import PyTorch and name the base dimensions that will reappear across the block.' },
        { lineRange: [5, 8], content: 'Token IDs already start as an integer matrix shaped `(B, T)`.' },
        { lineRange: [10, 11], content: 'After embedding and projections, the model carries vectors and logits per token.' },
        { lineRange: [13, 15], content: 'The three prints lock in the convention reused from the tiny LM to GPT-2.' },
      ],
    },
  },
});
