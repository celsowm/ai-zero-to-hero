import { defineSlide } from './_factory';

export const pytorchShapesLanguageModeling = defineSlide({
  id: 'pytorch-shapes-language-modeling',
  type: 'two-column',
  options: { columnRatios: [0.58, 0.42] },
  content: {
    'pt-br': {
      title: 'Convenções de shape para LM',
      body: `O bloco inteiro fica mais simples se você ler cada tensor com este dicionário:

- **B** = batch
- **T** = sequência
- **C** = hidden size
- **V** = vocabulário
- **H** = heads
- **D** = head dimension`,
      rightBody: '```txt\nidx          -> (B, T)\nembeddings   -> (B, T, C)\nlogits       -> (B, T, V)\nattention    -> (B, H, T, D)\n```',
    },
    'en-us': {
      title: 'Shape conventions for LM',
      body: `This whole block becomes easier if you read every tensor through this dictionary:

- **B** = batch
- **T** = sequence
- **C** = hidden size
- **V** = vocabulary
- **H** = heads
- **D** = head dimension`,
      rightBody: '```txt\nidx          -> (B, T)\nembeddings   -> (B, T, C)\nlogits       -> (B, T, V)\nattention    -> (B, H, T, D)\n```',
    },
  },
});
