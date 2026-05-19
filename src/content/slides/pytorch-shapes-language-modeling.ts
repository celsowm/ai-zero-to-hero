import { defineSlide } from './_factory';

export const pytorchShapesLanguageModeling = defineSlide({
  id: 'pytorch-shapes-language-modeling',
  type: 'two-column',
  options: { columnRatios: [0.58, 0.42] },
  content: {
    'pt-br': {
      title: 'Convencoes de shape para LM (language model)',
      body: `O bloco inteiro fica mais simples se voce ler cada tensor com este dicionario e checar invariantes:

- **B** = batch
- **T** = sequência
- **C** = hidden size
- **V** = vocabulário
- **H** = heads (aparece depois, no bloco Transformer)
- **D** = head dimension (aparece depois, no bloco Transformer)

Invariantes que evitam bugs:
- \`idx\` e \`targets\` sempre inteiros em \`(B, T)\`
- logits sempre terminam em \`V\` para casar com cross-entropy`,
      rightBody: '```txt\npipeline minimo de LM\nidx          -> (B, T)\nembeddings   -> (B, T, C)\nlogits       -> (B, T, V)\ntargets      -> (B, T)\nloss         -> cross_entropy(logits, targets)\n```',
    },
    'en-us': {
      title: 'Shape conventions for LM (language model)',
      body: `This whole block gets easier if you read every tensor through this dictionary and check invariants:

- **B** = batch
- **T** = sequence
- **C** = hidden size
- **V** = vocabulary
- **H** = heads (used later in the Transformer block)
- **D** = head dimension (used later in the Transformer block)

Invariants that prevent common bugs:
- \`idx\` and \`targets\` are always integer tensors in \`(B, T)\`
- logits always end in \`V\` so cross-entropy can consume them`,
      rightBody: '```txt\nminimum LM pipeline\nidx          -> (B, T)\nembeddings   -> (B, T, C)\nlogits       -> (B, T, V)\ntargets      -> (B, T)\nloss         -> cross_entropy(logits, targets)\n```',
    },
  },
});
