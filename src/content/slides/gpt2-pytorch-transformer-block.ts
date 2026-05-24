import { defineSlide } from './_factory';

export const gpt2PytorchTransformerBlock = defineSlide({
  id: 'gpt2-pytorch-transformer-block',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: 'TransformerBlock: atenção + MLP + residual',
      body: `Agora juntamos as peças do bloco GPT:

1. LayerNorm antes da atenção
2. CausalSelfAttention
3. soma residual
4. LayerNorm antes do MLP
5. MLP
6. soma residual

O shape precisa permanecer igual:

- entrada: \`(B,T,C)\`
- saída: \`(B,T,C)\`

Isso é obrigatório porque residual é uma soma. Se atenção ou MLP mudarem o shape final, \`x + ...\` quebra.

Teste mínimo: passar \`torch.randn(2, 8, config.n_embd)\` e confirmar que a saída tem o mesmo shape.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/transformer-block
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 16], content: 'A classe monta LayerNorm, atenção, MLP e as duas somas residuais mantendo o contrato `(B,T,C)`.' },
        { lineRange: [19, 23], content: 'O teste de fumaça instancia o bloco e confirma que a saída preserva o shape de entrada.' },
      ],
    },
    'en-us': {
      title: 'TransformerBlock: attention + MLP + residual',
      body: `Now we join the GPT block pieces:

1. LayerNorm before attention
2. CausalSelfAttention
3. residual addition
4. LayerNorm before MLP
5. MLP
6. residual addition

The shape must stay the same:

- input: \`(B,T,C)\`
- output: \`(B,T,C)\`

This is mandatory because residual is an addition. If attention or MLP changes the final shape, \`x + ...\` breaks.

Minimal test: pass \`torch.randn(2, 8, config.n_embd)\` and confirm output has the same shape.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/transformer-block
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 16], content: 'The class assembles LayerNorm, attention, MLP, and two residual additions while preserving `(B,T,C)`.' },
        { lineRange: [19, 23], content: 'The smoke test instantiates the block and confirms that output preserves input shape.' },
      ],
    },
  },
});
