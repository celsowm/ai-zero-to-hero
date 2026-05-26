import { defineSlide } from './_factory';

const codeExplanationsPt = [
  { lineRange: [4, 17] as [number, number], content: 'Importa PyTorch, similaridade de cosseno, GPT-2/tokenizer e fixa as frases, bloco, head e blocos que serão comparados.' },
  { lineRange: [20, 35] as [number, number], content: 'Carrega GPT-2 em modo `eval` e tenta usar atenção eager para que `outputs.attentions` seja comparável ao cálculo manual.' },
  { lineRange: [38, 49] as [number, number], content: 'Mostra os tokens decodificados reais e encontra a posição de `people` mesmo quando o espaço faz parte do token.' },
  { lineRange: [52, 69] as [number, number], content: 'Reconstrói `Q`, `K` e `V`: `ln_1` normaliza o hidden de entrada do bloco, `c_attn` projeta para `3C` e `split_heads` reorganiza para heads.' },
  { lineRange: [72, 84] as [number, number], content: 'Calcula atenção causal manual: attention logits escalados, máscara triangular, softmax e soma ponderada dos Values.' },
  { lineRange: [87, 111] as [number, number], content: 'Executa cada frase com hidden states e attentions ligados, guardando tokens e posição-alvo para a inspeção.' },
  { lineRange: [114, 143] as [number, number], content: 'Imprime o raio-X da head: shapes de `Q/K/V`, preview de `Q_i`, attention logits contra cada token permitido, pesos e norma de cada `V_j`.' },
  { lineRange: [146, 157] as [number, number], content: 'Compara os pesos calculados manualmente com `outputs.attentions` do Hugging Face para validar a conta.' },
  { lineRange: [160, 187] as [number, number], content: 'Mede cossenos de `Q/K/V` do token `people` entre as duas frases para mostrar como o contexto muda as projeções por bloco.' },
  { lineRange: [190, 198] as [number, number], content: 'Fecha com a fórmula operacional: `Q` e `K` produzem attention logits e pesos; `V` é o conteúdo misturado na saída da head.' },
];

const codeExplanationsEn = [
  { lineRange: [4, 17] as [number, number], content: 'Import PyTorch, cosine similarity, GPT-2/tokenizer, and fix the phrases, block, head, and blocks to compare.' },
  { lineRange: [20, 35] as [number, number], content: 'Load GPT-2 in `eval` mode and try eager attention so `outputs.attentions` can be compared with the manual calculation.' },
  { lineRange: [38, 49] as [number, number], content: 'Show the real decoded tokens and find the `people` position even when the leading space is part of the token.' },
  { lineRange: [52, 69] as [number, number], content: 'Reconstruct `Q`, `K`, and `V`: `ln_1` normalizes the block input hidden state, `c_attn` projects to `3C`, and `split_heads` rearranges into heads.' },
  { lineRange: [72, 84] as [number, number], content: 'Compute causal attention manually: scaled attention logits, triangular mask, softmax, and weighted sum of Values.' },
  { lineRange: [87, 111] as [number, number], content: 'Run each phrase with hidden states and attentions enabled, keeping tokens and target position for inspection.' },
  { lineRange: [114, 143] as [number, number], content: 'Print the head X-ray: `Q/K/V` shapes, `Q_i` preview, attention logits against each allowed token, weights, and each `V_j` norm.' },
  { lineRange: [146, 157] as [number, number], content: 'Compare the manually computed weights with Hugging Face `outputs.attentions` to validate the calculation.' },
  { lineRange: [160, 187] as [number, number], content: 'Measure `Q/K/V` cosines for the `people` token across the two phrases to show how context changes the projections by block.' },
  { lineRange: [190, 198] as [number, number], content: 'Close with the operational formula: `Q` and `K` produce attention logits and weights; `V` is the content mixed into the head output.' },
];

