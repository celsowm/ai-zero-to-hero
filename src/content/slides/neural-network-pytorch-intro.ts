import { defineSlide } from './_factory';

export const neuralNetworkPytorchIntro = defineSlide({
  id: 'neural-network-pytorch-intro',
  type: 'two-column',
  options: {
    columnRatios: [0.58, 0.42],
  },
  content: {
    'pt-br': {
      title: 'A mesma rede, agora com `torch`',
      body: `Nos slides anteriores abrimos a rede por dentro: pesos, bias, \`sigmoid\`, \`forward\`, \`backprop\` e update manual. Agora vamos repetir o mesmo problema, mas com a interface industrial.

1. **Nao e outra teoria:** \`torch\` continua com tensores, camadas, loss, gradiente e atualizacao de parametro.
2. **Mudanca real:** sai codigo mecanico repetitivo, entra declaracao de arquitetura.
3. **Mesmo loop, nova ergonomia:** modelar, treinar, depurar e iterar ficam mais curtos e mais legiveis.
4. **Leitura de engenheiro:** \`model\` define estrutura, \`forward\` executa, \`loss\` mede, \`optimizer\` atualiza.
5. **Ponte do curso:** quando aparecer \`return_tensors="pt"\`, isso ja vai ter significado tecnico claro.

> Primeiro aprendemos a mecanica. Agora passamos a operar no formato que aparece em codigo real.`,
    },
    'en-us': {
      title: 'The same network, now with `torch`',
      body: `In previous slides we opened the network internals: weights, bias, \`sigmoid\`, \`forward\`, \`backprop\`, and manual updates. Now we repeat the same problem with the industrial interface.

1. **Not a new theory:** \`torch\` still uses tensors, layers, loss, gradients, and parameter updates.
2. **Actual change:** less repetitive mechanics, more architecture declaration.
3. **Same loop, new ergonomics:** modeling, training, debugging, and iterating become shorter and more legible.
4. **Engineer reading:** \`model\` defines structure, \`forward\` executes, \`loss\` measures, \`optimizer\` updates.
5. **Course bridge:** when \`return_tensors="pt"\` appears later, it already has clear technical meaning.

> First we learned the mechanics. Now we operate in the format used by real codebases.`,
    },
  },
  visual: {
    id: 'pytorch-bridge-shift',
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
        mapPanel: {
          title: 'Mesmo loop, nova ergonomia',
          subtitle: 'A mudanca importante nao e matematica nova. E troca de interface: menos engenharia manual, mais contrato legivel.',
          beforeLabel: 'Antes: rede aberta na unha',
          afterLabel: 'Agora: interface torch',
          rows: [
            { label: 'Modelar', before: 'Montar peso, bias e ativacao manualmente exigia wiring explicito em cada experimento.', after: '`nn.Module`, `Linear` e `Sigmoid` deixam a arquitetura declarada em poucos blocos nomeados.', why: 'Voce passa a ler a estrutura em segundos, sem se perder em codigo mecanico.' },
            { label: 'Treinar', before: 'O loop dependia de backward e update implementados quase do zero.', after: 'Loss, `backward()` e optimizer viram um protocolo padrao, repetido em qualquer projeto serio.', why: 'Isso reduz erro de implementacao e aproxima o aluno do codigo que aparece em repos reais.' },
            { label: 'Depurar', before: 'Cada bug parecia um caso isolado: gradiente, shape e update se misturavam.', after: 'Shape, gradiente, modo do modelo e device viram eixos claros de diagnostico.', why: 'O debug deixa de ser artesanal e passa a seguir contratos previsiveis.' },
            { label: 'Iterar', before: 'Trocar arquitetura pedia muito retrabalho de boilerplate.', after: 'Substituir camada, loss ou optimizer custa pouco e preserva o mesmo loop mental.', why: 'Fica barato comparar variantes sem reconstruir todo o experimento.' },
          ],
          footer: 'Ponte do curso: quando `return_tensors="pt"` aparecer, isso nao sera detalhe sintatico; sera a entrada para esse ecossistema de contratos.',
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
        mapPanel: {
          title: 'Same loop, new ergonomics',
          subtitle: 'The important change is not new math. It is a new interface: less manual engineering, more readable contracts.',
          beforeLabel: 'Before: network opened by hand',
          afterLabel: 'Now: torch interface',
          rows: [
            { label: 'Model', before: 'Defining weights, bias, and activations manually required explicit wiring for every experiment.', after: '`nn.Module`, `Linear`, and `Sigmoid` make the architecture declarative in a few named blocks.', why: 'You can read the structure in seconds instead of tracing mechanics.' },
            { label: 'Train', before: 'The loop depended on nearly hand-built backward and update logic.', after: 'Loss, `backward()`, and optimizer become a standard protocol reused across serious projects.', why: 'This reduces implementation mistakes and brings the student closer to real repo code.' },
            { label: 'Debug', before: 'Each bug felt isolated: gradients, shapes, and updates were tangled together.', after: 'Shape, gradients, mode, and device become distinct diagnostic axes.', why: 'Debugging stops being artisanal and starts following predictable contracts.' },
            { label: 'Iterate', before: 'Changing architecture meant heavy boilerplate rewrites.', after: 'Swapping a layer, loss, or optimizer is cheap while preserving the same mental loop.', why: 'Variant comparison becomes inexpensive instead of a rewrite.' },
          ],
          footer: 'Course bridge: when `return_tensors="pt"` appears later, it will not feel like syntax trivia; it will signal entry into this contract-based ecosystem.',
        },
      },
    },
  },
});
