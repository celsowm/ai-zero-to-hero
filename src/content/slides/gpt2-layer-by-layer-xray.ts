import { defineSlide } from './_factory';

const layerNumbers = [
  { label: 'emb', similarity: 1.0, attA: [0, 0, 1], attB: [0, 0, 1], bucket: 'embed' },
  { label: 'b01', similarity: 0.97, attA: [0.16, 0.60, 0.24], attB: [0.20, 0.56, 0.24], bucket: 'early' },
  { label: 'b02', similarity: 0.94, attA: [0.22, 0.54, 0.24], attB: [0.28, 0.49, 0.23], bucket: 'early' },
  { label: 'b03', similarity: 0.90, attA: [0.31, 0.45, 0.24], attB: [0.40, 0.38, 0.22], bucket: 'early' },
  { label: 'b04', similarity: 0.86, attA: [0.39, 0.39, 0.22], attB: [0.49, 0.31, 0.20], bucket: 'mid' },
  { label: 'b05', similarity: 0.81, attA: [0.47, 0.33, 0.20], attB: [0.56, 0.26, 0.18], bucket: 'mid' },
  { label: 'b06', similarity: 0.75, attA: [0.55, 0.27, 0.18], attB: [0.62, 0.22, 0.16], bucket: 'mid' },
  { label: 'b07', similarity: 0.70, attA: [0.61, 0.23, 0.16], attB: [0.67, 0.19, 0.14], bucket: 'mid' },
  { label: 'b08', similarity: 0.64, attA: [0.66, 0.19, 0.15], attB: [0.71, 0.16, 0.13], bucket: 'late' },
  { label: 'b09', similarity: 0.58, attA: [0.70, 0.17, 0.13], attB: [0.74, 0.14, 0.12], bucket: 'late' },
  { label: 'b10', similarity: 0.51, attA: [0.73, 0.15, 0.12], attB: [0.77, 0.12, 0.11], bucket: 'late' },
  { label: 'b11', similarity: 0.45, attA: [0.76, 0.13, 0.11], attB: [0.79, 0.11, 0.10], bucket: 'late' },
  { label: 'b12', similarity: 0.40, attA: [0.79, 0.11, 0.10], attB: [0.81, 0.10, 0.09], bucket: 'final' },
] as const;

const ptTop = {
  embed: {
    a: [{ token: "'.'", probability: 0.04 }, { token: "','", probability: 0.03 }, { token: "' and'", probability: 0.03 }],
    b: [{ token: "'?'", probability: 0.04 }, { token: "'.'", probability: 0.03 }, { token: "' not'", probability: 0.03 }],
  },
  early: {
    a: [{ token: "' of'", probability: 0.16 }, { token: "','", probability: 0.09 }, { token: "' are'", probability: 0.07 }],
    b: [{ token: "' ready'", probability: 0.10 }, { token: "' not'", probability: 0.09 }, { token: "' going'", probability: 0.07 }],
  },
  mid: {
    a: [{ token: "' of'", probability: 0.26 }, { token: "' to'", probability: 0.07 }, { token: "','", probability: 0.06 }],
    b: [{ token: "' ready'", probability: 0.15 }, { token: "' happy'", probability: 0.12 }, { token: "' going'", probability: 0.09 }],
  },
  late: {
    a: [{ token: "' of'", probability: 0.36 }, { token: "' to'", probability: 0.08 }, { token: "' who'", probability: 0.05 }],
    b: [{ token: "' ready'", probability: 0.19 }, { token: "' happy'", probability: 0.16 }, { token: "' going'", probability: 0.10 }],
  },
  final: {
    a: [{ token: "' of'", probability: 0.42 }, { token: "' to'", probability: 0.08 }, { token: "' who'", probability: 0.04 }],
    b: [{ token: "' ready'", probability: 0.21 }, { token: "' happy'", probability: 0.18 }, { token: "' going'", probability: 0.11 }],
  },
};

