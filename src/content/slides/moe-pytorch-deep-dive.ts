import { defineSlide } from './_factory';

export const moePytorchDeepDive = defineSlide({
  id: 'moe-pytorch-deep-dive',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: 'MoE Deep Dive: Implementação PyTorch',
      body: `Para entender onde o MoE "mora" no código, vamos olhar para uma implementação transparente de uma camada MoE.

### Onde debugar o MoE?
Se você estiver rodando este código localmente, os pontos chave para inspeção são:

1. **A Distribuição de Carga:** Verifique se os especialistas estão sendo usados de forma equilibrada. Um \`torch.bincount(selected_experts)\` revela se há especialistas "viciados".
2. **Top-K Efficiency:** Note que o loop itera sobre o número de especialistas, mas o custo real (\`expert_output\`) só é pago pelos tokens que caem em cada máscara.
3. **Gating Weights:** Observe como os pesos do roteador multiplicam a saída. Isso permite que o modelo aprenda a "confiar" mais em certos especialistas para certos tokens.

> No código ao lado, incluímos um script de exemplo que você pode rodar para visualizar o roteamento de tokens reais para especialistas.

---

\`\`\`python
snippet:transformers/moe-pytorch
\`\`\``,
      codeExplanations: [
        {
          lineRange: [7, 21],
          content: 'O roteador decide o destino; os especialistas (MLPs) processam os dados.',
        },
        {
          lineRange: [30, 30],
          content: 'A seleção Top-K garante que o modelo permaneça esparso.',
        },
        {
          lineRange: [42, 48],
          content: 'A aplicação da máscara garante que cada especialista só processe os tokens que lhe foram atribuídos.',
        },
      ],
    },
    'en-us': {
      title: 'MoE Deep Dive: PyTorch Implementation',
      body: `To understand where MoE "lives" in the code, let's look at a transparent implementation of an MoE layer.

### Where to debug MoE?
If you are running this code locally, the key inspection points are:

1. **Load Distribution:** Check if experts are being used in a balanced way. A \`torch.bincount(selected_experts)\` reveals if there are "hooked" experts.
2. **Top-K Efficiency:** Note that the loop iterates over the number of experts, but the actual cost (\`expert_output\`) is only paid by tokens falling into each mask.
3. **Gating Weights:** Observe how router weights multiply the output. This allows the model to learn to "trust" certain experts more for certain tokens.

> In the code on the right, we included an example script that you can run to visualize the routing of real tokens to experts.

---

\`\`\`python
snippet:transformers/moe-pytorch
\`\`\``,
      codeExplanations: [
        {
          lineRange: [7, 21],
          content: 'The router decides the destination; the experts (MLPs) process the data.',
        },
        {
          lineRange: [30, 30],
          content: 'Top-K selection ensures the model remains sparse.',
        },
        {
          lineRange: [42, 48],
          content: 'Mask application ensures each expert only processes tokens assigned to it.',
        },
      ],
    },
  },
  visual: {
    id: 'build-gpt2-model',
    copy: {
      'pt-br': {
        title: 'Arquitetura de uma Camada MoE',
        description: 'Implementação didática focada em legibilidade e debug.',
      },
      'en-us': {
        title: 'MoE Layer Architecture',
        description: 'Didactic implementation focused on readability and debugging.',
      },
    },
  },
});
