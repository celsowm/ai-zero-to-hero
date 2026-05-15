import { defineSlide } from './_factory';

export const webllmInBrowser = defineSlide({
  id: 'webllm-in-browser',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'WebLLM: LLMs Puros no Browser via WebGPU',
      body: `**WebLLM** (mlc-ai/web-llm) roda LLMs compilados 100% no browser via WebGPU.

### Como Funciona
1. **MLC Compiler** compila modelo (Llama, Mistral, Phi) para WebGPU
2. **Artifacts**: weights binários + WGSL shaders + config JSON
3. **Browser** carrega via WebGPU, KV cache em buffers GPU

### Modelos Suportados
- **Phi-3** (3.8B): ~2GB Q4_0 — cabe em qualquer device
- **Llama-3** (8B): ~4.5GB Q4_0 — precisa de 8GB+ VRAM
- **Mistral** (7B): ~4GB Q4_0 — bom balanceamento
- **Qwen, Gemma**: variantes menores disponíveis

### Streaming no Browser
\`\`\`js
snippet:transformers/webllm-stream
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 1],
          content: 'Importamos o WebLLM, que utiliza o framework MLC para rodar modelos no navegador.',
        },
        {
          lineRange: [3, 3],
          content: 'Instanciamos o motor de inferência carregando um checkpoint quantizado específico para WebGPU.',
        },
        {
          lineRange: [5, 8],
          content: 'Criamos uma requisição de chat com streaming habilitado, permitindo receber tokens conforme são gerados.',
        },
        {
          lineRange: [10, 12],
          content: 'Iteramos sobre os chunks assíncronos para exibir a resposta em tempo real.',
        },
      ],
    },
    'en-us': {
      title: 'WebLLM: Pure LLMs in the Browser via WebGPU',
      body: `**WebLLM** (mlc-ai/web-llm) runs MLC-compiled LLMs 100% in the browser via WebGPU.

### How It Works
1. **MLC Compiler** compiles model (Llama, Mistral, Phi) for WebGPU
2. **Artifacts**: binary weights + WGSL shaders + config JSON
3. **Browser** loads via WebGPU, KV cache in GPU buffers

### Supported Models
- **Phi-3** (3.8B): ~2GB Q4_0 — fits on any device
- **Llama-3** (8B): ~4.5GB Q4_0 — needs 8GB+ VRAM
- **Mistral** (7B): ~4GB Q4_0 — good balance
- **Qwen, Gemma**: smaller variants available

### Streaming in the Browser
\`\`\`js
snippet:transformers/webllm-stream
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 1],
          content: 'We import WebLLM, which uses the MLC framework to run models in the browser.',
        },
        {
          lineRange: [3, 3],
          content: 'We instantiate the inference engine by loading a quantized checkpoint specific to WebGPU.',
        },
        {
          lineRange: [5, 8],
          content: 'We create a chat request with streaming enabled, allowing us to receive tokens as they are generated.',
        },
        {
          lineRange: [10, 12],
          content: 'We iterate over the asynchronous chunks to display the response in real-time.',
        },
      ],
    },
  },
  visual: {
    id: 'webllm-simulator',
    copy: {
      'pt-br': {
        title: 'WebLLM Simulator',
        subtitle: 'LLM no browser com métricas reais',
        modelLabel: 'Modelo',
        quantLabel: 'Quantização',
        vramLabel: 'VRAM Disponível',
        promptLabel: 'Prompt',
        generateLabel: 'Gerar',
        tokenizerTitle: 'Tokenização',
        tokenizerDesc: 'Prompt → tokens para inferência',
        inferenceTitle: 'Inferência WebGPU',
        inferenceDesc: 'Geração token-a-token com KV cache',
        outputTitle: 'Output',
        outputDesc: 'Texto gerado pelo modelo',
        stepperTitle: 'Pipeline WebLLM',
        stepFocusLabel: 'Foco',
        step1Label: 'Load Model',
        step1Body: 'Download weights + init WebGPU engine.',
        step2Label: 'Tokenize',
        step2Body: 'Prompt → input tokens.',
        step3Label: 'Generate',
        step3Body: 'Token loop com KV cache update.',
        step4Label: 'Stream',
        step4Body: 'Output token-by-token via async iterator.',
        loadingLabel: 'Carregando modelo...',
        tokenLabel: 'Tokens',
        tokUnit: 'tok/s',
        vramUsedLabel: 'VRAM Usada',
        speedLabel: 'Velocidade',
        fitsLabel: '✓ Cabe na VRAM',
        noFitsLabel: '✗ Não cabe',
        q4Label: 'Q4_0 (~4 bits/weight)',
        q8Label: 'Q8_0 (~8 bits/weight)',
      },
      'en-us': {
        title: 'WebLLM Simulator',
        subtitle: 'LLM in browser with real metrics',
        modelLabel: 'Model',
        quantLabel: 'Quantization',
        vramLabel: 'Available VRAM',
        promptLabel: 'Prompt',
        generateLabel: 'Generate',
        tokenizerTitle: 'Tokenization',
        tokenizerDesc: 'Prompt → tokens for inference',
        inferenceTitle: 'WebGPU Inference',
        inferenceDesc: 'Token-by-token generation with KV cache',
        outputTitle: 'Output',
        outputDesc: 'Generated text from model',
        stepperTitle: 'WebLLM Pipeline',
        stepFocusLabel: 'Focus',
        step1Label: 'Load Model',
        step1Body: 'Download weights + init WebGPU engine.',
        step2Label: 'Tokenize',
        step2Body: 'Prompt → input tokens.',
        step3Label: 'Generate',
        step3Body: 'Token loop with KV cache update.',
        step4Label: 'Stream',
        step4Body: 'Output token-by-token via async iterator.',
        loadingLabel: 'Loading model...',
        tokenLabel: 'Tokens',
        tokUnit: 'tok/s',
        vramUsedLabel: 'VRAM Used',
        speedLabel: 'Speed',
        fitsLabel: '✓ Fits in VRAM',
        noFitsLabel: '✗ Does not fit',
        q4Label: 'Q4_0 (~4 bits/weight)',
        q8Label: 'Q8_0 (~8 bits/weight)',
      },
    },
  },
});
