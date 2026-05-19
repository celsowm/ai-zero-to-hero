import { defineSlide } from './_factory';

export const neuralNetworkPytorchNnLayers = defineSlide({
  id: 'neural-network-pytorch-nn-layers',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Camadas PyTorch que importam aqui',
      body: `Em vez de um catálogo genérico, este bloco precisa só das peças que reaparecem no mini LM e no GPT-2:

1. **\`nn.Module\`**
2. **\`nn.Embedding\`**
3. **\`nn.Linear\`**
4. **\`nn.LayerNorm\`**
5. **\`nn.Dropout\`**
6. **\`nn.ModuleList\`**`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/lm-layers
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 1], content: 'Aqui a ênfase está em estrutura, então importamos apenas `nn`.' },
        { lineRange: [3, 12], content: 'O `ModuleDict` explicita as peças centrais do modelo de linguagem: embedding, blocos e cabeça final.' },
      ],
    },
    'en-us': {
      title: 'The PyTorch layers that matter here',
      body: `Instead of a generic catalog, this block only needs the pieces that keep coming back in the tiny LM and GPT-2:

1. **\`nn.Module\`**
2. **\`nn.Embedding\`**
3. **\`nn.Linear\`**
4. **\`nn.LayerNorm\`**
5. **\`nn.Dropout\`**
6. **\`nn.ModuleList\`**`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/lm-layers
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 1], content: 'The emphasis here is structure, so we only import `nn`.' },
        { lineRange: [3, 12], content: 'The `ModuleDict` makes the language-model pieces explicit: embedding, blocks, and final head.' },
      ],
    },
  },
});