const phrases = [
  {
    label: 'We the people',
    tokens: ['We', ' the', ' people'],
    targetIndex: 2,
    qPreview: [0.184, -0.267, 0.512, 0.041, -0.138, 0.323],
    rows: [
      { token: 'We', score: 0.21, weight: 0.28, valueNorm: 3.91 },
      { token: ' the', score: 0.96, weight: 0.58, valueNorm: 4.28 },
      { token: ' people', score: -0.44, weight: 0.14, valueNorm: 4.07 },
    ],
    contextPreview: [0.096, 0.211, -0.173, 0.388, -0.052, 0.127],
    hfDiff: '2.98e-08',
  },
  {
    label: 'Are the people',
    tokens: ['Are', ' the', ' people'],
    targetIndex: 2,
    qPreview: [0.142, -0.219, 0.463, 0.066, -0.092, 0.285],
    rows: [
      { token: 'Are', score: 0.38, weight: 0.33, valueNorm: 4.12 },
      { token: ' the', score: 0.82, weight: 0.51, valueNorm: 4.24 },
      { token: ' people', score: -0.31, weight: 0.16, valueNorm: 4.07 },
    ],
    contextPreview: [0.078, 0.246, -0.118, 0.331, -0.021, 0.162],
    hfDiff: '3.35e-08',
  },
] as const;

const cosines = [
  { block: '0', q: 1.00, k: 1.00, v: 1.00 },
  { block: '1', q: 0.96, k: 0.97, v: 0.95 },
  { block: '2', q: 0.92, k: 0.93, v: 0.90 },
  { block: '5', q: 0.83, k: 0.80, v: 0.78 },
  { block: '8', q: 0.72, k: 0.69, v: 0.66 },
  { block: '11', q: 0.61, k: 0.58, v: 0.55 },
] as const;

const stepsPt = [
  {
    label: 'Q/K/V',
    title: 'Uma projeção vira três leituras',
    body: '`c_attn` lê o hidden normalizado e produz `[Q | K | V]`. Depois o tensor é dividido por heads.',
    formula: '[B,T,C] -> c_attn -> [B,T,3C] -> Q,K,V -> [B,H,T,D]',
    focus: 'qkv',
  },
  {
    label: 'logits',
    title: 'Q compara com K',
    body: 'Para o token-alvo, a Query da posição i mede compatibilidade com as Keys e produz attention logits entre posições.',
    formula: 'attention_logit(i,j) = Q_i * K_j / sqrt(D)',
    focus: 'scores',
  },
  {
    label: 'máscara',
    title: 'A causalidade corta o futuro',
    body: 'A máscara triangular impede olhar para j > i. Nesta frase curta, o token final pode olhar para os três tokens.',
    formula: 'permitido somente quando j <= i',
    focus: 'mask',
  },
  {
    label: 'softmax',
    title: 'Attention logits viram pesos',
    body: 'Softmax normaliza os attention logits permitidos. A soma dos pesos vira 1 dentro da linha do token-alvo.',
    formula: 'peso(i,j) = softmax_j(attention_logit(i,j))',
    focus: 'softmax',
  },
  {
    label: 'soma V',
    title: 'Só V entra na soma',
    body: 'Q e K produziram os pesos. A saída da head é a mistura ponderada dos vetores V e volta para o residual stream.',
    formula: 'saída_i = soma_j peso(i,j) * V_j',
    focus: 'weighted',
  },
  {
    label: 'HF check',
    title: 'A conta bate com o Hugging Face',
    body: 'O snippet compara os pesos manuais com `outputs.attentions` do GPT-2 real.',
    formula: 'max(abs(weights_manual - outputs.attentions[block]))',
    focus: 'check',
  },
  {
    label: 'cos QKV',
    title: 'O contexto muda as projeções',
    body: 'Entre as duas frases, o mesmo token `people` passa a gerar Q/K/V diferentes conforme atravessa os blocos.',
    formula: 'cos(Q_A, Q_B), cos(K_A, K_B), cos(V_A, V_B)',
    focus: 'cosine',
  },
] as const;

