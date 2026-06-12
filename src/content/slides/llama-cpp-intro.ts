import { defineSlide } from './_factory';

export const llamaCppIntro = defineSlide({
  id: 'llama-cpp-intro',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: 'llama.cpp: GGUF, Quantização e Inferência em CPU',
      body: [
        'O **llama.cpp** é uma implementação de referência em **C/C++** para inferência de LLMs, criada por **Georgi Gerganov**.',
        '',
        'Diferente de frameworks Python, o llama.cpp é um binário único sem dependências externas — roda em **CPU**, **Apple Silicon (Metal)**, **NVIDIA CUDA**, **AMD ROCm** e **Vulkan**.',
        '',
        '### Modos de uso',
        '',
        '- **`llama-cli`** — terminal interativo, bate-papo e prompt único',
        "- **`llama-server`** — servidor HTTP compatível com a API OpenAI (`/v1/chat/completions`)",
        '- **`llama-bench`** — benchmark de desempenho no seu hardware',
        '',
        '### Destaques',
        '',
        '- **Download automático**: `llama-cli -hf usuário/modelo` baixa e executa em um comando',
        '- **Quantização de 2 a 8 bits**: reduz RAM em até 75% sem perder qualidade',
        '- **Ecossistema**: bindings para Python, Node.js, Go, Rust, C#, Java e mais',
        "- **Instalação alternativa**: `brew install llama.cpp` (macOS), `winget install llama.cpp` (Windows) ou binários pré-compilados nas [releases](https://github.com/ggml-org/llama.cpp/releases)",
      ].join('\n'),
    },
    'en-us': {
      title: 'llama.cpp: GGUF, Quantization and CPU Inference',
      body: [
        '**llama.cpp** is a **C/C++** reference implementation for LLM inference, created by **Georgi Gerganov**.',
        '',
        'Unlike Python frameworks, llama.cpp is a single binary with no external dependencies — it runs on **CPU**, **Apple Silicon (Metal)**, **NVIDIA CUDA**, **AMD ROCm**, and **Vulkan**.',
        '',
        '### Usage modes',
        '',
        '- **`llama-cli`** — interactive terminal, chat, and single-prompt mode',
        "- **`llama-server`** — OpenAI-compatible HTTP server (`/v1/chat/completions`)",
        '- **`llama-bench`** — performance benchmark for your hardware',
        '',
        '### Highlights',
        '',
        "- **Auto-download**: `llama-cli -hf user/model` downloads and runs in one command",
        '- **2 to 8-bit quantization**: reduces RAM by up to 75% with minimal quality loss',
        '- **Ecosystem**: bindings for Python, Node.js, Go, Rust, C#, Java and more',
        "- **Alternative install**: `brew install llama.cpp` (macOS), `winget install llama.cpp` (Windows) or pre-built binaries from [releases](https://github.com/ggml-org/llama.cpp/releases)",
      ].join('\n'),
    },
  },
  visual: {
    id: 'llama-cpp-build-guide',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Windows' }, { label: 'Windows (CPU)' }, { label: 'macOS' }, { label: 'Linux' }],
        codePanels: [
          {
            title: 'Windows (PowerShell)',
            description: 'Instala Git, CMake e Visual Studio; clona, compila e roda um modelo.',
            source: { snippetId: 'llama-cpp/llama-cpp-build-windows', language: 'powershell' },
            codeExplanations: [
              {
                lineRange: [1, 1],
                content: 'Verifica se VS Code e Visual Studio C++ estão instalados antes de compilar.',
              },
              {
                lineRange: [2, 2],
                content: 'Instala Git, CMake e o Build Tools da Visual Studio via winget.',
              },
              {
                lineRange: [3, 3],
                content: 'Clona o repositório oficial (ggml-org/llama.cpp).',
              },
              {
                lineRange: [5, 5],
                content: 'Configura o build com CMake usando o gerador padrão do Visual Studio.',
              },
              {
                lineRange: [6, 6],
                content: 'Compila o projeto em modo Release.',
              },
              {
                lineRange: [7, 7],
                content: 'Usa `-hf` para baixar e executar o modelo Gemma 3 1B direto do Hugging Face.',
              },
            ],
          },
          {
            title: 'Windows (CPU - OpenBLAS)',
            description: 'Instala Git, CMake e VS Build Tools; compila com aceleração BLAS via OpenBLAS (CPU).',
            source: { snippetId: 'llama-cpp/llama-cpp-build-windows-cpu', language: 'powershell' },
            codeExplanations: [
              {
                lineRange: [1, 1],
                content: 'Verifica se VS Code e Visual Studio C++ estão instalados antes de compilar.',
              },
              {
                lineRange: [2, 2],
                content: 'Instala Git, CMake e o Build Tools da Visual Studio via winget.',
              },
              {
                lineRange: [3, 3],
                content: 'Clona o repositório oficial (ggml-org/llama.cpp).',
              },
              {
                lineRange: [5, 5],
                content: 'Configura o build com CMake ativando aceleração BLAS via OpenBLAS para CPU.',
              },
              {
                lineRange: [11, 11],
                content: 'Compila o projeto em modo Release.',
              },
              {
                lineRange: [12, 12],
                content: 'Usa `-hf` para baixar e executar o modelo Gemma 3 1B direto do Hugging Face.',
              },
            ],
          },
          {
            title: 'macOS (Bash)',
            description: 'Instala Xcode CLT + Homebrew; clona, compila com Metal e roda.',
            source: { snippetId: 'llama-cpp/llama-cpp-build-mac', language: 'bash' },
            codeExplanations: [
              {
                lineRange: [1, 1],
                content: 'Instala o Xcode Command Line Tools (compilador clang, headers do sistema).',
              },
              {
                lineRange: [2, 2],
                content: 'Instala o Homebrew, o gerenciador de pacotes do macOS.',
              },
              {
                lineRange: [3, 3],
                content: 'Instala Git e CMake via Homebrew.',
              },
              {
                lineRange: [4, 4],
                content: 'Clona o repositório oficial (ggml-org/llama.cpp).',
              },
              {
                lineRange: [6, 6],
                content: 'Ativa o backend Metal da Apple com `-DGGML_METAL=ON` — essencial para GPU em Apple Silicon.',
              },
              {
                lineRange: [7, 7],
                content: 'Compila o projeto em modo Release.',
              },
              {
                lineRange: [8, 8],
                content: 'Usa `-hf` para baixar e executar o modelo Gemma 3 1B direto do Hugging Face.',
              },
            ],
          },
          {
            title: 'Linux (Bash)',
            description: 'Instala build-essential; clona, compila e roda um modelo.',
            source: { snippetId: 'llama-cpp/llama-cpp-build-linux', language: 'bash' },
            codeExplanations: [
              {
                lineRange: [1, 1],
                content: 'Atualiza a lista de pacotes do apt.',
              },
              {
                lineRange: [2, 2],
                content: 'Instala Git, GCC (build-essential) e CMake.',
              },
              {
                lineRange: [3, 3],
                content: 'Clona o repositório oficial (ggml-org/llama.cpp).',
              },
              {
                lineRange: [5, 5],
                content: 'Configura o build com CMake. AVX2/AVX512 são detectados automaticamente.',
              },
              {
                lineRange: [6, 6],
                content: 'Compila o projeto em modo Release.',
              },
              {
                lineRange: [7, 7],
                content: 'Usa `-hf` para baixar e executar o modelo Gemma 3 1B direto do Hugging Face.',
              },
            ],
          },
        ],
      },
      'en-us': {
        tabs: [{ label: 'Windows' }, { label: 'Windows (CPU)' }, { label: 'macOS' }, { label: 'Linux' }],
        codePanels: [
          {
            title: 'Windows (PowerShell)',
            description: 'Install Git, CMake, Visual Studio; clone, build, and run a model.',
            source: { snippetId: 'llama-cpp/llama-cpp-build-windows', language: 'powershell' },
            codeExplanations: [
              {
                lineRange: [1, 1],
                content: 'Checks if VS Code and Visual Studio C++ are installed before building.',
              },
              {
                lineRange: [2, 2],
                content: 'Installs Git, CMake, and Visual Studio Build Tools via winget.',
              },
              {
                lineRange: [3, 3],
                content: 'Clones the official repository (ggml-org/llama.cpp).',
              },
              {
                lineRange: [5, 5],
                content: 'Configures the build with CMake using the default Visual Studio generator.',
              },
              {
                lineRange: [6, 6],
                content: 'Builds in Release mode.',
              },
              {
                lineRange: [7, 7],
                content: 'Uses `-hf` to download and run the Gemma 3 1B model directly from Hugging Face.',
              },
            ],
          },
          {
            title: 'Windows (CPU - OpenBLAS)',
            description: 'Install Git, CMake, VS Build Tools; build with BLAS acceleration via OpenBLAS (CPU).',
            source: { snippetId: 'llama-cpp/llama-cpp-build-windows-cpu', language: 'powershell' },
            codeExplanations: [
              {
                lineRange: [1, 1],
                content: 'Checks if VS Code and Visual Studio C++ are installed before building.',
              },
              {
                lineRange: [2, 2],
                content: 'Installs Git, CMake, and Visual Studio Build Tools via winget.',
              },
              {
                lineRange: [3, 3],
                content: 'Clones the official repository (ggml-org/llama.cpp).',
              },
              {
                lineRange: [5, 5],
                content: 'Configures the build with CMake enabling BLAS acceleration via OpenBLAS for CPU.',
              },
              {
                lineRange: [11, 11],
                content: 'Builds in Release mode.',
              },
              {
                lineRange: [12, 12],
                content: 'Uses `-hf` to download and run the Gemma 3 1B model directly from Hugging Face.',
              },
            ],
          },
          {
            title: 'macOS (Bash)',
            description: 'Install Xcode CLT + Homebrew; clone, build with Metal, and run.',
            source: { snippetId: 'llama-cpp/llama-cpp-build-mac', language: 'bash' },
            codeExplanations: [
              {
                lineRange: [1, 1],
                content: 'Installs Xcode Command Line Tools (clang compiler, system headers).',
              },
              {
                lineRange: [2, 2],
                content: 'Installs Homebrew, the macOS package manager.',
              },
              {
                lineRange: [3, 3],
                content: 'Installs Git and CMake via Homebrew.',
              },
              {
                lineRange: [4, 4],
                content: 'Clones the official repository (ggml-org/llama.cpp).',
              },
              {
                lineRange: [6, 6],
                content: 'Enables Apple\'s Metal backend with `-DGGML_METAL=ON` — essential for GPU on Apple Silicon.',
              },
              {
                lineRange: [7, 7],
                content: 'Builds in Release mode.',
              },
              {
                lineRange: [8, 8],
                content: 'Uses `-hf` to download and run the Gemma 3 1B model directly from Hugging Face.',
              },
            ],
          },
          {
            title: 'Linux (Bash)',
            description: 'Install build-essential; clone, build, and run a model.',
            source: { snippetId: 'llama-cpp/llama-cpp-build-linux', language: 'bash' },
            codeExplanations: [
              {
                lineRange: [1, 1],
                content: 'Updates the apt package list.',
              },
              {
                lineRange: [2, 2],
                content: 'Installs Git, GCC (build-essential), and CMake.',
              },
              {
                lineRange: [3, 3],
                content: 'Clones the official repository (ggml-org/llama.cpp).',
              },
              {
                lineRange: [5, 5],
                content: 'Configures the build with CMake. AVX2/AVX512 are detected automatically.',
              },
              {
                lineRange: [6, 6],
                content: 'Builds in Release mode.',
              },
              {
                lineRange: [7, 7],
                content: 'Uses `-hf` to download and run the Gemma 3 1B model directly from Hugging Face.',
              },
            ],
          },
        ],
      },
    },
  },
});
