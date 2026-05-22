import { defineSlide } from './_factory';

export const pytorchDtypeContract = defineSlide({
  id: 'pytorch-dtype-contract',
  type: 'two-column',
  options: { columnRatios: [0.56, 0.44] },
  content: {
    'pt-br': {
      title: 'dtype no PyTorch: contrato de representação',
      body: `No slide anterior, fechamos o fluxo de texto para tensor. Agora falta travar o contrato que evita ambiguidade numérica: **dtype**.

\`dtype\` responde a pergunta: **como cada valor do tensor é representado em memória e interpretado pelas operações**.

Por que isso existe:
1. define a semântica do dado (ID discreto vs valor contínuo);
2. determina compatibilidade entre etapas do pipeline;
3. impacta custo de memória e throughput.

Uso no fluxo de LM:
1. \`idx\` e \`targets\` ficam em \`torch.long\` (indices/classes discretas);
2. representações internas e logits ficam em float (valor contínuo para cálculo numérico);
3. quando necessário, o cast deve ser intencional e visível no código.

Leitura operacional:
- \`shape\` diz organização por eixo;
- \`dtype\` diz natureza numérica de cada valor;
- \`device\` diz onde o tensor está.

Com esse contrato, o próximo slide formaliza logits e loss sem saltos de contexto.`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/dtype-primer
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'Fixamos B, T, C e V para que o exemplo fale a mesma língua dos próximos slides de LM.' },
        { lineRange: [6, 13], content: 'Criamos `idx` e `targets` como tensores inteiros (`torch.long`), preservando o papel discreto de IDs e classes.' },
        { lineRange: [15, 16], content: 'Simulamos representações contínuas em float para hidden e logits, mantendo o mesmo contrato de eixos.' },
        { lineRange: [18, 19], content: 'O cast explícito mostra intenção: quando um tensor muda de papel numérico, a conversão aparece no código.' },
        { lineRange: [21, 25], content: 'Fechamos com um checklist objetivo de `dtype`, `shape` e `device` para cada etapa do fluxo.' },
      ],
    },
    'en-us': {
      title: 'dtype in PyTorch: representation contract',
      body: `In the previous slide, we closed the text-to-tensor flow. One contract is still missing to remove numeric ambiguity: **dtype**.

\`dtype\` answers: **how each tensor value is represented in memory and interpreted by operations**.

Why this exists:
1. it defines data semantics (discrete ID vs continuous value);
2. it sets compatibility across pipeline stages;
3. it affects memory cost and throughput.

Use in the LM flow:
1. \`idx\` and \`targets\` stay in \`torch.long\` (discrete indices/classes);
2. internal representations and logits stay in float (continuous values for numeric computation);
3. when casting is needed, it should be intentional and explicit in code.

Operational reading:
- \`shape\` tells axis organization;
- \`dtype\` tells numeric nature of each value;
- \`device\` tells where the tensor lives.

With this contract in place, the next slide can formalize logits and loss without context jumps.`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/dtype-primer
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'We pin B, T, C, and V so the example speaks the same LM vocabulary used in upcoming slides.' },
        { lineRange: [6, 13], content: 'We create `idx` and `targets` as integer tensors (`torch.long`), preserving their discrete ID/class role.' },
        { lineRange: [15, 16], content: 'We simulate continuous hidden/logit tensors in float while keeping the same axis contract.' },
        { lineRange: [18, 19], content: 'The explicit cast encodes intent: when a tensor changes numeric role, conversion is visible in code.' },
        { lineRange: [21, 25], content: 'We end with a compact `dtype`/`shape`/`device` checklist for each stage in the flow.' },
      ],
    },
  },
});
