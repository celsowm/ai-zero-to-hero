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
import * as webllm from '@mlc-ai/web-llm';
const engine = await webllm.CreateMLCEngine('Llama-3-8B-q4f16_1-webgpu');
const chunks = await engine.chat.completions.create({
  messages: [{ role: 'user', content: 'Hello!' }],
  stream: true
});
for await (const chunk of chunks) console.log(chunk.choices[0].delta.content);
\`\`\`

### Limites Práticos
- **~7B máximo** com Q4_0 em devices com 8GB+ RAM
- **KV cache** cresce com tokens gerados (~2MB/1K tokens para 7B)
- **30-50 tok/s** em GPU dedicada, ~10 tok/s em integrated

> O simulador mostra geração token-a-token com métricas reais de VRAM e velocidade.`,
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
import * as webllm from '@mlc-ai/web-llm';
const engine = await webllm.CreateMLCEngine('Llama-3-8B-q4f16_1-webgpu');
const chunks = await engine.chat.completions.create({
  messages: [{ role: 'user', content: 'Hello!' }],
  stream: true
});
for await (const chunk of chunks) console.log(chunk.choices[0].delta.content);
\`\`\`

### Practical Limits
- **~7B max** with Q4_0 on devices with 8GB+ RAM
- **KV cache** grows with generated tokens (~2MB/1K tokens for 7B)
- **30-50 tok/s** on dedicated GPU, ~10 tok/s on integrated

> The simulator shows token-by-token generation with real VRAM and speed metrics.`,
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
