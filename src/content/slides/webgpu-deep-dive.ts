import { defineSlide } from './_factory';

export const webgpuDeepDive = defineSlide({
  id: 'webgpu-deep-dive',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'WebGPU: Execution Provider para ONNX no Browser',
      body: `WebGPU é a API de **compute** (não graphics) que dá acesso direto à GPU do browser.

### WebGPU vs WebGL
- **WebGL**: API de graphics, usada para renderização 3D
- **WebGPU**: API de compute, acessa GPU buffers e compute shaders diretamente
- **WGSL** (WebGPU Shading Language): programa a GPU como CUDA/OpenCL

### ONNX Runtime Web + WebGPU
- **WASM backend**: ~10 tok/s (CPU via JavaScript)
- **WebGPU backend**: ~30-50 tok/s (GPU via compute shaders)
- **Memory model**: \`device.createBuffer()\` → \`queue.writeBuffer()\` → compute → readback

### Limitações do Browser
- **Sem CUDA**: não usa tensor cores NVIDIA
- **Sem NVLink**: sem comunicação direta GPU-GPU
- **VRAM limitada**: ~8-16GB típico em consumer GPUs via browser
- **Compatibilidade**: Chrome/Edge stable. Firefox nightly. Safari tech preview.

### Exemplo de uso
\`\`\`js
snippet:transformers/webgpu-ort
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 1],
          content: 'Importamos o ONNX Runtime Web para execução no navegador.',
        },
        {
          lineRange: [3, 5],
          content: 'Configuramos a sessão de inferência para usar explicitamente o provedor WebGPU.',
        },
        {
          lineRange: [7, 7],
          content: 'A execução do modelo acontece via compute shaders, aproveitando a aceleração de hardware.',
        },
      ],
    },
    'en-us': {
      title: 'WebGPU: Execution Provider for ONNX in the Browser',
      body: `WebGPU is the **compute** API (not graphics) that gives direct GPU access in the browser.

### WebGPU vs WebGL
- **WebGL**: graphics API, used for 3D rendering
- **WebGPU**: compute API, accesses GPU buffers and compute shaders directly
- **WGSL** (WebGPU Shading Language): program the GPU like CUDA/OpenCL

### ONNX Runtime Web + WebGPU
- **WASM backend**: ~10 tok/s (CPU via JavaScript)
- **WebGPU backend**: ~30-50 tok/s (GPU via compute shaders)
- **Memory model**: \`device.createBuffer()\` → \`queue.writeBuffer()\` → compute → readback

### Browser Limitations
- **No CUDA**: no NVIDIA tensor cores
- **No NVLink**: no direct GPU-GPU communication
- **Limited VRAM**: ~8-16GB typical on consumer GPUs via browser
- **Compatibility**: Chrome/Edge stable. Firefox nightly. Safari tech preview.

### Example usage
\`\`\`js
snippet:transformers/webgpu-ort
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 1],
          content: 'We import ONNX Runtime Web for browser execution.',
        },
        {
          lineRange: [3, 5],
          content: 'We configure the inference session to explicitly use the WebGPU provider.',
        },
        {
          lineRange: [7, 7],
          content: 'Model execution happens via compute shaders, leveraging hardware acceleration.',
        },
      ],
    },
  },
  visual: {
    id: 'webgpu-explorer',
    copy: {
      'pt-br': {
        title: 'WebGPU Explorer',
        subtitle: 'WASM vs WebGPU para ONNX no browser',
        backendLabel: 'Backend',
        wasmLabel: 'WASM',
        webgpuLabel: 'WebGPU',
        speedTitle: 'Comparação de Velocidade',
        speedSubtitle: 'tok/s por task',
        memoryTitle: 'Fluxo de Memória',
        memorySubtitle: 'CPU RAM → GPU VRAM → Compute → Readback',
        modelSizeTitle: 'Tamanho do Modelo',
        modelSizeSubtitle: 'Impacto na performance',
        stepperTitle: 'Pipeline WebGPU',
        stepFocusLabel: 'Foco',
        step1Label: 'JS Call',
        step1Body: 'session.run() chamado do JavaScript.',
        step2Label: 'Copy to GPU',
        step2Body: 'queue.writeBuffer() copia inputs.',
        step3Label: 'Compute',
        step3Body: 'WGSL shader executa na GPU.',
        step4Label: 'Read Back',
        step4Body: 'GPU buffer → CPU para decode.',
        inputLabel: 'Input',
        gpuBufferLabel: 'GPU Buffer',
        computeLabel: 'Compute Shader',
        outputLabel: 'Output',
        tokUnit: 'tok/s',
        speedMsLabel: 'Latência',
        vramUsedLabel: 'VRAM',
      },
      'en-us': {
        title: 'WebGPU Explorer',
        subtitle: 'WASM vs WebGPU for ONNX in browser',
        backendLabel: 'Backend',
        wasmLabel: 'WASM',
        webgpuLabel: 'WebGPU',
        speedTitle: 'Speed Comparison',
        speedSubtitle: 'tok/s per task',
        memoryTitle: 'Memory Flow',
        memorySubtitle: 'CPU RAM → GPU VRAM → Compute → Readback',
        modelSizeTitle: 'Model Size',
        modelSizeSubtitle: 'Performance impact',
        stepperTitle: 'WebGPU Pipeline',
        stepFocusLabel: 'Focus',
        step1Label: 'JS Call',
        step1Body: 'session.run() called from JavaScript.',
        step2Label: 'Copy to GPU',
        step2Body: 'queue.writeBuffer() copies inputs.',
        step3Label: 'Compute',
        step3Body: 'WGSL shader runs on GPU.',
        step4Label: 'Read Back',
        step4Body: 'GPU buffer → CPU for decode.',
        inputLabel: 'Input',
        gpuBufferLabel: 'GPU Buffer',
        computeLabel: 'Compute Shader',
        outputLabel: 'Output',
        tokUnit: 'tok/s',
        speedMsLabel: 'Latency',
        vramUsedLabel: 'VRAM',
      },
    },
  },
});