const stepsEn = [
  {
    label: 'Q/K/V',
    title: 'One projection becomes three reads',
    body: '`c_attn` reads the normalized hidden state and produces `[Q | K | V]`. Then the tensor is split by heads.',
    formula: '[B,T,C] -> c_attn -> [B,T,3C] -> Q,K,V -> [B,H,T,D]',
    focus: 'qkv',
  },
  {
    label: 'logits',
    title: 'Q compares with K',
    body: 'For the target token, the Query at position i measures compatibility with Keys and produces attention logits between positions.',
    formula: 'attention_logit(i,j) = Q_i * K_j / sqrt(D)',
    focus: 'scores',
  },
  {
    label: 'mask',
    title: 'Causality cuts off the future',
    body: 'The triangular mask prevents looking at j > i. In this short phrase, the final token can attend to all three tokens.',
    formula: 'allowed only when j <= i',
    focus: 'mask',
  },
  {
    label: 'softmax',
    title: 'Attention logits become weights',
    body: 'Softmax normalizes the allowed attention logits. The weights sum to 1 inside the target-token row.',
    formula: 'weight(i,j) = softmax_j(attention_logit(i,j))',
    focus: 'softmax',
  },
  {
    label: 'sum V',
    title: 'Only V enters the sum',
    body: 'Q and K produced the weights. The head output is the weighted mix of V vectors and returns to the residual stream.',
    formula: 'output_i = sum_j weight(i,j) * V_j',
    focus: 'weighted',
  },
  {
    label: 'HF check',
    title: 'The math matches Hugging Face',
    body: 'The snippet compares manual weights with `outputs.attentions` from the real GPT-2.',
    formula: 'max(abs(weights_manual - outputs.attentions[block]))',
    focus: 'check',
  },
  {
    label: 'cos QKV',
    title: 'Context changes the projections',
    body: 'Across the two phrases, the same `people` token starts producing different Q/K/V as it crosses the blocks.',
    formula: 'cos(Q_A, Q_B), cos(K_A, K_B), cos(V_A, V_B)',
    focus: 'cosine',
  },
] as const;