const ptPhases = [
  'embedding puro',
  'contexto local começa',
  'atenção ainda perto do token vizinho',
  'primeira diferença contextual visível',
  'o slot de "people" começa a carregar a frase',
  'atenção e MLP acumulam atualização',
  'a representação deixa de ser só a palavra',
  'o contexto já está codificado no vetor',
  'camadas finais preparam a leitura do lm_head',
  'distribuições de próximo token se afastam',
  'mesmo shape, semântica mais separada',
  'o vetor já representa a frase, não só o token',
  'vetor contextual final antes de logits',
];

const enPhases = [
  'raw embedding',
  'local context starts',
  'attention still leans on the neighbor token',
  'first visible contextual difference',
  'the "people" slot starts carrying the phrase',
  'attention and MLP accumulate updates',
  'the representation is no longer just the word',
  'context is now encoded inside the vector',
  'final layers prepare the lm_head readout',
  'next-token distributions pull apart',
  'same shape, more separated semantics',
  'the vector represents the phrase, not just the token',
  'final contextual vector before logits',
];

function buildLayers(language: 'pt-br' | 'en-us') {
  const phases = language === 'pt-br' ? ptPhases : enPhases;
  const notePrefix = language === 'pt-br'
    ? 'O tensor continua em (1, 3, 768), mas a similaridade do token-alvo entre os dois contextos agora é'
    : 'The tensor is still (1, 3, 768), but target-token similarity across the two contexts is now';

  return layerNumbers.map((layer, index) => ({
    label: layer.label,
    phase: phases[index],
    note: `${notePrefix} ${layer.similarity.toFixed(2)}.`,
    similarity: layer.similarity,
    attentionA: layer.attA,
    attentionB: layer.attB,
    topTokensA: ptTop[layer.bucket].a,
    topTokensB: ptTop[layer.bucket].b,
  }));
}

const codeExplanationsPt = [
  { lineRange: [4, 6] as [number, number], content: 'Importa PyTorch, similaridade de cosseno e as classes HuggingFace necessárias para abrir o GPT-2 real.' },
  { lineRange: [9, 17] as [number, number], content: 'Define o modelo, as duas frases comparadas, o token-alvo e carrega tokenizador/modelo em modo `eval`.' },
  { lineRange: [20, 32] as [number, number], content: '`decode_tokens` revela os tokens BPE reais. Isso é essencial porque GPT-2 trata `" people"` como token com espaço.' },
  { lineRange: [35, 41] as [number, number], content: '`target_position` localiza `people` ignorando espaços ao redor, preservando a posição real no tensor.' },
  { lineRange: [44, 58] as [number, number], content: '`top_next_tokens` transforma logits em probabilidades e imprime os tokens mais prováveis para a próxima posição.' },
  { lineRange: [61, 79] as [number, number], content: '`run_phrase` executa o forward com `output_hidden_states` e `output_attentions`, guardando tudo que o raio-X precisa.' },
  { lineRange: [82, 97] as [number, number], content: 'Roda as duas frases, extrai hidden states, posição de `people` e o vetor-base da camada de embedding.' },
  { lineRange: [99, 114] as [number, number], content: 'Loop camada a camada: o shape permanece igual, enquanto cossenos medem quanto o vetor de `people` diverge com o contexto.' },
  { lineRange: [117, 131] as [number, number], content: 'Para cada bloco, calcula a atenção média entre heads e mostra para quais tokens o `people` contextualizado olha.' },
  { lineRange: [134, 149] as [number, number], content: 'Compara top-5 usando uma sonda no embedding inicial contra top-5 após os 12 blocos, conectando vetor contextual a logits.' },
];

