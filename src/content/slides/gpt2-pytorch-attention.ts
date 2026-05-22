import { defineSlide } from './_factory';

export const gpt2PytorchAttention = defineSlide({
  id: 'gpt2-pytorch-attention',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: 'Atenção causal em PyTorch',
      body: `Agora entramos na mecânica completa da atenção causal.

(B=lote, T=tempo/comprimento da sequência, C=largura da representação interna, V=tamanho do vocabulário)

Com QKV já definido, o fluxo passa a ser:

1. projeção \`C -> 3C\` para QKV (Query, Key, Value)
2. reshape para múltiplas heads
3. aplicar máscara causal nos scores
4. projeção final de volta para \`C\`

Contratos de shape:
- entrada: \`x (B, T, C)\`
- q/k/v por head: \`(B, H, T, D)\`
- scores: \`(B, H, T, T)\`
- saída: \`(B, T, C)\`

Erros comuns:
- esquecer a máscara causal (vaza futuro no treino)
- permutar dimensão errada em \`transpose/view\`
- usar \`softmax\` no eixo errado
- esquecer que o reshape precisa respeitar \`C = H x D\``,
      rightBody: `\`\`\`python
snippet:gpt2_manual/attention
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 12], content: 'A classe define heads, dimensão por head e projeções lineares de entrada/saída.' },
        { lineRange: [14, 22], content: 'No forward, o tensor vira QKV, recebe shape multi-head, aplica atenção causal e retorna para `(B, T, C)`.' },
      ],
    },
    'en-us': {
      title: 'Causal attention in PyTorch',
      body: `Now we enter the full mechanics of causal attention.

(B=batch size, T=sequence length, C=representation/hidden width, V=vocabulary size)

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
snippet:gpt2_manual/attention
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 12], content: 'The class defines heads, per-head width, and input/output linear projections.' },
        { lineRange: [14, 22], content: 'In forward, tensor becomes QKV, gains multi-head shape, applies causal attention, and returns to `(B, T, C)`.' },
      ],
    },
  },
});

