import { defineSlide } from './_factory';

export const embeddingsIntro = defineSlide({
  id: 'embeddings-intro',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Embedding no GPT-2: entrada canônica',
      body: `**Intuição:** \`embedding\` vem da ideia de "inserir/imersar" IDs discretos em um espaço vetorial contínuo onde o modelo consegue raciocinar por geometria.

**Operação:** no GPT-2, a entrada nasce de um passo canônico:
1. \`token_embedding(idx)\` mapeia IDs para vetores de conteúdo
2. \`position_embedding(positions)\` mapeia posição para vetores de ordem
3. soma dos dois vetores produz o residual stream inicial \`(B, T, C)\`

**Formal (curto):** se \`idx \\in Z^{B\\times T}\`, então \`E_t[idx] + E_p[pos] \\in R^{B\\times T\\times C}\`.

Sem posição, tokens iguais em lugares diferentes parecem o mesmo evento.`,
      rightBody: `\`\`\`python
snippet:repo-gpt2/embedding-sum
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'Começamos com IDs e posições explícitas para mostrar as duas fontes de informação.' },
        { lineRange: [7, 8], content: 'As duas tabelas aprendem coisas diferentes: conteúdo do token e posição.' },
        { lineRange: [10, 11], content: 'A soma já produz o tensor `(B, T, C)` que entra nos blocos do Transformer.' },
      ],
    },
    'en-us': {
      title: 'GPT-2 Embedding: canonical input step',
      body: `**Intuition:** \`embedding\` comes from the idea of "inserting/immersing" discrete IDs into a continuous vector space where geometry becomes usable.

**Operation:** in GPT-2, input is born from one canonical step:
1. \`token_embedding(idx)\` maps IDs into content vectors
2. \`position_embedding(positions)\` maps positions into order vectors
3. summing both vectors produces the initial residual stream \`(B, T, C)\`

**Formal (short):** if \`idx \\in Z^{B\\times T}\`, then \`E_t[idx] + E_p[pos] \\in R^{B\\times T\\times C}\`.

Without position, identical tokens in different places look like the same event.`,
      rightBody: `\`\`\`python
snippet:repo-gpt2/embedding-sum
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 5], content: 'We start with explicit IDs and positions to expose the two information sources.' },
        { lineRange: [7, 8], content: 'The two tables learn different things: token content and position.' },
        { lineRange: [10, 11], content: 'The sum already produces the `(B, T, C)` tensor that enters Transformer blocks.' },
      ],
    },
  },
});