export const gpt2AttentionQkvXray = defineSlide({
  id: 'gpt2-attention-qkv-xray',
  type: 'two-column',
  options: { columnRatios: [0.42, 0.58] },
  content: {
    'pt-br': {
      title: 'Q e K geram attention logits. V entra na soma.',
      body: `No slide anterior, a tese era:

\`\`\`txt
mesmo shape, vetor diferente
\`\`\`

Agora abrimos uma head para ver uma parte concreta dessa mudança.

Dentro de um bloco do GPT-2, o hidden normalizado passa por:

\`\`\`txt
c_attn(x) -> [Q | K | V]
\`\`\`

Para cada posição \`i\`, a head faz:

\`\`\`txt
attention_logit(i,j) = Q_i * K_j / sqrt(d)
peso(i,j)            = softmax_j(attention_logit(i,j))
saída_i    = soma_j peso(i,j) * V_j
\`\`\`

com a restrição causal:

\`\`\`txt
j <= i
\`\`\`

---

## Leitura operacional

\`Q\` é o que a posição atual está procurando.

\`K\` é o que cada posição oferece para comparação.

\`V\` é o conteúdo que entra no vetor de saída quando recebe peso.

Frase-chave:

\`\`\`txt
Q e K geram attention logits e pesos;
V é o conteúdo misturado;
a saída da head escreve no residual stream.
\`\`\`

Esses attention logits não são logits do vocabulário. Os logits finais aparecem depois que o residual acumulado atravessa outros blocos, \`ln_f\` e \`lm_head\`.

O snippet confere isso contra \`outputs.attentions\` do Hugging Face e mede como \`Q/K/V\` do mesmo token divergem entre \`We the people\` e \`Are the people\`.`,
      rightBody: '',
    },
    'en-us': {
      title: 'Q and K create attention logits. V enters the sum.',
      body: `In the previous slide, the thesis was:

\`\`\`txt
same shape, different vector
\`\`\`

Now we open one head to see a concrete part of that change.

Inside a GPT-2 block, the normalized hidden state goes through:

\`\`\`txt
c_attn(x) -> [Q | K | V]
\`\`\`

For each position \`i\`, the head does:

\`\`\`txt
attention_logit(i,j) = Q_i * K_j / sqrt(d)
weight(i,j)          = softmax_j(attention_logit(i,j))
output_i             = sum_j weight(i,j) * V_j
\`\`\`

with the causal constraint:

\`\`\`txt
j <= i
\`\`\`

---

## Operational reading

\`Q\` is what the current position is searching for.

\`K\` is what each position offers for comparison.

\`V\` is the content that enters the output vector when it receives weight.

Key sentence:

\`\`\`txt
Q and K create attention logits and weights;
V is the mixed content;
the head output writes into the residual stream.
\`\`\`

These attention logits are not vocabulary logits. Final logits appear later after the accumulated residual crosses more blocks, \`ln_f\`, and \`lm_head\`.

The snippet checks this against Hugging Face \`outputs.attentions\` and measures how \`Q/K/V\` for the same token diverge between \`We the people\` and \`Are the people\`.`,
      rightBody: '',
    },
  },
  visual: {
    id: 'gpt2-attention-qkv-xray',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Código' }, { label: 'Raio-X' }],
        codePanel: {
          title: 'Q/K/V manual dentro do GPT-2',
          description: 'O snippet reconstrói Q, K e V com os pesos reais do GPT-2, calcula atenção causal manualmente e confere contra Hugging Face.',
          source: { snippetId: 'gpt2_manual/attention-qkv-xray', language: 'python' },
          codeExplanations: codeExplanationsPt,
        },
        visualPanel: {
          ariaLabel: 'Raio-X de Q, K e V em uma head do GPT-2',
          title: 'Dentro de uma head',
          description: 'Percorra a conta: Q e K produzem attention logits e pesos; a soma mistura Values e escreve no residual.',
          phraseControlLabel: 'Frase observada',
          stepControlLabel: 'Etapa da atenção',
          blockHeadLabel: 'bloco / head',
          shapeTitle: 'shape de Q/K/V',
          qkvTitle: 'Preview de Q_i',
          scoreTitle: 'attention logit',
          maskTitle: 'máscara causal',
          weightTitle: 'peso',
          valueTitle: '||V_j||',
          outputTitle: 'Preview da saída da head',
          checkTitle: 'diferença máxima',
          cosineTitle: 'Mesmo token, projeções diferentes',
          measuredNote: 'Os números do painel são didáticos para guiar a leitura. O snippet mede valores reais no GPT-2 e valida os pesos contra outputs.attentions.',
          targetLabel: 'alvo',
          positionLabel: 'pos',
          steps: stepsPt,
          phrases,
          cosines,
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'X-ray' }],
        codePanel: {
          title: 'Manual Q/K/V inside GPT-2',
          description: 'The snippet reconstructs Q, K, and V with real GPT-2 weights, computes causal attention manually, and checks it against Hugging Face.',
          source: { snippetId: 'gpt2_manual/attention-qkv-xray', language: 'python' },
          codeExplanations: codeExplanationsEn,
        },
        visualPanel: {
          ariaLabel: 'Q, K, and V X-ray inside one GPT-2 head',
          title: 'Inside one head',
          description: 'Step through the calculation: Q and K produce attention logits and weights; the sum mixes Values and writes into the residual.',
          phraseControlLabel: 'Observed phrase',
          stepControlLabel: 'Attention step',
          blockHeadLabel: 'block / head',
          shapeTitle: 'Q/K/V shape',
          qkvTitle: 'Q_i preview',
          scoreTitle: 'attention logit',
          maskTitle: 'causal mask',
          weightTitle: 'weight',
          valueTitle: '||V_j||',
          outputTitle: 'Head output preview',
          checkTitle: 'max difference',
          cosineTitle: 'Same token, different projections',
          measuredNote: 'Panel numbers are didactic reading guides. The snippet measures real GPT-2 values and validates the weights against outputs.attentions.',
          targetLabel: 'target',
          positionLabel: 'pos',
          steps: stepsEn,
          phrases,
          cosines,
        },
      },
    },
  },
});
