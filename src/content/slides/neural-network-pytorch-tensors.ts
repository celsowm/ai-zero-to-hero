import { defineSlide } from './_factory';

export const neuralNetworkPytorchTensors = defineSlide({
  id: 'neural-network-pytorch-tensors',
  type: 'two-column',
  options: { columnRatios: [0.56, 0.44] },
  content: {
    'pt-br': {
      title: 'Tensores no PyTorch: leitura operacional',
      body: `Aqui tensor significa: **array com eixos explícitos**.

Antes de seguir, termo novo:
- **token** = a menor unidade de texto que o modelo enxerga (pode ser palavra inteira, pedaço de palavra ou símbolo).
- exemplo: "treinar modelos" pode virar algo como ["tre", "inar", " modelos"] dependendo do tokenizer.

Antes de qualquer sigla, use esta leitura:
1. eixo de **lote**: quantas sequências você processa juntas;
2. eixo de **tempo/sequência**: quantos tokens por sequência;
3. eixo de **largura**: quantos valores descrevem cada token;
4. eixo de **vocabulário**: quantos candidatos de saída o modelo pode escolher.

Se você sempre identificar esses eixos, o restante do bloco (treino, inferência e debug) fica mecânico em vez de confuso.`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/tensor-primer
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 6], content: 'Definimos nomes explícitos dos eixos (`batch_size`, `sequence_length`, etc.) para não depender de siglas cedo demais.' },
        { lineRange: [8, 11], content: 'Construímos token IDs inteiros: essa é a forma de entrada mais comum para embedding.' },
        { lineRange: [13, 14], content: 'Criamos estados internos e logits preservando lote e sequência.' },
        { lineRange: [16, 18], content: 'Os prints confirmam shape e dtype, que são os primeiros alvos de debug.' },
      ],
    },
    'en-us': {
      title: 'PyTorch tensors: operational reading',
      body: `Here tensor means: **array with explicit axes**.

Before moving on, new term:
- **token** = the smallest text unit the model sees (it may be a full word, a word piece, or a symbol).
- example: "training models" might become something like ["train", "ing", " models"] depending on tokenizer.

Before any abbreviations, use this reading:
1. **batch axis**: how many sequences are processed together;
2. **time/sequence axis**: how many tokens per sequence;
3. **width axis**: how many values represent each token;
4. **vocabulary axis**: how many output candidates the model can pick from.

If you always identify these axes, the rest of this block (training, inference, debugging) becomes mechanical instead of confusing.`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/tensor-primer
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 6], content: 'We define explicit axis names (`batch_size`, `sequence_length`, etc.) instead of early abbreviations.' },
        { lineRange: [8, 11], content: 'We build integer token IDs, the usual input shape for embedding lookup.' },
        { lineRange: [13, 14], content: 'Hidden states and logits preserve batch and sequence axes.' },
        { lineRange: [16, 18], content: 'Prints verify shape and dtype, the first debugging targets.' },
      ],
    },
  },
});
