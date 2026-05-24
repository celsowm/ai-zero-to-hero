import { defineSlide } from './_factory';

export const buildGpt2Generate = defineSlide({
  id: 'build-gpt2-generate',
  type: 'two-column',
  options: { columnRatios: [0.44, 0.56] },
  content: {
    'pt-br': {
      title: 'generate(): texto token a token',
      body: `Depois do treino, fechamos o ciclo com geração autoregressiva.

O método \`generate()\` repete:

1. cortar o contexto para respeitar \`block_size\`
2. rodar forward
3. pegar \`logits[:, -1, :]\`
4. aplicar temperatura
5. aplicar top-k, se existir
6. fazer softmax
7. sortear o próximo token
8. concatenar no contexto

Contrato:
- entrada: \`idx (B,T)\`
- saída: \`idx (B,T+max_new_tokens)\`

O modelo só aceita no máximo \`block_size\` tokens. Durante geração, o contexto cresce. Por isso mantemos apenas os últimos \`block_size\`.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/generate-method
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 12], content: '`@torch.no_grad()` desliga gradientes e a assinatura recebe contexto, número de tokens e controles de sampling.' },
        { lineRange: [13, 19], content: '`idx_cond` corta o contexto, o forward produz logits e a última posição decide o próximo token.' },
        { lineRange: [20, 26], content: 'Top-k remove candidatos fracos antes do softmax quando o controle é usado.' },
        { lineRange: [27, 31], content: 'Softmax cria probabilidades, `multinomial` sorteia o token e `cat` anexa ao contexto.' },
      ],
    },
    'en-us': {
      title: 'generate(): text token by token',
      body: `After training, we close the loop with autoregressive generation.

The \`generate()\` method repeats:

1. crop context to respect \`block_size\`
2. run forward
3. take \`logits[:, -1, :]\`
4. apply temperature
5. apply top-k, if present
6. run softmax
7. sample the next token
8. concatenate into context

Contract:
- input: \`idx (B,T)\`
- output: \`idx (B,T+max_new_tokens)\`

The model accepts at most \`block_size\` tokens. During generation, context grows. That is why we keep only the latest \`block_size\`.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/generate-method
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 12], content: '`@torch.no_grad()` disables gradients and the signature receives context, token count, and sampling controls.' },
        { lineRange: [13, 19], content: '`idx_cond` crops context, forward produces logits, and the last position decides the next token.' },
        { lineRange: [20, 26], content: 'Top-k removes weak candidates before softmax when the control is used.' },
        { lineRange: [27, 31], content: 'Softmax creates probabilities, `multinomial` samples a token, and `cat` appends it to context.' },
      ],
    },
  },
});
