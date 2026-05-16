import { defineSlide } from './_factory';

export const neuralNetworkPytorchSequentialLogic = defineSlide({
  id: 'neural-network-pytorch-sequential-logic',
  type: 'custom-visual',
  content: {
    'pt-br': {
      title: 'nn.Sequential: Mapeando Código para Arquitetura',
      body: `Muitos se perguntam se o PyTorch é Orientado a Objetos (OO) ou Procedural. A resposta é: **Os dois**.

### A anatomia do objeto
Quando você escreve \`nn.Linear(4, 3)\`, você está instanciando um **Objeto**. Esse objeto carrega dentro de si os pesos ($W$) e o bias ($b$) que serão aprendidos.

### O contêiner Sequential
O \`nn.Sequential\` é um contêiner que organiza esses objetos em uma fila. Ele automatiza o fluxo de dados: a saída de um bloco vira a entrada do próximo, sem que você precise escrever o método \`forward\` manualmente.

> No diagrama ao lado, veja como cada linha do código se traduz em uma parte física da rede neural.`,
    },
    'en-us': {
      title: 'nn.Sequential: Mapping Code to Architecture',
      body: `Many wonder if PyTorch is Object-Oriented (OO) or Procedural. The answer is: **Both**.

### The object's anatomy
When you write \`nn.Linear(4, 3)\`, you are instantiating an **Object**. This object carries within it the weights ($W$) and bias ($b$) that will be learned.

### The Sequential container
\`nn.Sequential\` is a container that organizes these objects in a queue. It automates the data flow: the output of one block becomes the input for the next, without you having to write the \`forward\` method manually.

> In the diagram on the right, see how each line of code translates into a physical part of the neural network.`,
    },
  },
  visual: {
    id: 'pytorch-sequential-map',
    copy: {
      'pt-br': {},
      'en-us': {},
    },
  },
});
