import { defineSlide } from './_factory';

export const neuralNetworkPytorchNnLayers = defineSlide({
  id: 'neural-network-pytorch-nn-layers',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.55,
      0.45
    ]
  },
  content: {
    'pt-br': {
      title: `Além do Linear: principais camadas do PyTorch`,
      body: `Redes reais precisam de mais do que apenas matrizes densas. O PyTorch possui dezenas de camadas prontas para diferentes tipos de dados.

### 1. nn.Conv2d (Visão Computacional)
Para imagens, \`Linear\` ignora a estrutura 2D. \`Conv2d\` desliza pequenos "filtros" (kernels) pela imagem para detectar bordas e texturas.
- Shape de entrada esperado: \`(Batch, Canais, Altura, Largura)\`.

### 2. nn.RNN / nn.LSTM (Sequências e Séries Temporais)
Processam dados sequenciais (texto, áudio, ações da bolsa). Elas possuem "estado interno" (memória) que passa de um passo de tempo para o próximo.
- Hoje em dia, são frequentemente substituídas por Transformers.

### 3. nn.Embedding (Processamento de Linguagem)
Funciona como um "dicionário de tradução". Pega IDs de palavras (ex: token \`42\`) e retorna um vetor denso que representa o significado dessa palavra.
- É essencialmente uma \`nn.Linear\` otimizada para entradas que são apenas índices (One-Hot).

### 4. nn.Dropout (Regularização)
Desliga aleatoriamente (zera) uma porcentagem dos neurônios durante o treino.
- **Por quê?** Impede que a rede fique "viciada" em caminhos específicos (overfitting), forçando o modelo a aprender representações redundantes e mais robustas.

> **Importante:** \`nn.Dropout\` se comporta de forma diferente no treino (zera valores) e na predição (não faz nada). Falaremos disso logo mais.

---

\`\`\`python
snippet:neural-networks/nn-layers
\`\`\`

### O que observar
- Cada camada espera um **shape de entrada** diferente: imagens 4D, sequências 3D, tokens 1D
- \`nn.Sequential\` combina camadas lineares + ativação + dropout em um único bloco
- \`model.train()\` e \`model.eval()\` controlam se o dropout está ativo ou não`,
      codeExplanations: [
    {
      "lineRange": [1, 8],
      "content": "Importações e nn.Conv2d: recebe imagens 4D (batch, canais, altura, largura) e produz mapas de características com 16 filtros."
    },
    {
      "lineRange": [10, 14],
      "content": "nn.LSTM processa sequências 3D (batch, tempo, features) e retorna saída por passo de tempo mais estados finais hidden e cell."
    },
    {
      "lineRange": [16, 20],
      "content": "nn.Embedding traduz IDs de tokens em vetores densos — essencialmente uma tabela de lookup otimizada."
    },
    {
      "lineRange": [22, 36],
      "content": "nn.Dropout é montado dentro de nn.Sequential e se comporta diferente em train() vs eval(). Criamos o modelo, rodamos forward nos dois modos e imprimimos os shapes."
    }
  ],
    },
    'en-us': {
      title: `Beyond Linear: main PyTorch layers`,
      body: `Real networks need more than just dense matrices. PyTorch has dozens of ready-made layers for different data types.

### 1. nn.Conv2d (Computer Vision)
For images, \`Linear\` ignores the 2D structure. \`Conv2d\` slides small "filters" (kernels) across the image to detect edges and textures.
- Expected input shape: \`(Batch, Channels, Height, Width)\`.

### 2. nn.RNN / nn.LSTM (Sequences and Time Series)
Process sequential data (text, audio, stocks). They have an "internal state" (memory) that passes from one time step to the next.
- Nowadays, they are often replaced by Transformers.

### 3. nn.Embedding (Natural Language Processing)
Acts as a "translation dictionary". Takes word IDs (e.g., token \`42\`) and returns a dense vector representing the meaning of that word.
- It is essentially an \`nn.Linear\` optimized for inputs that are just indices (One-Hot).

### 4. nn.Dropout (Regularization)
Randomly turns off (zeros out) a percentage of neurons during training.
- **Why?** Prevents the network from getting "addicted" to specific pathways (overfitting), forcing the model to learn redundant, more robust representations.

> **Important:** \`nn.Dropout\` behaves differently in training (zeros values) and in prediction (does nothing). We'll talk about this shortly.

---

\`\`\`python
snippet:neural-networks/nn-layers
\`\`\`

### What to watch
- Each layer expects a **different input shape**: 4D images, 3D sequences, 1D tokens
- \`nn.Sequential\` combines linear layers + activation + dropout into a single block
- \`model.train()\` and \`model.eval()\` control whether dropout is active or not`,
      codeExplanations: [
    {
      "lineRange": [1, 8],
      "content": "Imports and nn.Conv2d: receives 4D images (batch, channels, height, width) and produces feature maps with 16 filters."
    },
    {
      "lineRange": [10, 14],
      "content": "nn.LSTM processes 3D sequences (batch, time, features) and returns per-timestep output plus final hidden and cell states."
    },
    {
      "lineRange": [16, 20],
      "content": "nn.Embedding translates token IDs into dense vectors — essentially an optimized lookup table."
    },
    {
      "lineRange": [22, 36],
      "content": "nn.Dropout is placed inside nn.Sequential and behaves differently in train() vs eval(). We build the model, run forward in both modes, and print shapes."
    }
  ],
    },
  },
});
