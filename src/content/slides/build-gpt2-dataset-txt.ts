import { defineSlide } from './_factory';

export const buildGpt2DatasetTxt = defineSlide({
  id: 'build-gpt2-dataset-txt',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.45,
      0.55
    ]
  },
  content: {
    'pt-br': {
      title: `Passo 1: O Jeito Clássico (Gutenberg)`,
      body: `Como toda IA nasce lendo textos em vez de imagens, nosso primeiro passo é ter o que ler. Nós começamos pela via clássica: acessando livros em pastas locais (\`.txt\`).

### O Dataset Auto-regressivo

A essência do treino de um GPT é que o **Alvo a prever (y)** é sempre exatamente igual à **Entrada (x)**, porém deslocada 1 token para o futuro.

- Se o texto é: \`[O, rato, roeu, a, roupa]\`
- E a Janela (\`block_size\`) é 4:
- A entrada \`x\` será: \`[O, rato, roeu, a]\`
- O alvo \`y\` será: \`[rato, roeu, a, roupa]\`

Isso permite que o modelo aprenda que, dado \`[O]\`, prevemos \`[rato]\`. Dado \`[O, rato]\`, prevemos \`[roeu]\`, e assim por diante.
`,
      rightBody: `
\`\`\`python
snippet:build_gpt2/build-gpt2-dataset-txt
\`\`\``,
      codeExplanations: [
    {
    "lineRange": [
      2,
      4
    ],
    "content": "Importamos o torch para gerenciar lotes (`DataLoader`) e herdar as classes padrão do PyTorch (`Dataset`)."
  },
    {
    "lineRange": [
      7,
      16
    ],
    "content": "A leitura mais crua possível: abrimos os arquivos `.txt` do Projeto Gutenberg na memória RAM."
  },
    {
    "lineRange": [
      19,
      36
    ],
    "content": "A classe central. O truque está no `__getitem__`: `x` vai de `[0 : 4]`, enquanto o `y` vai de `[1 : 5]`. É esse pequeno deslocamento que cria a previsão temporal."
  },
    {
    "lineRange": [
      39,
      49
    ],
    "content": "A esteira rolante do PyTorch. O DataLoader vai sortear posições aleatórias (`shuffle=True`) para criar lotes e enviar para a placa de vídeo."
  }
  ],
    },
    'en-us': {
      title: `Step 1: The Classic Way (Gutenberg)`,
      body: `Since every AI is born reading texts instead of images, our first step is having something to read. We start the classic way: accessing open books in local folders (\`.txt\`).

### The Autoregressive Dataset

The essence of training a GPT is that the **Target to predict (y)** is always exactly equal to the **Input (x)**, but shifted 1 token into the future.

- If the text is: \`[The, rat, gnawed, the, clothes]\`
- And the Window (\`block_size\`) is 4:
- The input \`x\` will be: \`[The, rat, gnawed, the]\`
- The target \`y\` will be: \`[rat, gnawed, the, clothes]\`

This allows the model to learn that, given \`[The]\`, we predict \`[rat]\`. Given \`[The, rat]\`, we predict \`[gnawed]\`, and so on.
`,
      rightBody: `
\`\`\`python
snippet:build_gpt2/build-gpt2-dataset-txt
\`\`\``,
      codeExplanations: [
    {
    "lineRange": [
      2,
      4
    ],
    "content": "We import torch to manage batches (`DataLoader`) and inherit standard PyTorch classes (`Dataset`)."
  },
    {
    "lineRange": [
      7,
      16
    ],
    "content": "The rawest read possible: we open `.txt` files from Project Gutenberg into RAM."
  },
    {
    "lineRange": [
      19,
      36
    ],
    "content": "The central class. The trick is in `__getitem__`: `x` goes from `[0 : 4]`, while `y` goes from `[1 : 5]`. This small shift is what creates the temporal prediction."
  },
    {
    "lineRange": [
      39,
      49
    ],
    "content": "PyTorch's conveyor belt. The DataLoader will draw random positions (`shuffle=True`) to create batches and send them to the GPU."
  }
  ],
    },
  },
});
