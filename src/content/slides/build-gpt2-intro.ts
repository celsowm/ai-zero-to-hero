import { defineSlide } from './_factory';

export const buildGpt2Intro = defineSlide({
  id: 'build-gpt2-intro',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.6,
      0.4
    ]
  },
  content: {
    'pt-br': {
      title: `Prática: Construindo do Zero`,
      body: `Nesta última etapa do curso, você não será apenas um usuário do Hugging Face. Vamos abrir o capô e treinar um modelo de ponta a ponta.

### O Desafio

Vamos recriar o ciclo de vida completo de uma Inteligência Artificial do zero usando **PyTorch puro**.

Cada peça que aprendemos será implementada sem bibliotecas mágicas fechadas:

1.  **Dados**: Coletar livros do Projeto Gutenberg e fatiar em janelas auto-regressivas.
2.  **Arquitetura**: Montar a Atenção Causal, a MLP e a Torre de Blocos.
3.  **Treinamento**: Inicializar pesos aleatórios e aplicar Otimizador (AdamW) e Loss (Cross Entropy).
4.  **Inferência**: Gerar textos prevendo token a token em um loop \`while\`.

> Tudo o que ensinamos de forma isolada nos módulos anteriores (atenção, blocos, entropia, tensores) agora vai se juntar em um único sistema de software que você mesmo dominará.

`,
    },
    'en-us': {
      title: `Practice: Building from Scratch`,
      body: `In this final stage of the course, you won't just be a Hugging Face user. Let's pop the hood and train a model end-to-end.

### The Challenge

We will recreate the complete lifecycle of an Artificial Intelligence from scratch using **pure PyTorch**.

Every piece we learned will be implemented without closed magic libraries:

1.  **Data**: Collect books from Project Gutenberg and slice them into autoregressive windows.
2.  **Architecture**: Assemble Causal Attention, MLP, and the Block Tower.
3.  **Training**: Initialize random weights and apply Optimizer (AdamW) and Loss (Cross Entropy).
4.  **Inference**: Generate texts predicting token by token in a \`while\` loop.

> Everything we taught in isolation in the previous modules (attention, blocks, entropy, tensors) will now come together in a single software system that you yourself will master.

`,
    },
  },
  visual: {
    id: 'gpt2-blackbox-diagram',
    copy: {
      "pt-br": {
        "inputLabel": "Textos (PT-BR)",
        "modelLabel": "Nosso GPT-2",
        "outputLabel": "Mágica"
      },
      "en-us": {
        "inputLabel": "Texts (PT-BR)",
        "modelLabel": "Our GPT-2",
        "outputLabel": "Magic"
      }
    },
  },
});
