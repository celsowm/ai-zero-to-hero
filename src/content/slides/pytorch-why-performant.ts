import { defineSlide } from './_factory';

export const pytorchWhyPerformant = defineSlide({
  id: 'pytorch-why-performant',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Por que o PyTorch é Tão Performático?',
      body: `Acabamos de ver como tensores exploram GPUs e Tensor Cores. Mas o PyTorch tem truques **no nível do framework** que o tornam rápido mesmo antes do hardware entrar em ação.

### O problema de frameworks antigos

1. **Overhead do Python puro:** loops com \`for\` em Python têm overhead de chamada de função, garbage collector e interpretação bytecode. Para milhões de operações, isso destrói performance.

2. **Graph compilation estática:** TensorFlow 1.x exigia definir o grafo inteiro antes de executar qualquer coisa. Debug era impossível — você só via erros no runtime do grafo compilado.

3. **Sem fusão de operações:** cada operação (\`+ \`,\`*\`, \`matmul\`) era um kernel separado na GPU. Muitos kernels pequenos = overhead de lançamento maior que o compute real.

4. **Backprop manual:** calcular gradientes à mão para arquiteturas complexas era propenso a erros e lento. Cada mudança na arquitetura exigia re-derivar tudo.

### O PyTorch resolve isso

- **Eager mode:** execute operações e veja resultados **imediatamente**. Debug com \`print()\`, \`pdb\`, breakpoints. O grafo computacional é construído **dinamicamente** a cada forward pass.

- **Autograd:** cada tensor com \`requires_grad=True\` rastreia operações. O backprop é **automático** — basta chamar \`.backward()\`. Suporta qualquer arquitetura, inclusive loops e conditionals.

- **Dispatcher + C++ backend:** as operações de tensor são implementadas em C++ puro. O Python é só uma "casca" — o trabalho pesado roda em código nativo com MKL, cuDNN.

- **TorchCompile (fused kernels):** compila hotspots do seu modelo em kernels fused. Várias operações viram **uma só** na GPU, reduzindo lançamentos de kernel e acessos à memória.

> PyTorch não é rápido por causa da GPU — é rápido porque **cada camada remove overhead do Python e delega ao C++**.`,
    },
    'en-us': {
      title: 'Why is PyTorch So Performant?',
      body: `We just saw how tensors exploit GPUs and Tensor Cores. But PyTorch has tricks **at the framework level** that make it fast even before hardware comes into play.

### The problem with older frameworks

1. **Pure Python overhead:** \`for\` loops in Python have function call overhead, garbage collection, and bytecode interpretation. For millions of operations, this destroys performance.

2. **Static graph compilation:** TensorFlow 1.x required defining the entire graph before executing anything. Debugging was impossible — you only saw errors in the compiled graph runtime.

3. **No operation fusion:** each operation (\`+\`, \`*\`, \`matmul\`) was a separate GPU kernel. Many small kernels = launch overhead greater than actual compute.

4. **Manual backprop:** computing gradients by hand for complex architectures was error-prone and slow. Every architecture change required re-deriving everything.

### PyTorch solves this

- **Eager mode:** execute operations and see results **immediately**. Debug with \`print()\`, \`pdb\`, breakpoints. The computational graph is built **dynamically** each forward pass.

- **Autograd:** every tensor with \`requires_grad=True\` tracks operations. Backprop is **automatic** — just call \`.backward()\`. Supports any architecture, including loops and conditionals.

- **Dispatcher + C++ backend:** tensor operations are implemented in pure C++. Python is just a "shell" — the heavy work runs in native code with MKL, cuDNN.

- **TorchCompile (fused kernels):** compiles hotspots of your model into fused kernels. Multiple operations become **one** on the GPU, reducing kernel launches and memory accesses.

> PyTorch isn't fast because of the GPU — it's fast because **every layer removes Python overhead and delegates to C++**.`,
    },
  },
  visual: {
    id: 'pytorch-performance',
    copy: {
      'pt-br': {
        beforeLabel: 'Abordagem Tradicional',
        afterLabel: 'PyTorch',
        pain1: 'Python loop: overhead de interpretação em cada iteração',
        pain2: 'Graph estático: compile antes, debug nunca',
        pain3: 'Kernels separados: 50 launches para 50 operações',
        pain4: 'Backprop manual: re-derivar gradientes à mão',
        solution1: 'Eager mode: execute e debugue em tempo real',
        solution2: 'Autograd: grafo dinâmico + backprop automático',
        solution3: 'C++ Dispatcher: operações em código nativo',
        solution4: 'TorchCompile: fused kernels (1 launch, N ops)',
        benchmarkTitle: 'Benchmark: Forward + Backward Pass',
        modelSizeLabel: 'Parâmetros do modelo',
        runBenchmark: 'Executar Benchmark',
        running: 'Executando',
        pythonPureLabel: 'Python puro',
        numpyLabel: 'NumPy',
        pytorchCpuLabel: 'PyTorch CPU',
        pytorchGpuLabel: 'PyTorch GPU',
        timeUnit: 'ms',
        autogradTitle: 'Grafo Computacional Dinâmico',
        dynamicGraphLabel: 'PyTorch (dinâmico)',
        staticGraphLabel: 'TF 1.x (estático)',
        forwardLabel: 'Forward pass',
        backwardLabel: 'Backward pass',
        insightTitle: 'Insight',
        // Real benchmark labels
        realBenchmarkTitle: 'Benchmark Real no Browser',
        runRealBenchmark: 'Rodar Benchmark Real',
        runningReal: 'Executando',
        jsPureLabel: 'JS Array puro',
        jsTypedLabel: 'JS Float32Array',
        webgpuLabel: 'WebGPU (GPU)',
        webgpuSupported: 'WebGPU disponível',
        webgpuNotSupported: 'Sem WebGPU',
        simulatedWarning: 'WebGPU não disponível neste browser — resultado simulado com base em benchmarks típicos.',
        realResultTitle: 'Resultado real:',
        speedupLabel: 'Speedup',
        operationLabel: 'Operação',
        elementsLabel: 'Elementos',
      },
      'en-us': {
        beforeLabel: 'Traditional Approach',
        afterLabel: 'PyTorch',
        pain1: 'Python loop: interpretation overhead each iteration',
        pain2: 'Static graph: compile first, debug never',
        pain3: 'Separate kernels: 50 launches for 50 operations',
        pain4: 'Manual backprop: re-derive gradients by hand',
        solution1: 'Eager mode: execute and debug in real time',
        solution2: 'Autograd: dynamic graph + automatic backprop',
        solution3: 'C++ Dispatcher: operations in native code',
        solution4: 'TorchCompile: fused kernels (1 launch, N ops)',
        benchmarkTitle: 'Benchmark: Forward + Backward Pass',
        modelSizeLabel: 'Model parameters',
        runBenchmark: 'Run Benchmark',
        running: 'Running',
        pythonPureLabel: 'Pure Python',
        numpyLabel: 'NumPy',
        pytorchCpuLabel: 'PyTorch CPU',
        pytorchGpuLabel: 'PyTorch GPU',
        timeUnit: 'ms',
        autogradTitle: 'Dynamic Computational Graph',
        dynamicGraphLabel: 'PyTorch (dynamic)',
        staticGraphLabel: 'TF 1.x (static)',
        forwardLabel: 'Forward pass',
        backwardLabel: 'Backward pass',
        insightTitle: 'Insight',
        // Real benchmark labels
        realBenchmarkTitle: 'Real In-Browser Benchmark',
        runRealBenchmark: 'Run Real Benchmark',
        runningReal: 'Running',
        jsPureLabel: 'JS Pure Array',
        jsTypedLabel: 'JS Float32Array',
        webgpuLabel: 'WebGPU (GPU)',
        webgpuSupported: 'WebGPU available',
        webgpuNotSupported: 'No WebGPU',
        simulatedWarning: 'WebGPU not available in this browser — simulated result based on typical benchmarks.',
        realResultTitle: 'Real result:',
        speedupLabel: 'Speedup',
        operationLabel: 'Operation',
        elementsLabel: 'Elements',
      },
    },
  },
});
