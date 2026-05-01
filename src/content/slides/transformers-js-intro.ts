import { defineSlide } from './_factory';

export const transformersJsIntro = defineSlide({
  id: 'transformers-js-intro',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Transformers.js: A Biblioteca de ML no Browser',
      body: `A Hugging Face portou o **Transformers** para JavaScript — com inferência local via ONNX Runtime Web.

### Instalação
\`\`\`bash
npm install @huggingface/transformers
\`\`\`

### API Familiar
\`\`\`js
import { pipeline } from '@huggingface/transformers';
const classifier = await pipeline('sentiment-analysis');
const result = await classifier('I love this!');
// [{ label: 'POSITIVE', score: 0.99 }]
\`\`\`

### Tasks Suportadas
- **Text generation**: GPT-2, TinyLlama no browser
- **Sentiment analysis**: distilbert-base-finetuned
- **Feature extraction**: all-MiniLM-L6-v2 (embeddings)
- **Zero-shot classification**: bart-large-mnli
- **Image classification**: mobilenet, vit-base
- **Speech recognition**: whisper-tiny

### Under the Hood
- Modelos ONNX pré-quantizados (INT8)
- WASM backend (~10 tok/s) ou WebGPU backend (~30-50 tok/s)
- Cache do modelo no IndexedDB (carrega rápido na próxima vez)

> O playground simula o pipeline completo: tokenize → inference → decode.`,
    },
    'en-us': {
      title: 'Transformers.js: The ML Library in the Browser',
      body: `Hugging Face ported **Transformers** to JavaScript — with local inference via ONNX Runtime Web.

### Installation
\`\`\`bash
npm install @huggingface/transformers
\`\`\`

### Familiar API
\`\`\`js
import { pipeline } from '@huggingface/transformers';
const classifier = await pipeline('sentiment-analysis');
const result = await classifier('I love this!');
// [{ label: 'POSITIVE', score: 0.99 }]
\`\`\`

### Supported Tasks
- **Text generation**: GPT-2, TinyLlama in the browser
- **Sentiment analysis**: distilbert-base-finetuned
- **Feature extraction**: all-MiniLM-L6-v2 (embeddings)
- **Zero-shot classification**: bart-large-mnli
- **Image classification**: mobilenet, vit-base
- **Speech recognition**: whisper-tiny

### Under the Hood
- Pre-quantized ONNX models (INT8)
- WASM backend (~10 tok/s) or WebGPU backend (~30-50 tok/s)
- Model cached in IndexedDB (loads fast next time)

> The playground simulates the full pipeline: tokenize → inference → decode.`,
    },
  },
  visual: {
    id: 'transformers-js-playground',
    copy: {
      'pt-br': {
        title: 'Transformers.js Playground',
        subtitle: 'Simulação do pipeline browser',
        taskLabel: 'Task',
        inputLabel: 'Input',
        runLabel: 'Rodar Pipeline',
        tokenizerTitle: 'Tokenização',
        tokenizerDesc: 'Input text → tokens com IDs numéricos',
        tokensLabel: 'Tokens',
        modelTitle: 'Modelo ONNX',
        modelDesc: 'Inferência via WASM/WebGPU',
        outputTitle: 'Output',
        outputDesc: 'Resultado decodificado',
        stepperTitle: 'Pipeline Transformers.js',
        stepFocusLabel: 'Foco',
        step1Label: 'Import',
        step1Body: 'import { pipeline } from transformers.',
        step2Label: 'Load Model',
        step2Body: 'Download ONNX + cache no IndexedDB.',
        step3Label: 'Tokenize',
        step3Body: 'Text → input_ids, attention_mask.',
        step4Label: 'Inference',
        step4Body: 'ONNX Runtime executa no WASM/WebGPU.',
        step5Label: 'Decode',
        step5Body: 'Output tensor → resultado legível.',
        wasmLabel: 'WASM',
        webgpuLabel: 'WebGPU',
        speedLabel: 'Velocidade',
        msUnit: 'ms',
        tokenLabel: 'Token',
        positiveLabel: 'Positivo',
        negativeLabel: 'Negativo',
        embeddingTitle: 'Embeddings 2D',
      },
      'en-us': {
        title: 'Transformers.js Playground',
        subtitle: 'Browser pipeline simulation',
        taskLabel: 'Task',
        inputLabel: 'Input',
        runLabel: 'Run Pipeline',
        tokenizerTitle: 'Tokenization',
        tokenizerDesc: 'Input text → tokens with numeric IDs',
        tokensLabel: 'Tokens',
        modelTitle: 'ONNX Model',
        modelDesc: 'Inference via WASM/WebGPU',
        outputTitle: 'Output',
        outputDesc: 'Decoded result',
        stepperTitle: 'Transformers.js Pipeline',
        stepFocusLabel: 'Focus',
        step1Label: 'Import',
        step1Body: 'import { pipeline } from transformers.',
        step2Label: 'Load Model',
        step2Body: 'Download ONNX + cache in IndexedDB.',
        step3Label: 'Tokenize',
        step3Body: 'Text → input_ids, attention_mask.',
        step4Label: 'Inference',
        step4Body: 'ONNX Runtime runs on WASM/WebGPU.',
        step5Label: 'Decode',
        step5Body: 'Output tensor → human-readable result.',
        wasmLabel: 'WASM',
        webgpuLabel: 'WebGPU',
        speedLabel: 'Speed',
        msUnit: 'ms',
        tokenLabel: 'Token',
        positiveLabel: 'Positive',
        negativeLabel: 'Negative',
        embeddingTitle: '2D Embeddings',
      },
    },
  },
});
