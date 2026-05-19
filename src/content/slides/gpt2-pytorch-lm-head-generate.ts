import { defineSlide } from './_factory';

export const gpt2PytorchLmHeadGenerate = defineSlide({
  id: 'gpt2-pytorch-lm-head-generate',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: 'LM head e loop de geração',
      body: `Depois do forward, a geração olha só para a última posição.

Ritmo da geração autoregressiva:

1. rodar o modelo no contexto atual
2. pegar \`logits[:, -1, :]\`
3. transformar em probabilidades
4. amostrar um próximo token`,
      rightBody: `\`\`\`python
snippet:repo-gpt2/generate
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 1], content: 'Começamos com um prefixo pequeno já tokenizado.' },
        { lineRange: [3, 10], content: 'Cada iteração usa o contexto atual para produzir os logits da próxima decisão, amostrar e anexar o token.' },
      ],
    },
    'en-us': {
      title: 'LM head and the generation loop',
      body: `After the forward pass, generation only cares about the last position.

Rhythm of autoregressive generation:

1. run the model on the current context
2. take \`logits[:, -1, :]\`
3. turn them into probabilities
4. sample the next token`,
      rightBody: `\`\`\`python
snippet:repo-gpt2/generate
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 1], content: 'We start from a tiny tokenized prefix.' },
        { lineRange: [3, 10], content: 'Each iteration uses the current context to produce the next logits, sample, and append the token.' },
      ],
    },
  },
});
