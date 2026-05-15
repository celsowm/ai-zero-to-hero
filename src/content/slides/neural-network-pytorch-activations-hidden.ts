import { defineSlide } from './_factory';

export const neuralNetworkPytorchActivationsHidden = defineSlide({
  id: 'neural-network-pytorch-activations-hidden',
  type: 'two-column',
  options: {
    columnRatios: [0.45, 0.55],
  },
  content: {
    'pt-br': {
      title: 'Camadas Ocultas: ReLU e GELU',
      body: `Nas camadas internas de uma rede profunda, o objetivo da ativação é introduzir não-linearidade sem "matar" o aprendizado.

1. **O problema das clássicas:** Sigmoid e Tanh esmagam valores grandes para um patamar plano. Nesses patamares, o gradiente é quase zero (**Vanishing Gradient**), e a rede para de aprender.

2. **ReLU (\`nn.ReLU\`):** Revolucionou o deep learning por ser linear no lado positivo. Se o sinal é positivo, o gradiente flui 100%. É a escolha padrão para quase tudo.

3. **GELU (\`nn.GELU\`):** Uma evolução "suave" da ReLU usada em Transformers (GPT, Llama, BERT). Ela permite que valores levemente negativos ainda passem um pouco de informação, ajudando na estabilidade de modelos gigantes.

> **Dica:** Comece sempre com **ReLU**. Se estiver construindo um Transformer ou quiser extrair o último bit de performance, experimente **GELU**.

---

\`\`\`python
snippet:neural-networks/pytorch-activations-hidden
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 5],
          content: 'Importamos o PyTorch e criamos um tensor de teste com valores negativos e positivos.',
        },
        {
          lineRange: [7, 10],
          content: 'ReLU zera tudo que é negativo e mantém o valor original para positivos.',
        },
        {
          lineRange: [12, 16],
          content: 'GELU cria uma curva suave, permitindo gradientes pequenos perto do zero.',
        },
      ],
    },
    'en-us': {
      title: 'Hidden Layers: ReLU and GELU',
      body: `In the inner layers of a deep network, the activation's goal is to introduce non-linearity without "killing" the learning process.

1. **The problem with classics:** Sigmoid and Tanh squash large values into a flat plateau. In these plateaus, the gradient is almost zero (**Vanishing Gradient**), and the network stops learning.

2. **ReLU (\`nn.ReLU\`):** Revolutionized deep learning by being linear on the positive side. If the signal is positive, the gradient flows 100%. It is the default choice for almost everything.

3. **GELU (\`nn.GELU\`):** A "smooth" evolution of ReLU used in Transformers (GPT, Llama, BERT). It allows slightly negative values to still pass some information, helping the stability of giant models.

> **Tip:** Always start with **ReLU**. If you are building a Transformer or want to squeeze the last bit of performance, try **GELU**.

---

\`\`\`python
snippet:neural-networks/pytorch-activations-hidden
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 5],
          content: 'We import PyTorch and create a test tensor with negative and positive values.',
        },
        {
          lineRange: [7, 10],
          content: 'ReLU zeros out everything negative and keeps the original value for positives.',
        },
        {
          lineRange: [12, 16],
          content: 'GELU creates a smooth curve, allowing small gradients near zero.',
        },
      ],
    },
  },
});
