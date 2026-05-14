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

> **Importante:** \`nn.Dropout\` se comporta de forma diferente no treino (zera valores) e na predição (não faz nada). Falaremos disso logo mais.`,
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

> **Important:** \`nn.Dropout\` behaves differently in training (zeros values) and in prediction (does nothing). We'll talk about this shortly.`,
    },
  },
});
