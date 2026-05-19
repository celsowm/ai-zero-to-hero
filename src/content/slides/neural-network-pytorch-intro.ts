import { defineSlide } from './_factory';

export const neuralNetworkPytorchIntro = defineSlide({
  id: 'neural-network-pytorch-intro',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.58,
      0.42
    ]
  },
  content: {
    'pt-br': {
      title: `A mesma rede, agora com \`torch\``,
      body: `Nos slides anteriores abrimos a rede por dentro: pesos, bias, \`sigmoid\`, \`forward\`, \`backprop\` e update manual. Agora vamos repetir o mesmo problema, mas com a interface industrial.

1. **Nao e outra teoria:** \`torch\` continua com tensores, camadas, loss, gradiente e atualizacao de parametro.
2. **Mudanca real:** sai codigo mecanico repetitivo, entra declaracao de arquitetura.
3. **Leitura de engenheiro:** \`model\` define estrutura, \`forward\` executa, \`loss\` mede, \`optimizer\` atualiza.
4. **Ponte do curso:** quando aparecer \`return_tensors="pt"\`, isso ja vai ter significado tecnico claro.

> Primeiro aprendemos a mecanica. Agora passamos a operar no formato que aparece em codigo real.`,
    },
    'en-us': {
      title: `The same network, now with \`torch\``,
      body: `In previous slides we opened the network internals: weights, bias, \`sigmoid\`, \`forward\`, \`backprop\`, and manual updates. Now we repeat the same problem with the industrial interface.

1. **Not a new theory:** \`torch\` still uses tensors, layers, loss, gradients, and parameter updates.
2. **Actual change:** less repetitive mechanics, more architecture declaration.
3. **Engineer reading:** \`model\` defines structure, \`forward\` executes, \`loss\` measures, \`optimizer\` updates.
4. **Course bridge:** when \`return_tensors="pt"\` appears later, it already has clear technical meaning.

> First we learned the mechanics. Now we operate in the format used by real codebases.`,
    },
  },
  visual: {
    id: 'pytorch-dual-panel',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Mapa' }],
        codePanel: {
          title: 'Primeiro contato com a interface torch',
          description: 'Exemplo minimo: mesma ideia da rede anterior, agora declarada com modulos PyTorch.',
          source: { snippetId: 'pytorch-lm/torch-bridge', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 4], content: 'Importamos torch e preparamos entrada numerica em tensor.' },
            { lineRange: [6, 10], content: 'Declaramos arquitetura com camadas prontas (`Linear`, `Sigmoid`).' },
            { lineRange: [12, 13], content: '`no_grad` deixa claro que aqui estamos so em inferencia.' },
            { lineRange: [15, 15], content: 'A predicao final confirma o ciclo completo com interface torch.' },
          ],
        },
        visualPanel: {
          title: 'Antes vs agora',
          items: [
            { label: 'Antes (na unha)', value: 'Implementar funcao por funcao manualmente.' },
            { label: 'Agora (torch)', value: 'Montar blocos modulares e focar em estrutura/experimento.' },
            { label: 'Ganho real', value: 'Menos boilerplate e mais iteracao de modelo.' },
            { label: 'Ponte', value: '`pt` passa a significar ecossistema PyTorch, nao sigla solta.' },
          ],
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Map' }],
        codePanel: {
          title: 'First touch of torch interface',
          description: 'Minimal example: same network idea, now declared with PyTorch modules.',
          source: { snippetId: 'pytorch-lm/torch-bridge', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 4], content: 'Import torch and prepare numeric input as tensor.' },
            { lineRange: [6, 10], content: 'Declare architecture with ready modules (`Linear`, `Sigmoid`).' },
            { lineRange: [12, 13], content: '`no_grad` makes explicit this is inference-only.' },
            { lineRange: [15, 15], content: 'Final prediction confirms full cycle through torch interface.' },
          ],
        },
        visualPanel: {
          title: 'Before vs now',
          items: [
            { label: 'Before (manual)', value: 'Implement each function piece by piece.' },
            { label: 'Now (torch)', value: 'Compose modular blocks and focus on architecture/experiments.' },
            { label: 'Real gain', value: 'Less boilerplate, faster model iteration.' },
            { label: 'Bridge', value: '`pt` now means PyTorch ecosystem, not an isolated acronym.' },
          ],
        },
      },
    },
  },
});