const codeExplanationsEn = [
  { lineRange: [4, 6] as [number, number], content: 'Import PyTorch, cosine similarity, and the HuggingFace classes needed to inspect the real GPT-2.' },
  { lineRange: [9, 17] as [number, number], content: 'Define the model, the two compared phrases, the target token, and load tokenizer/model in `eval` mode.' },
  { lineRange: [20, 32] as [number, number], content: '`decode_tokens` reveals the actual BPE tokens. This matters because GPT-2 treats `" people"` as a token with a leading space.' },
  { lineRange: [35, 41] as [number, number], content: '`target_position` locates `people` while ignoring surrounding whitespace, keeping the real tensor position.' },
  { lineRange: [44, 58] as [number, number], content: '`top_next_tokens` converts logits into probabilities and prints the most likely next-position tokens.' },
  { lineRange: [61, 79] as [number, number], content: '`run_phrase` performs the forward pass with `output_hidden_states` and `output_attentions`, preserving everything the X-ray needs.' },
  { lineRange: [82, 97] as [number, number], content: 'Run both phrases, extract hidden states, the `people` position, and the layer-0 embedding vector.' },
  { lineRange: [99, 114] as [number, number], content: 'Layer-by-layer loop: shape stays fixed while cosine scores measure how the `people` vector diverges with context.' },
  { lineRange: [117, 131] as [number, number], content: 'For every block, average attention across heads and show which tokens contextualized `people` attends to.' },
  { lineRange: [134, 149] as [number, number], content: 'Compare top-5 from an initial-embedding probe against top-5 after 12 blocks, connecting contextual vectors to logits.' },
];

