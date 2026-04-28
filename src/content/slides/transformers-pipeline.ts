import { defineSlide } from './_factory';

export const transformersPipeline = defineSlide({
  id: 'transformers-pipeline',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'pipeline() — Primeira Abstração',
      body: `O **pipeline()** do Transformers é a forma mais simples de fazer inferência — encapsula tokenizer, modelo e pós-processamento.

### Uso básico

\`\`\`python
snippet:transformers/pipeline-basic
\`\`\`

### Device placement

\`\`\`python
snippet:transformers/pipeline-device
\`\`\`

- **GPU dedicada**: \`device=0\` ou \`device="cuda"\`
- **Otimização automática**: \`device_map="auto"\` (distribui entre GPUs e CPU)
- **FP16**: \`dtype=torch.float16\` para velocidade na GPU

### Batch inference

\`\`\`python
snippet:transformers/pipeline-batch
\`\`\`

> ⚠️ **Batching pode causar OOM** se as sequências têm tamanhos muito diferentes. O batch inteiro é padded até a maior sequência.`,
    },
    'en-us': {
      title: 'pipeline() — First Abstraction',
      body: `The **pipeline()** from Transformers is the simplest way to do inference — encapsulates tokenizer, model, and post-processing.

### Basic usage

\`\`\`python
snippet:transformers/pipeline-basic
\`\`\`

### Device placement

\`\`\`python
snippet:transformers/pipeline-device
\`\`\`

- **Dedicated GPU**: \`device=0\` or \`device="cuda"\`
- **Auto optimization**: \`device_map="auto"\` (distributes across GPUs and CPU)
- **FP16**: \`dtype=torch.float16\` for GPU speed

### Batch inference

\`\`\`python
snippet:transformers/pipeline-batch
\`\`\`

> ⚠️ **Batching can cause OOM** if sequences have very different lengths. The entire batch is padded to the longest sequence.`,
    },
  },
  visual: {
    id: 'transformers-pipeline-visual',
    copy: {
      'pt-br': {
        title: 'Pipeline de Geração',
        inputLabel: 'Input',
        tokenizerLabel: 'Tokenizer',
        modelLabel: 'Model',
        detokenizerLabel: 'Detokenizer',
        outputLabel: 'Output',
        flowArrow: '→',
        tokensLabel: 'Tokens',
        logitsLabel: 'Logits',
      },
      'en-us': {
        title: 'Generation Pipeline',
        inputLabel: 'Input',
        tokenizerLabel: 'Tokenizer',
        modelLabel: 'Model',
        detokenizerLabel: 'Detokenizer',
        outputLabel: 'Output',
        flowArrow: '→',
        tokensLabel: 'Tokens',
        logitsLabel: 'Logits',
      },
    },
  },
});
