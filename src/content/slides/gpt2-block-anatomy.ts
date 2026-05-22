import { defineSlide } from './_factory';

export const gpt2BlockAnatomy = defineSlide({
  id: 'gpt2-block-anatomy',
  type: 'two-column',
  options: { columnRatios: [0.44, 0.56] },
  content: {
    'pt-br': {
      title: 'Anatomia fiel de um bloco GPT-2',
      body: `Um bloco GPT-2 é curto no código, mas profundo no efeito.

O padrão é **Pre-LN + residual add**:

1. normaliza uma cópia de \`x\`
2. roda atenção causal
3. soma o resultado de volta em \`x\`
4. normaliza a nova versão de \`x\`
5. roda o MLP token-wise
6. soma o resultado de volta em \`x\`

Código essencial:

\`\`\`txt
x = x + attn(ln_1(x))
x = x + mlp(ln_2(x))
\`\`\`

Atenção comunica tokens entre si. MLP transforma cada posição individualmente. O residual stream carrega tudo adiante.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/block-forward
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 9], content: 'O bloco declara duas LayerNorms, uma atenção causal e um MLP.' },
        { lineRange: [11, 14], content: 'O forward mostra o padrão real do GPT-2: normaliza antes de cada subcamada e soma a saída no residual stream.' },
      ],
    },
    'en-us': {
      title: 'Faithful anatomy of one GPT-2 block',
      body: `A GPT-2 block is short in code, but deep in effect.

The pattern is **Pre-LN + residual add**:

1. normalize a copy of \`x\`
2. run causal attention
3. add the result back into \`x\`
4. normalize the new version of \`x\`
5. run the token-wise MLP
6. add the result back into \`x\`

Essential code:

\`\`\`txt
x = x + attn(ln_1(x))
x = x + mlp(ln_2(x))
\`\`\`

Attention communicates across tokens. MLP transforms each position individually. The residual stream carries everything forward.`,
      rightBody: `\`\`\`python
snippet:gpt2_manual/block-forward
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 9], content: 'The block declares two LayerNorms, one causal attention module, and one MLP.' },
        { lineRange: [11, 14], content: 'The forward pass shows the real GPT-2 pattern: normalize before each sublayer and add the output into the residual stream.' },
      ],
    },
  },
  visual: {
    id: 'gpt2-block-anatomy',
    copy: {
      'pt-br': {
        title: 'Dentro de um bloco',
        subtitle: 'O shape permanece (B,T,C); cada subcamada escreve uma atualização no residual stream.',
        inputLabel: 'x',
        preNormLabel: 'Pre-LN',
        attentionLabel: 'atenção causal',
        mlpLabel: 'MLP',
        addLabel: 'residual add',
        outputLabel: 'x atualizado',
        shapeLabel: '(B,T,C)',
        steps: [
          { label: 'ln_1(x)', detail: 'normaliza antes da atenção', color: '#38bdf8' },
          { label: 'attn(...)', detail: 'tokens trocam contexto', color: '#00e5ff' },
          { label: 'x + attn', detail: 'primeira escrita residual', color: '#a855f7' },
          { label: 'ln_2(x)', detail: 'normaliza antes do MLP', color: '#38bdf8' },
          { label: 'mlp(...)', detail: 'transformação por posição', color: '#10b981' },
          { label: 'x + mlp', detail: 'segunda escrita residual', color: '#ff2e97' },
        ],
        takeaways: [
          'LayerNorm vem antes da subcamada.',
          'Atenção mistura informação entre posições.',
          'MLP não comunica tokens; ele edita cada posição.',
        ],
      },
      'en-us': {
        title: 'Inside one block',
        subtitle: 'Shape stays (B,T,C); each sublayer writes an update into the residual stream.',
        inputLabel: 'x',
        preNormLabel: 'Pre-LN',
        attentionLabel: 'causal attention',
        mlpLabel: 'MLP',
        addLabel: 'residual add',
        outputLabel: 'updated x',
        shapeLabel: '(B,T,C)',
        steps: [
          { label: 'ln_1(x)', detail: 'normalize before attention', color: '#38bdf8' },
          { label: 'attn(...)', detail: 'tokens exchange context', color: '#00e5ff' },
          { label: 'x + attn', detail: 'first residual write', color: '#a855f7' },
          { label: 'ln_2(x)', detail: 'normalize before MLP', color: '#38bdf8' },
          { label: 'mlp(...)', detail: 'per-position transform', color: '#10b981' },
          { label: 'x + mlp', detail: 'second residual write', color: '#ff2e97' },
        ],
        takeaways: [
          'LayerNorm comes before the sublayer.',
          'Attention mixes information across positions.',
          'MLP does not communicate tokens; it edits each position.',
        ],
      },
    },
  },
});