export const gpt2LayerByLayerXray = defineSlide({
  id: 'gpt2-layer-by-layer-xray',
  type: 'two-column',
  options: { columnRatios: [0.42, 0.58] },
  content: {
    'pt-br': {
      title: 'Mesmo shape. Outro vetor.',
      body: `O GPT-2 não transforma \`(B,T,C)\` em uma sequência de shapes diferentes enquanto atravessa os blocos.

Para:

\`\`\`txt
"We the people"
\`\`\`

temos:

\`\`\`txt
B = 1
T = 3
C = 768
x.shape = (1, 3, 768)
\`\`\`

Depois do embedding:

\`\`\`txt
wte(idx) + wpe(pos)
\`\`\`

o tensor passa por 12 blocos:

\`\`\`txt
block 01 -> (1, 3, 768)
block 02 -> (1, 3, 768)
...
block 12 -> (1, 3, 768)
\`\`\`

O tamanho não muda. O conteúdo de cada vetor muda.

---

## O experimento

Compare duas frases quase iguais:

\`\`\`txt
We the people
Are the people
\`\`\`

Nas duas, o token final é \`" people"\` e ocupa a posição 2.

Na camada de embedding, esse slot ainda é basicamente:

\`\`\`txt
token embedding + position embedding
\`\`\`

Depois dos blocos, o mesmo slot passou a carregar informação dos tokens anteriores. Em uma frase ele leu \`We the\`; na outra, leu \`Are the\`.

---

## O que o raio-X mede

O código abre três sinais do forward real:

| Sinal | Pergunta |
|---|---|
| hidden states | o vetor de \`people\` divergiu? |
| attentions | para onde \`people\` olhou? |
| logits | a previsão de próximo token mudou? |

A frase curta:

\`\`\`txt
shape igual, vetor diferente, logits diferentes
\`\`\`

é a intuição que você deve levar daqui.`,
      rightBody: '',
    },
    'en-us': {
      title: 'Same shape. Different vector.',
      body: `GPT-2 does not turn \`(B,T,C)\` into a chain of different shapes while the tensor crosses the blocks.

For:

\`\`\`txt
"We the people"
\`\`\`

we have:

\`\`\`txt
B = 1
T = 3
C = 768
x.shape = (1, 3, 768)
\`\`\`

After the embedding:

\`\`\`txt
wte(idx) + wpe(pos)
\`\`\`

the tensor crosses 12 blocks:

\`\`\`txt
block 01 -> (1, 3, 768)
block 02 -> (1, 3, 768)
...
block 12 -> (1, 3, 768)
\`\`\`

The size does not change. The content of each vector changes.

---

## The experiment

Compare two nearly identical phrases:

\`\`\`txt
We the people
Are the people
\`\`\`

In both, the final token is \`" people"\` and occupies position 2.

At the embedding layer, this slot is still mostly:

\`\`\`txt
token embedding + position embedding
\`\`\`

After the blocks, the same slot carries information from the previous tokens. In one phrase it read \`We the\`; in the other, it read \`Are the\`.

---

## What the X-ray measures

The code opens three signals from the real forward pass:

| Signal | Question |
|---|---|
| hidden states | did the \`people\` vector diverge? |
| attentions | where did \`people\` look? |
| logits | did the next-token prediction change? |

The short version:

\`\`\`txt
same shape, different vector, different logits
\`\`\`

is the intuition to take away.`,
      rightBody: '',
    },
  },
  visual: {
    id: 'gpt2-layer-by-layer-xray',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Código' }, { label: 'Raio-X' }],
        codePanel: {
          title: 'Forward real, medido por camada',
          description: 'O snippet roda GPT-2 com hidden states, atenções e logits ligados para mostrar o que muda sem mudar o shape.',
          source: { snippetId: 'gpt2_manual/gpt2-layer-by-layer-xray', language: 'python' },
          codeExplanations: codeExplanationsPt,
        },
        visualPanel: {
          ariaLabel: 'Raio-X camada por camada do GPT-2',
          title: 'Raio-X interativo',
          description: 'Escolha uma camada: o shape fica fixo, mas similaridade, atenção e próximos tokens mostram a contextualização acontecendo.',
          layerControlLabel: 'Camada observada',
          shapeTitle: 'shape invariável',
          shapeCaption: 'B=1, T=3, C=768',
          tokenTitle: 'Mesmo token-alvo, mesmo índice',
          similarityTitle: 'cos("people" em A, "people" em B)',
          attentionTitle: 'Atenção média do token-alvo',
          logitsTitle: 'Top próximos tokens',
          phraseALabel: 'We the people',
          phraseBLabel: 'Are the people',
          targetLabel: 'alvo',
          positionLabel: 'pos',
          measuredNote: 'Os valores do painel são didáticos para guiar a leitura. O snippet ao lado mede os valores reais do GPT-2; eles podem oscilar por camada, mas a tese permanece: shape fixo, conteúdo vetorial contextual.',
          pipeline: ['idx', 'wte+wpe', 'block[0..11]', 'ln_f', 'lm_head', 'logits[:, -1, :]'],
          tokensA: ['We', ' the', ' people'],
          tokensB: ['Are', ' the', ' people'],
          layers: buildLayers('pt-br'),
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'X-ray' }],
        codePanel: {
          title: 'Real forward, measured by layer',
          description: 'The snippet runs GPT-2 with hidden states, attentions, and logits enabled to show what changes without changing shape.',
          source: { snippetId: 'gpt2_manual/gpt2-layer-by-layer-xray', language: 'python' },
          codeExplanations: codeExplanationsEn,
        },
        visualPanel: {
          ariaLabel: 'Layer-by-layer GPT-2 X-ray',
          title: 'Interactive X-ray',
          description: 'Pick a layer: shape stays fixed, while similarity, attention, and next tokens show contextualization happening.',
          layerControlLabel: 'Observed layer',
          shapeTitle: 'invariant shape',
          shapeCaption: 'B=1, T=3, C=768',
          tokenTitle: 'Same target token, same index',
          similarityTitle: 'cos("people" in A, "people" in B)',
          attentionTitle: 'Average attention from the target token',
          logitsTitle: 'Top next tokens',
          phraseALabel: 'We the people',
          phraseBLabel: 'Are the people',
          targetLabel: 'target',
          positionLabel: 'pos',
          measuredNote: 'Panel values are didactic reading guides. The snippet measures real GPT-2 values; they may oscillate by layer, but the core point remains: fixed shape, contextual vector content.',
          pipeline: ['idx', 'wte+wpe', 'block[0..11]', 'ln_f', 'lm_head', 'logits[:, -1, :]'],
          tokensA: ['We', ' the', ' people'],
          tokensB: ['Are', ' the', ' people'],
          layers: buildLayers('en-us'),
        },
      },
    },
  },
});
