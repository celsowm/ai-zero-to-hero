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
      body: `Nos slides anteriores nós abrimos a rede neural por dentro: pesos, bias, \`sigmoid\`, \`forward\`, \`backprop\` e atualização manual. Agora a ideia é repetir **o mesmo problema do paciente fumante**, mas usando a biblioteca que reaparece depois quando entrarmos em \`transformers\`.

1. **Não é outra teoria:** \`torch\` continua trabalhando com tensores, camadas, loss, gradiente e atualização de parâmetros.

2. **O que muda é a interface:** em vez de escrevermos a mecânica inteira na mão, passamos a declarar a arquitetura com \`nn.Linear\`, \`nn.Sigmoid\`, uma função de loss e um optimizer.

3. **A ponte com o futuro:** mais à frente, quando aparecer \`return_tensors="pt"\`, esse \`pt\` não vai soar arbitrário. Ele aponta para o ecossistema PyTorch.

4. **Mesmo dado, menos ruído:** seguimos com \`idade\`, \`pressao\`, \`colesterol\` e \`fumante\`, e a saída continua sendo probabilidade mais classe final.

> Primeiro entendemos a engrenagem. Agora vemos como a indústria empacota a mesma engrenagem em um backend real.

---

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
      title: `The same network, now with \`torch\``,
      body: `In the previous slides we opened the neural network from the inside: weights, bias, \`sigmoid\`, \`forward\`, \`backprop\`, and manual parameter updates. Now the idea is to repeat **the same smoker-patient problem**, but using the library that reappears later when we enter \`transformers\`.

1. **It is not a different theory:** \`torch\` still works with tensors, layers, loss, gradients, and parameter updates.

2. **What changes is the interface:** instead of writing the full mechanics by hand, we declare the architecture with \`nn.Linear\`, \`nn.Sigmoid\`, a loss function, and an optimizer.

3. **The bridge to what comes next:** later, when \`return_tensors="pt"\` appears, that \`pt\` will not feel arbitrary. It points to the PyTorch ecosystem.

4. **Same data, less noise:** we keep \`age\`, \`pressure\`, \`cholesterol\`, and \`smoker\`, and the output is still probability plus final class.

> First we understood the machinery. Now we see how industry packages that same machinery inside a real backend.

---

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
});
