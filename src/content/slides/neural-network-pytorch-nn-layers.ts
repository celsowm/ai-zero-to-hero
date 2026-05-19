import { defineSlide } from './_factory';

export const neuralNetworkPytorchNnLayers = defineSlide({
  id: 'neural-network-pytorch-nn-layers',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Camadas PyTorch que importam aqui',
      body: `Em vez de um catálogo genérico, este bloco precisa so das pecas que reaparecem em qualquer modelo autoregressivo:

1. **\`nn.Module\`**
2. **\`nn.Embedding\`**: converte IDs em vetores aprendiveis
3. **\`nn.Linear\`**: projeta dimensoes (ex: \`C -> V\`)
4. **\`nn.LayerNorm\`**: estabiliza escala de ativacoes
5. **\`nn.Dropout\`**: regularizacao no treino
6. **\`nn.ModuleList\`**: empilha blocos repetidos`,
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
      body: `Instead of a generic catalog, this block only needs the pieces that keep coming back in autoregressive models:

1. **\`nn.Module\`**
2. **\`nn.Embedding\`**: converts IDs into learnable vectors
3. **\`nn.Linear\`**: projects dimensions (for example \`C -> V\`)
4. **\`nn.LayerNorm\`**: stabilizes activation scale
5. **\`nn.Dropout\`**: training regularization
6. **\`nn.ModuleList\`**: stacks repeated blocks`,
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
