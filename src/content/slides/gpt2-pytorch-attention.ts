import { defineSlide } from './_factory';

export const gpt2PytorchAttention = defineSlide({
  id: 'gpt2-pytorch-attention',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: 'Atenção causal no repo',
      body: `Agora entramos na mecânica completa da atenção causal do repo.

Com QKV já definido, o fluxo passa a ser:

1. projecao \`C -> 3C\` para QKV (Query, Key, Value)
2. reshape para múltiplas heads
3. aplicar mascara causal nos scores
4. projeção final de volta para \`C\`

Contratos de shape:
- entrada: \`x (B, T, C)\`
- q/k/v por head: \`(B, H, T, D)\`
- scores: \`(B, H, T, T)\`
- saída: \`(B, T, C)\`

Erros comuns:
- esquecer a mascara causal (vaza futuro no treino)
- permutar dimensão errada em \`transpose/view\`
- usar \`softmax\` no eixo errado
- esquecer que o reshape precisa respeitar \`C = H x D\``,
      rightBody: `\`\`\`python
snippet:repo-gpt2/attention
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'A classe guarda número de heads, largura do embedding e as projeções lineares centrais.' },
        { lineRange: [13, 20], content: 'No forward, o tensor vira QKV (Query, Key, Value), ganha formato multi-head, aplica mascara triangular para impedir futuro e volta para `(B, T, C)`.' },
      ],
    },
    'en-us': {
      title: 'Causal attention in the repo',
      body: `Now we enter the full mechanics of causal attention in the repo.

With QKV already defined, the flow becomes:

1. one \`C -> 3C\` projection for QKV (Query, Key, Value)
2. reshape into multiple heads
3. apply a causal mask over the scores
4. final projection back to \`C\`

Shape contracts:
- input: \`x (B, T, C)\`
- per-head q/k/v: \`(B, H, T, D)\`
- attention scores: \`(B, H, T, T)\`
- output: \`(B, T, C)\`

Common failures:
- missing causal mask (future leakage during training)
- wrong \`transpose/view\` dimension order
- applying \`softmax\` on the wrong axis
- forgetting that reshape must respect \`C = H x D\``,
      rightBody: `\`\`\`python
snippet:repo-gpt2/attention
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'The class stores number of heads, embedding width, and the central linear projections.' },
        { lineRange: [13, 20], content: 'In the forward pass, the tensor becomes QKV (Query, Key, Value), gains multi-head shape, applies a triangular mask to block the future, and returns to `(B, T, C)`.' },
      ],
    },
  },
});
