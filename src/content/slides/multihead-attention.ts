import { defineSlide } from './_factory';

export const multiheadAttention = defineSlide({
  id: 'multihead-attention',
  type: 'two-column',
  options: {
    columnRatios: [0.43, 0.57],
  },
  content: {
    'pt-br': {
      title: 'Multi-head attention: 12 leituras paralelas',
      body: `Uma única matriz de atenção força todo o contexto a passar por uma lente só. Multi-head attention resolve isso dividindo a largura interna em subespaços menores.

No GPT-2 pequeno:
- \`C = 768\` dimensões no vetor do token
- \`H = 12\` cabeças
- \`D = 64\` dimensões por cabeça
- \`C = H x D\`

O ponto técnico:
1. cada cabeça recebe seu próprio pedaço de \`Q\`, \`K\` e \`V\`
2. cada cabeça calcula uma matriz de atenção diferente
3. as saídas são concatenadas de volta para \`C\`
4. \`c_proj\` mistura as 12 leituras em um único vetor

Não é "12 modelos". É o mesmo bloco lendo a sequência em 12 subespaços paralelos.`,
      rightBody: `\`\`\`python
snippet:attention/multihead-shapes
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 7], content: 'Definimos o contrato de shapes: batch, tempo, largura interna, número de heads e dimensão por head.' },
        { lineRange: [9, 14], content: 'A projeção QKV gera 3C e depois cada tensor é reorganizado em H heads de dimensão D.' },
        { lineRange: [16, 22], content: 'Cada head calcula atenção separada; no fim, concatenamos as heads e voltamos para a largura C.' },
      ],
    },
    'en-us': {
      title: 'Multi-head attention: 12 parallel reads',
      body: `A single attention matrix forces all context through one lens. Multi-head attention fixes this by splitting the hidden width into smaller subspaces.

In small GPT-2:
- \`C = 768\` dimensions in the token vector
- \`H = 12\` heads
- \`D = 64\` dimensions per head
- \`C = H x D\`

Technical point:
1. each head receives its own slice of \`Q\`, \`K\`, and \`V\`
2. each head computes a different attention matrix
3. outputs are concatenated back to \`C\`
4. \`c_proj\` mixes the 12 reads into one vector

This is not "12 models". It is the same block reading the sequence in 12 parallel subspaces.`,
      rightBody: `\`\`\`python
snippet:attention/multihead-shapes
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 7], content: 'We define the shape contract: batch, time, hidden width, number of heads, and per-head width.' },
        { lineRange: [9, 14], content: 'The QKV projection creates 3C, then each tensor is reshaped into H heads of width D.' },
        { lineRange: [16, 22], content: 'Each head computes separate attention; at the end, we concatenate heads and return to width C.' },
      ],
    },
  },
  visual: {
    id: 'multihead-diagram',
    copy: {
      'pt-br': {
        title: 'Contrato de shapes',
        inputLabel: 'x',
        qkvLabel: 'projeção QKV',
        splitLabel: 'reshape em heads',
        attentionLabel: 'atenção por head',
        concatLabel: 'concat + c_proj',
        outputLabel: 'y',
        inputShape: '(B, T, 768)',
        qkvShape: '3 x (B, T, 768)',
        headShape: '(B, 12, T, 64)',
        attentionShape: '12 matrizes (T x T)',
        outputShape: '(B, T, 768)',
        headLabels: [
          'Head 1: relações locais',
          'Head 2: estrutura sintática',
          'Head 3: dependências longas',
          '...',
          'Head 12: outro subespaço',
        ],
        takeaway: 'Cada head vê 64 dimensões. Juntas, as 12 heads recompõem as 768 dimensões.',
      },
      'en-us': {
        title: 'Shape contract',
        inputLabel: 'x',
        qkvLabel: 'QKV projection',
        splitLabel: 'reshape into heads',
        attentionLabel: 'attention per head',
        concatLabel: 'concat + c_proj',
        outputLabel: 'y',
        inputShape: '(B, T, 768)',
        qkvShape: '3 x (B, T, 768)',
        headShape: '(B, 12, T, 64)',
        attentionShape: '12 matrices (T x T)',
        outputShape: '(B, T, 768)',
        headLabels: [
          'Head 1: local relations',
          'Head 2: syntactic structure',
          'Head 3: long dependencies',
          '...',
          'Head 12: another subspace',
        ],
        takeaway: 'Each head sees 64 dimensions. Together, 12 heads rebuild the 768 dimensions.',
      },
    },
  },
});
