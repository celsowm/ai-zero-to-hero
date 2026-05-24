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
4. uma Query compara com as Keys para gerar scores
5. softmax transforma scores em pesos
6. os pesos misturam os Values e produzem o contexto

Leitura operacional:
- **Q** é o vetor usado para consultar
- **K** é o vetor usado para ser comparado
- **V** é o conteúdo que entra no resultado quando o peso é alto

No próximo slide, essa projeção vira parte da classe \`CausalSelfAttention\`.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/qkv-intuition
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'O exemplo fixa tokens, largura `C` e um tensor `x` pequeno, para a conta caber inteira no slide.' },
        { lineRange: [13, 28], content: '`c_attn` imita a projeção do GPT-2: uma única matriz transforma cada token de `C` para `3C`.' },
        { lineRange: [30, 31], content: 'Depois da projeção, `split(C)` separa o bloco largo em `Q`, `K` e `V`.' },
        { lineRange: [33, 36], content: 'A Query de `people` calcula scores contra todas as Keys, vira pesos via softmax e mistura os Values.' },
        { lineRange: [38, 42], content: 'Os prints conferem os shapes e mostram os pesos finais que entram no vetor de contexto.' },
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
4. one Query compares against the Keys to produce scores
5. softmax turns scores into weights
6. the weights mix the Values and produce context

Operational reading:
- **Q** is the vector used to query
- **K** is the vector used to be compared
- **V** is the content that enters the result when its weight is high

On the next slide, this projection becomes part of the \`CausalSelfAttention\` class.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/qkv-intuition
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 11], content: 'The example fixes tokens, width `C`, and a small `x` tensor so the whole calculation fits on the slide.' },
        { lineRange: [13, 28], content: '`c_attn` mimics the GPT-2 projection: one matrix maps each token from `C` to `3C`.' },
        { lineRange: [30, 31], content: 'After projection, `split(C)` separates the wide block into `Q`, `K`, and `V`.' },
        { lineRange: [33, 36], content: 'The `people` Query computes scores against all Keys, becomes weights through softmax, and mixes the Values.' },
        { lineRange: [38, 42], content: 'The prints verify shapes and show the final weights entering the context vector.' },
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
        scoreLabel: 'Q_people x K',
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
          'A Query ativa escolhe pesos comparando com Keys.',
          'O contexto final é uma soma ponderada dos Values.',
        ],
      },
      'en-us': {
        title: 'QKV lab',
        subtitle: 'Follow one C -> 3C projection and the Query calculation for "people"',
        tokenLabel: 'Tokens',
        projectionLabel: 'c_attn: C -> 3C',
        splitLabel: 'split(C)',
        scoreLabel: 'Q_people x K',
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
          'The active Query chooses weights by comparing against Keys.',
          'The final context is a weighted sum of Values.',
        ],
      },
    },
  },
});
