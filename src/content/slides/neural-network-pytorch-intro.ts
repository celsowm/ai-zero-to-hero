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
      body: `Nos slides anteriores nós abrimos a rede neural por dentro: pesos, bias, \`sigmoid\`, \`forward\`, \`backprop\` e atualização manual. Agora a ideia é repetir **o mesmo problema do paciente fumante**, mas usando a biblioteca que reaparece depois quando entrarmos em \`transformers\`.

1. **Não é outra teoria:** \`torch\` continua trabalhando com tensores (arrays numéricos multidimensionais — vamos abrir isso nos próximos slides), camadas, loss, gradiente e atualização de parâmetros.

2. **O que muda é a interface:** em vez de escrevermos a mecânica inteira na mão, passamos a declarar a arquitetura com \`nn.Linear\`, \`nn.Sigmoid\`, uma função de loss e um optimizer.

3. **A ponte com o futuro:** mais à frente, quando aparecer \`return_tensors="pt"\`, esse \`pt\` não vai soar arbitrário. Ele aponta para o ecossistema PyTorch.

4. **Mesmo dado, menos ruído:** seguimos com \`idade\`, \`pressao\`, \`colesterol\` e \`fumante\`, e a saída continua sendo probabilidade mais classe final.    

> Primeiro entendemos a engrenagem. Agora vemos como a indústria empacota a mesma engrenagem em um backend real.`,
      rightBody: `
### Antes vs agora
| Antes, na unha | Agora, com \`torch\` |
| --- | --- |
| escrever \`sigmoid\` | usar \`nn.Sigmoid()\` |
| calcular \`forward\` manualmente | chamar \`model(X)\` |
| propagar gradiente na mão | usar \`loss.backward()\` |
| atualizar peso por peso | usar \`optimizer.step()\` |

### Ideia central
\`torch\` não substitui o raciocínio que vimos. Ele substitui o trabalho repetitivo de implementar esse raciocínio toda vez.

### Ponte curta para Transformers
Quando a Hugging Face pedir tensores com \`return_tensors="pt"\`, o curso já terá mostrado o que esse mundo \`pt\` significa.
`,
    },
    'en-us': {
      title: 'The same network, now with `torch`',
      body: `In the previous slides we opened the neural network from the inside: weights, bias, \`sigmoid\`, \`forward\`, \`backprop\`, and manual parameter updates. Now the idea is to repeat **the same smoker-patient problem**, but using the library that reappears later when we enter \`transformers\`.

1. **It is not a different theory:** \`torch\` still works with tensors (multidimensional numeric arrays — we will unpack this in the next slides), layers, loss, gradients, and parameter updates.

2. **What changes is the interface:** instead of writing the full mechanics by hand, we declare the architecture with \`nn.Linear\`, \`nn.Sigmoid\`, a loss function, and an optimizer.

3. **The bridge to what comes next:** later, when \`return_tensors="pt"\` appears, that \`pt\` will not feel arbitrary. It points to the PyTorch ecosystem.    

4. **Same data, less noise:** we keep \`age\`, \`pressure\`, \`cholesterol\`, and \`smoker\`, and the output is still probability plus final class.

> First we understood the machinery. Now we see how industry packages that same machinery inside a real backend.`,
      rightBody: `
### Before vs now
| Before, by hand | Now, with \`torch\` |
| --- | --- |
| write \`sigmoid\` yourself | use \`nn.Sigmoid()\` |
| compute \`forward\` manually | call \`model(X)\` |
| propagate gradients by hand | use \`loss.backward()\` |
| update one weight at a time | use \`optimizer.step()\` |

### Core idea
\`torch\` does not replace the reasoning we learned. It replaces the repetitive work of implementing that reasoning every time.

### Short bridge to Transformers
When Hugging Face asks for tensors with \`return_tensors="pt"\`, the course will already have shown what that \`pt\` world means.
`,
    },
  },
  visual: {
    id: 'pytorch-bridge-shift',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Mapa' }],
        codePanel: {
          title: 'Mesmos pacientes, interface torch',
          description: 'Os mesmos 6 pacientes do exemplo manual, agora com loop de treino PyTorch e inferencia em um novo paciente.',
          source: { snippetId: 'pytorch-lm/torch-bridge', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 15], content: 'Imports do torch e os mesmos 6 pacientes do exemplo manual com features normalizadas e alvo.' },
            { lineRange: [16, 24], content: 'Arquitetura equivalente declarada com \`nn.Linear\` e \`nn.Sigmoid\`: 4 → 3 → 1.' },
            { lineRange: [26, 39], content: 'Loop de treino com MSE + SGD: zero_grad, forward, loss, backward, step — 600 epocas.' },
            { lineRange: [40, 48], content: 'Inferencia no paciente novo (58 anos, fumante) sem calcular gradiente (\`no_grad\`).' },
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
          title: 'Same patients, torch interface',
          description: 'The same 6 patients from the manual example, now with PyTorch training loop and inference on a new patient.',
          source: { snippetId: 'pytorch-lm/torch-bridge', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 15], content: 'Torch imports and the same 6 patients from the manual example with normalized features and targets.' },
            { lineRange: [16, 24], content: 'Equivalent architecture declared with \`nn.Linear\` and \`nn.Sigmoid\`: 4 → 3 → 1.' },
            { lineRange: [26, 39], content: 'Training loop with MSE + SGD: zero_grad, forward, loss, backward, step — 600 epochs.' },
            { lineRange: [40, 48], content: 'Inference on new patient (age 58, smoker) without computing gradients (\`no_grad\`).' },
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
