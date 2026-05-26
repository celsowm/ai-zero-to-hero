import { defineSlide } from './_factory';

export const gpt2PytorchQkvIntuition = defineSlide({
  id: 'gpt2-pytorch-qkv-intuition',
  type: 'two-column',
  options: { columnRatios: [0.44, 0.56] },
  content: {
    'pt-br': {
      title: 'QKV na prática: uma projeção vira três leituras',
      body: `QKV não é uma metáfora solta. No GPT-2, ele nasce de uma linha bem concreta:

\`\`\`txt
self.c_attn = nn.Linear(config.n_embd, 3 * config.n_embd, bias=config.bias)
q, k, v = c_attn(x).split(C, dim=-1)
\`\`\`

O que acontece:
1. \`x\` contém um vetor por token
2. \`c_attn\` projeta cada vetor de \`C\` para \`3C\`
3. o resultado é cortado em três tensores: \`Q\`, \`K\`, \`V\`
4. uma Query compara com as Keys para gerar \`attention_logits\`
5. softmax transforma \`attention_logits\` em pesos de atenção
6. os pesos misturam os Values e produzem o contexto

Leitura operacional:
- **Q** procura: "com quem esta posição combina?"
- **K** oferece compatibilidade para ser encontrado por outras posições
- **V** carrega a informação que será misturada quando o peso é alto

\`attention_logits\` são placares entre posições. Eles não são os \`logits\` finais do vocabulário; esses aparecem só depois que atenção, MLPs e residual stream chegam ao \`lm_head\`.

No próximo slide, essa projeção vira parte da classe \`CausalSelfAttention\`.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/qkv-intuition
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'O exemplo fixa tokens, largura `C` e um tensor `x` pequeno, para a conta caber inteira no slide.' },
        { lineRange: [13, 28], content: '`c_attn` imita a projeção do GPT-2: uma única matriz transforma cada token de `C` para `3C`.' },
        { lineRange: [30, 31], content: 'Depois da projeção, `split(C)` separa o bloco largo em `Q`, `K` e `V`.' },
        { lineRange: [33, 36], content: 'A Query de `people` calcula attention logits contra todas as Keys, vira pesos via softmax e mistura os Values.' },
        { lineRange: [38, 42], content: 'Os prints conferem os shapes e mostram os pesos de atenção que entram no vetor de contexto.' },
      ],
    },
    'en-us': {
      title: 'QKV in practice: one projection becomes three reads',
      body: `QKV is not a loose metaphor. In GPT-2, it comes from one concrete line:

\`\`\`txt
self.c_attn = nn.Linear(config.n_embd, 3 * config.n_embd, bias=config.bias)
q, k, v = c_attn(x).split(C, dim=-1)
\`\`\`

What happens:
1. \`x\` contains one vector per token
2. \`c_attn\` projects each vector from \`C\` to \`3C\`
3. the result is cut into three tensors: \`Q\`, \`K\`, \`V\`
4. one Query compares against the Keys to produce \`attention_logits\`
5. softmax turns \`attention_logits\` into attention weights
6. the weights mix the Values and produce context

Operational reading:
- **Q** searches: "which positions match this one?"
- **K** offers compatibility so other positions can find it
- **V** carries the information that gets mixed when its weight is high

\`attention_logits\` are scores between positions. They are not final vocabulary \`logits\`; those appear only after attention, MLPs, and the residual stream reach the \`lm_head\`.

On the next slide, this projection becomes part of the \`CausalSelfAttention\` class.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/qkv-intuition
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'The example fixes tokens, width `C`, and a small `x` tensor so the whole calculation fits on the slide.' },
        { lineRange: [13, 28], content: '`c_attn` mimics the GPT-2 projection: one matrix maps each token from `C` to `3C`.' },
        { lineRange: [30, 31], content: 'After projection, `split(C)` separates the wide block into `Q`, `K`, and `V`.' },
        { lineRange: [33, 36], content: 'The `people` Query computes attention logits against all Keys, becomes weights through softmax, and mixes the Values.' },
        { lineRange: [38, 42], content: 'The prints verify shapes and show the attention weights entering the context vector.' },
      ],
    },
  },
  visual: {
    id: 'qkv-intuition-explorer',
    copy: {
      'pt-br': {
        title: 'Laboratório QKV',
        subtitle: 'Acompanhe uma projeção C -> 3C e o cálculo da Query de "people"',
        tokenLabel: 'Tokens',
        projectionLabel: 'c_attn: C -> 3C',
        splitLabel: 'split(C)',
        scoreLabel: 'attention_logits',
        softmaxLabel: 'softmax',
        contextLabel: 'mistura dos Values',
        bridgeLabel: 'Próximo contrato',
        bridgeText: '(B,T,C) -> (B,T,3C) -> Q/K/V -> (B,H,T,D)',
        queryToken: 'people',
        tokens: ['We', 'the', 'people'],
        xRows: [
          [1.0, 0.0, 0.2, 0.1],
          [0.0, 1.0, 0.1, 0.3],
          [0.7, 0.4, 1.0, 0.2],
        ],
        qRows: [
          [1.0, 0.0, 0.2, 0.1],
          [0.0, 1.0, 0.1, 0.3],
          [0.7, 0.4, 1.0, 0.2],
        ],
        kRows: [
          [0.94, 0.02, 0.32, 0.12],
          [0.07, 1.11, 0.16, 0.51],
          [0.77, 0.54, 1.11, 0.38],
        ],
        vRows: [
          [1.02, 0.07, 0.44, 0.14],
          [0.16, 1.06, 0.32, 0.42],
          [0.78, 0.72, 1.26, 0.44],
        ],
        scores: [0.5, 0.38, 0.97],
        weights: [0.29, 0.25, 0.46],
        valueMix: [
          '29% de We',
          '25% de the',
          '46% de people',
        ],
        takeaways: [
          'Q/K/V saem da mesma projeção linear.',
          'A Query ativa gera attention logits comparando com Keys.',
          'O contexto vai ao residual; logits do vocabulário vêm no lm_head.',
        ],
      },
      'en-us': {
        title: 'QKV lab',
        subtitle: 'Follow one C -> 3C projection and the Query calculation for "people"',
        tokenLabel: 'Tokens',
        projectionLabel: 'c_attn: C -> 3C',
        splitLabel: 'split(C)',
        scoreLabel: 'attention_logits',
        softmaxLabel: 'softmax',
        contextLabel: 'Value mix',
        bridgeLabel: 'Next contract',
        bridgeText: '(B,T,C) -> (B,T,3C) -> Q/K/V -> (B,H,T,D)',
        queryToken: 'people',
        tokens: ['We', 'the', 'people'],
        xRows: [
          [1.0, 0.0, 0.2, 0.1],
          [0.0, 1.0, 0.1, 0.3],
          [0.7, 0.4, 1.0, 0.2],
        ],
        qRows: [
          [1.0, 0.0, 0.2, 0.1],
          [0.0, 1.0, 0.1, 0.3],
          [0.7, 0.4, 1.0, 0.2],
        ],
        kRows: [
          [0.94, 0.02, 0.32, 0.12],
          [0.07, 1.11, 0.16, 0.51],
          [0.77, 0.54, 1.11, 0.38],
        ],
        vRows: [
          [1.02, 0.07, 0.44, 0.14],
          [0.16, 1.06, 0.32, 0.42],
          [0.78, 0.72, 1.26, 0.44],
        ],
        scores: [0.5, 0.38, 0.97],
        weights: [0.29, 0.25, 0.46],
        valueMix: [
          '29% from We',
          '25% from the',
          '46% from people',
        ],
        takeaways: [
          'Q/K/V come from the same linear projection.',
          'The active Query creates attention logits by comparing against Keys.',
          'Context goes to the residual; vocabulary logits come from lm_head.',
        ],
      },
    },
  },
});
