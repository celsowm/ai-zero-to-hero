import { defineSlide } from './_factory';

export const inferenceE2e = defineSlide({
  id: 'inference-e2e',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'E2E: Do Dev ao Production',
      body: `Vamos percorrer a **jornada completa**: do desenvolvimento no notebook ao deploy em produção com streaming.

### Passo 1: Desenvolvimento local

\`\`\`python
snippet:inference-e2e/step1-dev
\`\`\`

### Passo 2: Otimização com ONNX

\`\`\`python
snippet:inference-e2e/step2-onnx
\`\`\`

### Passo 3: Deploy com vLLM

\`\`\`bash
snippet:inference-e2e/step3-vllm
\`\`\`

### Passo 4: Client Python (OpenAI SDK)

\`\`\`python
snippet:inference-e2e/step4-client
\`\`\`

### Passo 5: Streaming

\`\`\`python
snippet:inference-e2e/step5-streaming
\`\`\`

> Em **5 passos** você saiu do notebook e chegou a um serviço de produção com streaming, otimizado e escalável.`,
    },
    'en-us': {
      title: 'E2E: From Dev to Production',
      body: `Let's walk the **complete journey**: from notebook development to production deployment with streaming.

### Step 1: Local development

\`\`\`python
snippet:inference-e2e/step1-dev
\`\`\`

### Step 2: Optimization with ONNX

\`\`\`python
snippet:inference-e2e/step2-onnx
\`\`\`

### Step 3: Deploy with vLLM

\`\`\`bash
snippet:inference-e2e/step3-vllm
\`\`\`

### Step 4: Python client (OpenAI SDK)

\`\`\`python
snippet:inference-e2e/step4-client
\`\`\`

### Step 5: Streaming

\`\`\`python
snippet:inference-e2e/step5-streaming
\`\`\`

> In **5 steps** you went from notebook to a production service with streaming, optimized and scalable.`,
    },
  },
  visual: {
    id: 'inference-e2e-visual',
    copy: {
      'pt-br': {
        title: 'Jornada: Dev → Production',
        step1Label: 'Dev',
        step1Desc: 'pipeline("text-generation") no notebook — iteração rápida, zero infra.',
        step2Label: 'Otimiza',
        step2Desc: 'optimum-cli export onnx — converte para formato otimizado, reduz VRAM.',
        step3Label: 'Deploy',
        step3Desc: 'vllm serve model — servidor OpenAI-compatible com PagedAttention.',
        step4Label: 'Client',
        step4Desc: 'OpenAI(base_url="http://localhost:8000") — client compatível com qualquer motor.',
        step5Label: 'Stream',
        step5Desc: 'stream=True — tokens chegam via SSE em tempo real, UX responsiva.',
      },
      'en-us': {
        title: 'Journey: Dev → Production',
        step1Label: 'Dev',
        step1Desc: 'pipeline("text-generation") in notebook — fast iteration, zero infra.',
        step2Label: 'Optimize',
        step2Desc: 'optimum-cli export onnx — converts to optimized format, reduces VRAM.',
        step3Label: 'Deploy',
        step3Desc: 'vllm serve model — OpenAI-compatible server with PagedAttention.',
        step4Label: 'Client',
        step4Desc: 'OpenAI(base_url="http://localhost:8000") — compatible client for any engine.',
        step5Label: 'Stream',
        step5Desc: 'stream=True — tokens arrive via SSE in real-time, responsive UX.',
      },
    },
  },
});
