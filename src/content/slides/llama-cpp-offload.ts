import { defineSlide } from './_factory';

export const llamaCppOffload = defineSlide({
  id: 'llama-cpp-offload',
  type: 'two-column',
  options: { columnRatios: [0.47, 0.53] },
  content: {
    'pt-br': {
      title: 'GPU Offload no llama.cpp: onde cada camada roda',
      body: [
        'Offload é uma decisão de execução: **quantas camadas cabem na GPU** e quantas precisam continuar na CPU.',
        '',
        'No `llama.cpp`, isso aparece de forma explícita com `-ngl` (`n_gpu_layers`). Se a VRAM não comporta o modelo inteiro, você empurra só uma parte para a GPU e mantém o restante em RAM.',
        '',
        '### Regra prática',
        '',
        '- **Mais camadas na GPU**: maior throughput e menor latência',
        '- **Mais camadas na CPU**: cabe em hardware menor, mas desacelera',
        '- **Contexto maior (`-c`)** também consome memória, então o melhor `-ngl` depende do uso real',
        '',
        '### Quando usar cada abordagem',
        '',
        '| Cenário | Melhor escolha |',
        '|---|---|',
        '| Você quer controle fino local | `llama.cpp` com `-ngl` |',
        '| Você quer subir rápido e deixar o runtime decidir | `Transformers` + `accelerate` |',
        '| GPU pequena, mas ainda útil | Split GPU + CPU |',
        '| Servidor com bastante VRAM | Modelo quase todo na GPU |',
        '',
        '> Pense em offload como um **orçamento de memória**: cada camada promovida para a GPU compra velocidade, mas consome VRAM escassa.',
      ].join('\n'),
    },
    'en-us': {
      title: 'GPU Offload in llama.cpp: where each layer runs',
      body: [
        'Offload is an execution decision: **how many layers fit on the GPU** and how many must keep running on the CPU.',
        '',
        'In `llama.cpp`, this is explicit through `-ngl` (`n_gpu_layers`). If VRAM cannot hold the whole model, you push only part of it to the GPU and keep the rest in system RAM.',
        '',
        '### Practical rule',
        '',
        '- **More layers on GPU**: higher throughput and lower latency',
        '- **More layers on CPU**: fits smaller hardware, but slows down',
        '- **Larger context (`-c`)** also consumes memory, so the best `-ngl` depends on real usage',
        '',
        '### When to use each approach',
        '',
        '| Scenario | Best choice |',
        '|---|---|',
        '| You want fine-grained local control | `llama.cpp` with `-ngl` |',
        '| You want to move fast and let the runtime decide | `Transformers` + `accelerate` |',
        '| Small GPU, but still useful | GPU + CPU split |',
        '| Server with plenty of VRAM | Most of the model on GPU |',
        '',
        '> Think of offload as a **memory budget**: each layer promoted to the GPU buys speed, but spends scarce VRAM.',
      ].join('\n'),
    },
  },
  visual: {
    id: 'code-tabs',
    copy: {
      'pt-br': {
        tabs: [
          { label: 'llama.cpp' },
          { label: 'Transformers' },
        ],
        codePanels: [
          {
            title: 'Controle explícito com `-ngl`',
            description: 'Você escolhe quantas camadas vão para a GPU e ajusta contexto e batch conforme o hardware disponível.',
            source: { snippetId: 'llama-cpp/llama-cpp-offload', language: 'bash' },
            codeExplanations: [
              {
                lineRange: [1, 2],
                content: 'Abrimos `llama-cli` com um modelo GGUF quantizado. Esse é o fluxo típico quando queremos rodar localmente com o mínimo de dependências.',
              },
              {
                lineRange: [3, 3],
                content: '`-ngl 35` manda aproximadamente 35 camadas para a GPU. Se houver VRAM sobrando, aumente; se faltar memória, reduza.',
              },
              {
                lineRange: [4, 6],
                content: '`-c` aumenta o contexto, `-fa` ativa atenção otimizada e `-ub` ajusta o micro-batch. Esses parâmetros competem pelo mesmo orçamento de memória.',
              },
              {
                lineRange: [7, 8],
                content: 'Limitamos a geração e definimos um prompt simples para testar rapidamente se a configuração ficou estável.',
              },
            ],
          },
          {
            title: 'Comparação com `accelerate`',
            description: 'No ecossistema Transformers, o runtime decide o particionamento usando `device_map="auto"`.',
            source: { snippetId: 'transformers/offload-accelerate-compare', language: 'python' },
            codeExplanations: [
              {
                lineRange: [1, 3],
                content: 'Carregamos tokenizer e modelo da forma usual do Hugging Face, sem lidar diretamente com cada camada.',
              },
              {
                lineRange: [4, 8],
                content: '`device_map="auto"` pede ao `accelerate` para decidir o split entre GPU e CPU. `max_memory` impõe o teto disponível em cada dispositivo.',
              },
              {
                lineRange: [9, 9],
                content: '`torch_dtype="auto"` reaproveita o dtype mais adequado ao checkpoint, reduzindo decisões manuais.',
              },
            ],
          },
        ],
      },
      'en-us': {
        tabs: [
          { label: 'llama.cpp' },
          { label: 'Transformers' },
        ],
        codePanels: [
          {
            title: 'Explicit control with `-ngl`',
            description: 'You choose how many layers go to the GPU and tune context and batch size around the hardware you have.',
            source: { snippetId: 'llama-cpp/llama-cpp-offload', language: 'bash' },
            codeExplanations: [
              {
                lineRange: [1, 2],
                content: 'We launch `llama-cli` with a quantized GGUF model. This is the standard flow when we want local inference with minimal dependencies.',
              },
              {
                lineRange: [3, 3],
                content: '`-ngl 35` sends roughly 35 layers to the GPU. If VRAM is still available, increase it; if memory is tight, reduce it.',
              },
              {
                lineRange: [4, 6],
                content: '`-c` increases context, `-fa` enables optimized attention, and `-ub` tunes micro-batching. These parameters compete for the same memory budget.',
              },
              {
                lineRange: [7, 8],
                content: 'We cap generation and provide a simple prompt so we can quickly check whether the configuration is stable.',
              },
            ],
          },
          {
            title: 'Comparison with `accelerate`',
            description: 'In the Transformers ecosystem, the runtime chooses the split through `device_map="auto"`.',
            source: { snippetId: 'transformers/offload-accelerate-compare', language: 'python' },
            codeExplanations: [
              {
                lineRange: [1, 3],
                content: 'We load tokenizer and model in the usual Hugging Face style, without managing each layer directly.',
              },
              {
                lineRange: [4, 8],
                content: '`device_map="auto"` asks `accelerate` to decide the GPU/CPU split. `max_memory` sets the budget available on each device.',
              },
              {
                lineRange: [9, 9],
                content: '`torch_dtype="auto"` reuses the most appropriate dtype from the checkpoint, reducing manual tuning.',
              },
            ],
          },
        ],
      },
    },
  },
});
