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
snippet:transformers/transformers-js-basic
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 1],
          content: 'Importamos a função pipeline diretamente do pacote transformers.js.',
        },
        {
          lineRange: [3, 4],
          content: 'O carregamento do modelo é assíncrono. Na primeira vez, ele baixa os arquivos ONNX e faz o cache no browser.',
        },
        {
          lineRange: [6, 7],
          content: 'A inferência acontece localmente no navegador, retornando o resultado já processado.',
        },
      ],
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
snippet:transformers/transformers-js-basic
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 1],
          content: 'We import the pipeline function directly from the transformers.js package.',
        },
        {
          lineRange: [3, 4],
          content: 'Model loading is asynchronous. The first time, it downloads ONNX files and caches them in the browser.',
        },
        {
          lineRange: [6, 7],
          content: 'Inference happens locally in the browser, returning the processed result.',
        },
      ],
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
        step4Body: 'ONNX Runtime executa no WASM (WebAssembly) ou WebGPU.',
        step5Label: 'Decode',
        step5Body: 'Output tensor → resultado legível.',
        wasmLabel: 'WASM (CPU)',
        webgpuLabel: 'WebGPU (GPU)',
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
        step4Body: 'ONNX Runtime runs on WASM (WebAssembly) or WebGPU.',
        step5Label: 'Decode',
        step5Body: 'Output tensor → human-readable result.',
        wasmLabel: 'WASM (CPU)',
        webgpuLabel: 'WebGPU (GPU)',
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
