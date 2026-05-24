import { defineSlide } from './_factory';

export const samplingControls = defineSlide({
  id: 'sampling-controls',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Sampling: temperature, top-k e top-p',
      body: `Depois que temos logits da última posição, os controles de sampling mudam a distribuição antes do sorteio.

Regras:

- \`temperature\` altera a distribuição antes do softmax
- \`top-k\` corta para os \`k\` melhores candidatos
- \`top-p\` mantém o menor conjunto cuja massa acumulada chega a \`p\`

Leitura prática:

- temperatura baixa: mais conservador
- temperatura alta: mais diverso e arriscado
- top-k pequeno: corta a cauda de forma rígida
- top-p: corta por massa acumulada, adaptando ao formato da distribuição

Erro comum: aplicar top-k/top-p depois de amostrar. O filtro precisa acontecer antes do softmax final usado pelo \`multinomial\`.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/sampling-topk-topp
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 10], content: 'Top-k pega os maiores logits, preenche o resto com `-inf` e calcula probabilidades só sobre os candidatos mantidos.' },
        { lineRange: [12, 19], content: 'Top-p começa ordenando logits, calculando probabilidades e acumulando massa na ordem decrescente.' },
        { lineRange: [21, 30], content: 'O filtro remove tokens após passar de `top_p`, reconstrói o tensor original e calcula o softmax final.' },
      ],
    },
    'en-us': {
      title: 'Sampling: temperature, top-k, and top-p',
      body: `After we have last-position logits, sampling controls change the distribution before sampling.

Rules:

- \`temperature\` changes the distribution before softmax
- \`top-k\` keeps the \`k\` best candidates
- \`top-p\` keeps the smallest set whose cumulative mass reaches \`p\`

Practical reading:

- low temperature: more conservative
- high temperature: more diverse and risky
- small top-k: rigidly cuts the tail
- top-p: cuts by cumulative mass, adapting to the distribution shape

Common error: applying top-k/top-p after sampling. Filtering must happen before the final softmax used by \`multinomial\`.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/sampling-topk-topp
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 10], content: 'Top-k takes the largest logits, fills the rest with `-inf`, and computes probabilities only over kept candidates.' },
        { lineRange: [12, 19], content: 'Top-p starts by sorting logits, computing probabilities, and accumulating mass in descending order.' },
        { lineRange: [21, 30], content: 'The filter removes tokens after passing `top_p`, reconstructs the original tensor, and computes final softmax.' },
      ],
    },
  },
});
