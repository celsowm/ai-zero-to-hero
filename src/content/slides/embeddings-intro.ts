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
    },
  },
  visual: {
    id: 'embedding-space-3d-interactive',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Código' }, { label: 'Interativo 3D' }],
        codePanel: {
          title: 'Passo canônico do embedding no GPT-2',
          description: 'IDs de tokens + posições entram em duas tabelas treináveis e a soma vira o residual stream inicial.',
          source: { snippetId: 'repo-gpt2/embedding-sum', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 5], content: 'Começamos com IDs e posições explícitas para mostrar as duas fontes de informação.' },
            { lineRange: [7, 8], content: 'As duas tabelas aprendem coisas diferentes: conteúdo do token e posição.' },
            { lineRange: [10, 11], content: 'A soma já produz o tensor `(B, T, C)` que entra nos blocos do Transformer.' },
          ],
        },
        interactivePanel: {
          eyebrow: 'ESPAÇO VETORIAL',
          title: 'Embedding em 3D (projeção interativa)',
          description: 'Use o slider para simular embeddings com mais dimensões e veja como a projeção 3D mantém só parte da estrutura total.',
          dimensionsLabel: 'Dimensões do embedding (D)',
          projectionLabel: 'Visualização',
          retainedLabel: 'Sinal aproximado retido em 3D',
          beyond3dTitle: 'O que acontece acima de 3D?',
          beyond3dBody: 'Quando D > 3, a visualização é uma projeção. Pontos que parecem próximos em 3D podem estar separados em dimensões ocultas. O modelo real calcula similaridade no vetor completo, não apenas no recorte 3D.',
          hint: 'Arraste para orbitar; scroll para zoom.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: '3D Interactive' }],
        codePanel: {
          title: 'Canonical GPT-2 embedding step',
          description: 'Token IDs + positions go through two trainable tables, and their sum becomes the initial residual stream.',
          source: { snippetId: 'repo-gpt2/embedding-sum', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 5], content: 'We start with explicit IDs and positions to expose the two information sources.' },
            { lineRange: [7, 8], content: 'The two tables learn different things: token content and position.' },
            { lineRange: [10, 11], content: 'The sum already produces the `(B, T, C)` tensor that enters Transformer blocks.' },
          ],
        },
        interactivePanel: {
          eyebrow: 'VECTOR SPACE',
          title: 'Embedding in 3D (interactive projection)',
          description: 'Use the slider to simulate higher-dimensional embeddings and see how a 3D projection keeps only part of the full structure.',
          dimensionsLabel: 'Embedding dimensions (D)',
          projectionLabel: 'View',
          retainedLabel: 'Approximate signal retained in 3D',
          beyond3dTitle: 'What happens beyond 3D?',
          beyond3dBody: 'When D > 3, this is a projection. Points that look close in 3D may be far apart in hidden dimensions. Real similarity is computed on the full vector, not only on the 3D slice.',
          hint: 'Drag to orbit; scroll to zoom.',
        },
      },
    },
  },
});
