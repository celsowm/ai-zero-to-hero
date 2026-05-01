import { defineSlide } from './_factory';

export const browserInferenceWhy = defineSlide({
  id: 'browser-inference-why',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: 'Inferência no Browser: Por Que Rodar LLMs Localmente?',
      body: `Depois de cobrir ONNX para otimização, o próximo passo lógico é: **e se o modelo rodasse diretamente no browser do usuário?**

### Os 4 Pilares
1. **Privacidade total**: os dados nunca saem do dispositivo. Sem server logging, sem data leakage, sem compliance GDPR extra.
2. **Custo zero de infra**: sem GPU server, sem API calls, sem auto-scaling. O device do usuário é o servidor.
3. **Offline-first**: após carregar o modelo (~50-500MB), funciona sem internet. Ideal para edge cases e demos.
4. **Latência mínima**: nenhum network round-trip. Inferência local = resposta em < 50ms.

### Os Trade-offs
- **VRAM limitada**: browser acessa GPU via WebGPU (~8-16GB típico). Modelos > 7B Q4_0 não cabem.
- **Sem Tensor Cores**: WebGPU não dá acesso a hardware específico como CUDA + tensor cores.
- **Compatibilidade**: WebGPU funciona em Chrome/Edge. Firefox e Safari têm suporte parcial.

### O Ecossistema
- **Transformers.js**: \`import { pipeline } from '@huggingface/transformers'\` — mesma API do Python
- **ONNX Runtime Web**: WASM + WebGPU execution provider
- **WebLLM**: MLC-compiled LLMs rodando 100% via WebGPU

> A tabela interativa compara server API vs browser local em 8 dimensões.`,
    },
    'en-us': {
      title: 'Browser Inference: Why Run LLMs Locally?',
      body: `After covering ONNX for optimization, the next logical step is: **what if the model ran directly in the user's browser?**

### The 4 Pillars
1. **Total privacy**: data never leaves the device. No server logging, no data leakage, no extra GDPR compliance.
2. **Zero infra cost**: no GPU server, no API calls, no auto-scaling. The user's device is the server.
3. **Offline-first**: after loading the model (~50-500MB), works without internet. Ideal for edge cases and demos.
4. **Minimum latency**: no network round-trip. Local inference = response in < 50ms.

### The Trade-offs
- **Limited VRAM**: browser accesses GPU via WebGPU (~8-16GB typical). Models > 7B Q4_0 don't fit.
- **No Tensor Cores**: WebGPU doesn't give access to specialized hardware like CUDA + tensor cores.
- **Compatibility**: WebGPU works in Chrome/Edge. Firefox and Safari have partial support.

### The Ecosystem
- **Transformers.js**: \`import { pipeline } from '@huggingface/transformers'\` — same API as Python
- **ONNX Runtime Web**: WASM + WebGPU execution provider
- **WebLLM**: MLC-compiled LLMs running 100% via WebGPU

> The interactive table compares server API vs browser local across 8 dimensions.`,
    },
  },
  visual: {
    id: 'browser-inference-comparison',
    copy: {
      'pt-br': {
        title: 'Server API vs Browser Local',
        subtitle: '8 dimensões comparativas',
        categoryLabel: 'Dimensão',
        serverLabel: 'Server API',
        browserLabel: 'Browser Local',
        clickHint: 'Clique para expandir',
        privacyLabel: 'Privacidade',
        costLabel: 'Custo',
        latencyLabel: 'Latência',
        offlineLabel: 'Offline',
        scaleLabel: 'Escala',
        modelSizeLabel: 'Tamanho do Modelo',
        complexityLabel: 'Complexidade',
        compatibilityLabel: 'Compatibilidade',
        details: {
          privacy: { server: 'Dados trafegam para servidor. Log de requests pode ser retido. Risco de data breach.', browser: '100% local. Dados nunca saem do dispositivo. Zero risco de leakage.' },
          cost: { server: 'GPU server: $5-50/hora. API calls: $0.001-0.1/1K tokens. Auto-scaling custa mais.', browser: 'Zero. O device do usuário faz o compute. Sem infra para manter.' },
          latency: { server: '50-500ms de network round-trip + tempo de fila no server.', browser: '< 50ms local. Sem network. Sem fila.' },
          offline: { server: 'Requer internet sempre. Sem conexão = sem serviço.', browser: 'Funciona offline após carregar o modelo. PWA pode cache tudo.' },
          scale: { server: 'Auto: multi-GPU cluster, load balancer, horizontal scaling.', browser: 'Limitado ao device. Cada usuário tem seu próprio "server".' },
          modelSize: { server: 'Sem limite. 70B+ com multi-GPU. vLLM serve modelos grandes.', browser: '~7B máximo com Q4_0 em devices com 8GB+ RAM de vídeo.' },
          complexity: { server: 'Deploy + monitor + infra + scaling + alerting. Ops team necessário.', browser: 'HTML + JS + modelo ONNX. Static hosting (GitHub Pages, Vercel).' },
          compatibility: { server: 'Qualquer client com HTTP. Universal.', browser: 'Chrome/Edge com WebGPU. Firefox/Safari parcial.' },
        },
      },
      'en-us': {
        title: 'Server API vs Browser Local',
        subtitle: '8 comparative dimensions',
        categoryLabel: 'Dimension',
        serverLabel: 'Server API',
        browserLabel: 'Browser Local',
        clickHint: 'Click to expand',
        privacyLabel: 'Privacy',
        costLabel: 'Cost',
        latencyLabel: 'Latency',
        offlineLabel: 'Offline',
        scaleLabel: 'Scale',
        modelSizeLabel: 'Model Size',
        complexityLabel: 'Complexity',
        compatibilityLabel: 'Compatibility',
        details: {
          privacy: { server: 'Data travels to server. Request logs may be retained. Data breach risk.', browser: '100% local. Data never leaves device. Zero leakage risk.' },
          cost: { server: 'GPU server: $5-50/hr. API calls: $0.001-0.1/1K tokens. Auto-scaling costs more.', browser: 'Zero. User device does the compute. No infra to maintain.' },
          latency: { server: '50-500ms network round-trip + server queue time.', browser: '< 50ms local. No network. No queue.' },
          offline: { server: 'Requires internet always. No connection = no service.', browser: 'Works offline after loading model. PWA can cache everything.' },
          scale: { server: 'Auto: multi-GPU cluster, load balancer, horizontal scaling.', browser: 'Limited to device. Each user has their own "server".' },
          modelSize: { server: 'No limit. 70B+ with multi-GPU. vLLM serves large models.', browser: '~7B max with Q4_0 on devices with 8GB+ VRAM.' },
          complexity: { server: 'Deploy + monitor + infra + scaling + alerting. Ops team needed.', browser: 'HTML + JS + ONNX model. Static hosting (GitHub Pages, Vercel).' },
          compatibility: { server: 'Any client with HTTP. Universal.', browser: 'Chrome/Edge with WebGPU. Firefox/Safari partial.' },
        },
      },
    },
  },
});
