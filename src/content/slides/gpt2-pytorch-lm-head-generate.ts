import { defineSlide } from './_factory';

export const gpt2PytorchLmHeadGenerate = defineSlide({
  id: 'gpt2-pytorch-lm-head-generate',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: 'LM head: a última posição escolhe o próximo token',
      body: `Depois do forward, a geração olha só para a última posição.

Ritmo da geração autoregressiva:

1. cortar o contexto para no máximo \`block_size\`
2. rodar o modelo no contexto atual
3. pegar \`logits[:, -1, :]\`
4. transformar em probabilidades
5. amostrar um próximo token
6. concatenar no contexto

O modelo só aceita no máximo \`block_size\` tokens. Durante geração, o contexto cresce. Por isso cortamos os tokens mais antigos e mantemos apenas os últimos \`block_size\`.

Problemas comuns:
- esquecer o crop de contexto
- usar todos os logits em vez da última posição
- chamar geração com gradiente ligado`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/generate
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 3], content: 'Começamos com um prefixo tokenizado em `torch.long`.' },
        { lineRange: [5, 7], content: '`idx_cond` corta o contexto para `block_size` e o forward devolve logits temporais.' },
        { lineRange: [8, 11], content: 'Só a última posição decide o próximo token; softmax, multinomial e cat fecham uma iteração.' },
      ],
    },
    'en-us': {
      title: 'LM head: the last position chooses the next token',
      body: `After the forward pass, generation only looks at the last position.

Rhythm of autoregressive generation:

1. crop context to at most \`block_size\`
2. run the model on current context
3. take \`logits[:, -1, :]\`
4. turn them into probabilities
5. sample one next token
6. concatenate into context

The model accepts at most \`block_size\` tokens. During generation, context grows. That is why we cut older tokens and keep only the latest \`block_size\`.

Common issues:
- forgetting context crop
- using all logits instead of the last position
- running generation with gradients enabled`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/generate
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 3], content: 'We start with a tokenized prefix in `torch.long`.' },
        { lineRange: [5, 7], content: '`idx_cond` crops context to `block_size` and forward returns temporal logits.' },
        { lineRange: [8, 11], content: 'Only the last position decides the next token; softmax, multinomial, and cat close one iteration.' },
      ],
    },
  },
});
