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
        'Nas versões mais novas do `llama.cpp`, o caminho padrão é ligar `--fit`: o runtime mede a memória livre e ajusta automaticamente parâmetros ainda não fixados, como contexto e distribuição entre GPU e CPU.',
        '',
        '### Regra prática',
        '',
        '- **`--fit` ligado**: melhor ponto de partida quando você quer subir rápido sem adivinhar um `-ngl`',
        '- **`-ngl` manual**: útil quando você quer travar um limite explícito de camadas na GPU',
        '- **Contexto (`-c`) e micro-batch (`-ub`)** disputam o mesmo orçamento de memória',
        '',
        '### Quando usar cada abordagem',
        '',
        '| Cenário | Melhor escolha |',
        '|---|---|',
        '| Você quer subir rápido no hardware disponível | `llama.cpp` com `--fit` |',
        '| Você quer controle fino local | `llama.cpp` com `-ngl` manual |',
        '| Você quer subir rápido e deixar o runtime decidir | `Transformers` + `accelerate` |',
        '| GPU pequena, mas ainda útil | Split GPU + CPU |',
        '| Servidor com bastante VRAM | Modelo quase todo na GPU |',
        '',
        'Você ainda pode refinar o ajuste com `--fit-target` (folga em MiB por dispositivo) e `--fit-ctx` (contexto mínimo que o auto-fit não reduz).',
        '',
        '> Pense em offload como um **orçamento de memória**: cada camada promovida para a GPU compra velocidade, mas consome VRAM escassa.',
      ].join('\n'),
    },
    'en-us': {
      title: 'GPU Offload in llama.cpp: where each layer runs',
      body: [
        'Offload is an execution decision: **how many layers fit on the GPU** and how many must keep running on the CPU.',
        '',
        'In newer `llama.cpp` builds, the default path is to enable `--fit`: the runtime checks free memory and automatically adjusts still-unset parameters such as context size and the GPU/CPU split.',
        '',
        '### Practical rule',
        '',
        '- **`--fit` enabled**: best starting point when you want to launch fast without guessing an `-ngl`',
        '- **Manual `-ngl`**: useful when you want to lock an explicit GPU layer limit',
        '- **Context (`-c`) and micro-batch (`-ub`)** compete for the same memory budget',
        '',
        '### When to use each approach',
        '',
        '| Scenario | Best choice |',
        '|---|---|',
        '| You want to launch quickly on the available hardware | `llama.cpp` with `--fit` |',
        '| You want fine-grained local control | `llama.cpp` with manual `-ngl` |',
        '| You want to move fast and let the runtime decide | `Transformers` + `accelerate` |',
        '| Small GPU, but still useful | GPU + CPU split |',
        '| Server with plenty of VRAM | Most of the model on GPU |',
        '',
        'You can still refine the result with `--fit-target` (MiB margin per device) and `--fit-ctx` (minimum context size that auto-fit will preserve).',
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
          { label: 'llama.cpp Windows' },
          { label: 'llama.cpp Linux' },
          { label: 'Transformers' },
        ],
        codePanels: [
          {
            title: 'Ponto de partida com `--fit` (Windows)',
            description: 'Você deixa o runtime ajustar o que ainda não foi fixado e usa `-ngl` só quando quer um limite manual.',
            source: { snippetId: 'llama-cpp/llama-cpp-offload', language: 'powershell' },
            codeExplanations: [
              {
                lineRange: [2, 2],
                content: 'Abrimos `llama-server` com o checkpoint GGUF `Jackrong/Qwopus3.6-27B-v2-GGUF:Q4_K_M`, já no fluxo atual em que o runtime tenta caber no hardware disponível.',
              },
              {
                lineRange: [3, 5],
                content: '`--fit on` ativa o ajuste automático. `--fit-target 1536` preserva uma folga de VRAM e `--fit-ctx 4096` impede que o contexto mínimo caia abaixo desse valor.',
              },
              {
                lineRange: [6, 7],
                content: '`-c` e `-ub` continuam importantes: contexto e micro-batch competem pelo mesmo orçamento de memória que o `--fit` está tentando equilibrar.',
              },
            ],
          },
          {
            title: 'Ponto de partida com `--fit` (Linux)',
            description: 'Você deixa o runtime ajustar o que ainda não foi fixado e usa `-ngl` só quando quer um limite manual.',
            source: { snippetId: 'llama-cpp/llama-cpp-offload', language: 'bash' },
            codeExplanations: [
              {
                lineRange: [2, 2],
                content: 'Abrimos `llama-server` com o checkpoint GGUF `Jackrong/Qwopus3.6-27B-v2-GGUF:Q4_K_M`, já no fluxo atual em que o runtime tenta caber no hardware disponível.',
              },
              {
                lineRange: [3, 5],
                content: '`--fit on` ativa o ajuste automático. `--fit-target 1536` preserva uma folga de VRAM e `--fit-ctx 4096` impede que o contexto mínimo caia abaixo desse valor.',
              },
              {
                lineRange: [6, 7],
                content: '`-c` e `-ub` continuam importantes: contexto e micro-batch competem pelo mesmo orçamento de memória que o `--fit` está tentando equilibrar.',
              },
            ],
          },
          {
            title: 'Transformers com `accelerate`',
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
          { label: 'llama.cpp Windows' },
          { label: 'llama.cpp Linux' },
          { label: 'Transformers' },
        ],
        codePanels: [
          {
            title: 'Starting point with `--fit` (Windows)',
            description: 'You let the runtime size the unset parameters first and only add `-ngl` when you need a manual override.',
            source: { snippetId: 'llama-cpp/llama-cpp-offload', language: 'powershell' },
            codeExplanations: [
              {
                lineRange: [2, 2],
                content: 'We launch `llama-server` with the `Jackrong/Qwopus3.6-27B-v2-GGUF:Q4_K_M` GGUF checkpoint, following the current flow where the runtime first tries to fit the model to the available hardware.',
              },
              {
                lineRange: [3, 5],
                content: '`--fit on` enables automatic sizing. `--fit-target 1536` keeps some VRAM margin, and `--fit-ctx 4096` prevents the minimum context from dropping below that floor.',
              },
              {
                lineRange: [6, 7],
                content: '`-c` and `-ub` still matter: context and micro-batching compete for the same memory budget that `--fit` is balancing.',
              },
            ],
          },
          {
            title: 'Starting point with `--fit` (Linux)',
            description: 'You let the runtime size the unset parameters first and only add `-ngl` when you need a manual override.',
            source: { snippetId: 'llama-cpp/llama-cpp-offload', language: 'bash' },
            codeExplanations: [
              {
                lineRange: [2, 2],
                content: 'We launch `llama-server` with the `Jackrong/Qwopus3.6-27B-v2-GGUF:Q4_K_M` GGUF checkpoint, following the current flow where the runtime first tries to fit the model to the available hardware.',
              },
              {
                lineRange: [3, 5],
                content: '`--fit on` enables automatic sizing. `--fit-target 1536` keeps some VRAM margin, and `--fit-ctx 4096` prevents the minimum context from dropping below that floor.',
              },
              {
                lineRange: [6, 7],
                content: '`-c` and `-ub` still matter: context and micro-batching compete for the same memory budget that `--fit` is balancing.',
              },
            ],
          },
          {
            title: 'Transformers with `accelerate`',
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
