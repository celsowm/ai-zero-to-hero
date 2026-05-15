import { defineSlide } from './_factory';

export const pytorchWhyPerformant = defineSlide({
  id: 'pytorch-why-performant',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'PyTorch: Eliminando o Overhead',
      body: `O PyTorch é rápido não apenas porque usa GPUs, mas porque **remove o peso do Python** de onde ele mais atrapalha.

### O problema: Python é lento para loops
Em Python puro, cada iteração de um loop tem overhead de interpretação e verificação de tipos. Para milhões de operações, isso torna o treino impossível.

### A Solução PyTorch
1. **C++ Backend:** o Python é apenas uma interface. Quando você faz \`a + b\`, o PyTorch chama kernels altamente otimizados em C++ (usando MKL ou CUDA) quase sem overhead.
2. **Dispatcher Inteligente:** o framework decide instantaneamente qual a melhor implementação para o hardware atual (CPU, GPU, MPS).
3. **Fused Kernels (TorchCompile):** o PyTorch pode "fundir" várias operações em uma única chamada de GPU, economizando tempo de lançamento de kernel.

> O PyTorch delega o trabalho pesado para o hardware via código nativo, mantendo a flexibilidade do Python para o desenvolvedor.`,
    },
    'en-us': {
      title: 'PyTorch: Eliminating Overhead',
      body: `PyTorch is fast not just because it uses GPUs, but because it **removes the weight of Python** from where it matters most.

### The problem: Python is slow for loops
In pure Python, every loop iteration has interpretation and type checking overhead. For millions of operations, this makes training impossible.

### The PyTorch Solution
1. **C++ Backend:** Python is just an interface. When you do \`a + b\`, PyTorch calls highly optimized C++ kernels (using MKL or CUDA) with almost no overhead.
2. **Smart Dispatcher:** the framework instantly decides the best implementation for the current hardware (CPU, GPU, MPS).
3. **Fused Kernels (TorchCompile):** PyTorch can "fuse" multiple operations into a single GPU call, saving kernel launch time.

> PyTorch delegates the heavy lifting to hardware via native code, keeping Python's flexibility for the developer.`,
    },
  },
  visual: {
    id: 'pytorch-performance',
    copy: {
      'pt-br': {
        beforeLabel: 'Abordagem Tradicional',
        afterLabel: 'PyTorch',
        pain1: 'Python loop: overhead de interpretação em cada iteração',
        pain2: 'Operações isoladas: muitos lançamentos de kernel pequenos',
        pain3: 'Interpretação: verificação de tipos no runtime do loop',
        pain4: 'Fragmentação: memória dispersa e acessos lentos',
        solution1: 'Eager mode: execute e debugue em tempo real',
        solution2: 'TorchCompile: kernels fundidos (1 launch, N ops)',
        solution3: 'C++ Dispatcher: operações em código nativo',
        solution4: 'Tensores Contíguos: layout de memória otimizado',
        benchmarkTitle: 'Benchmark: Forward + Backward Pass',
        modelSizeLabel: 'Parâmetros do modelo',
        runBenchmark: 'Executar Benchmark',
        running: 'Executando',
        pythonPureLabel: 'Python puro',
        numpyLabel: 'NumPy',
        pytorchCpuLabel: 'PyTorch CPU',
        pytorchGpuLabel: 'PyTorch GPU',
        timeUnit: 'ms',
        insightTitle: 'Insight',
        autogradTitle: 'Grafo Computacional Dinâmico',
        dynamicGraphLabel: 'PyTorch (dinâmico)',
        staticGraphLabel: 'TF 1.x (estático)',
        forwardLabel: 'Forward pass',
        backwardLabel: 'Backward pass',
        realBenchmarkTitle: 'Benchmark Real no Browser',
        runRealBenchmark: 'Rodar Benchmark Real',
        runningReal: 'Executando',
        jsPureLabel: 'JS Array puro',
        jsTypedLabel: 'JS Float32Array',
        webgpuLabel: 'WebGPU (GPU)',
        webgpuSupported: 'WebGPU disponível',
        webgpuNotSupported: 'Sem WebGPU',
        simulatedWarning: 'WebGPU não disponível neste browser.',
        realResultTitle: 'Resultado real:',
        speedupLabel: 'Speedup',
        operationLabel: 'Operação',
        elementsLabel: 'Elementos',
      },
      'en-us': {
        beforeLabel: 'Traditional Approach',
        afterLabel: 'PyTorch',
        pain1: 'Python loop: interpretation overhead each iteration',
        pain2: 'Isolated ops: many small kernel launches',
        pain3: 'Interpretation: type checking in loop runtime',
        pain4: 'Fragmentation: scattered memory and slow access',
        solution1: 'Eager mode: execute and debug in real time',
        solution2: 'TorchCompile: fused kernels (1 launch, N ops)',
        solution3: 'C++ Dispatcher: operations in native code',
        solution4: 'Contiguous Tensors: optimized memory layout',
        benchmarkTitle: 'Benchmark: Forward + Backward Pass',
        modelSizeLabel: 'Model parameters',
        runBenchmark: 'Run Benchmark',
        running: 'Running',
        pythonPureLabel: 'Pure Python',
        numpyLabel: 'NumPy',
        pytorchCpuLabel: 'PyTorch CPU',
        pytorchGpuLabel: 'PyTorch GPU',
        timeUnit: 'ms',
        insightTitle: 'Insight',
        autogradTitle: 'Dynamic Computational Graph',
        dynamicGraphLabel: 'PyTorch (dynamic)',
        staticGraphLabel: 'TF 1.x (static)',
        forwardLabel: 'Forward pass',
        backwardLabel: 'Backward pass',
        realBenchmarkTitle: 'Real In-Browser Benchmark',
        runRealBenchmark: 'Run Real Benchmark',
        runningReal: 'Running',
        jsPureLabel: 'JS Pure Array',
        jsTypedLabel: 'JS Float32Array',
        webgpuLabel: 'WebGPU (GPU)',
        webgpuSupported: 'WebGPU available',
        webgpuNotSupported: 'No WebGPU',
        simulatedWarning: 'WebGPU not available in this browser.',
        realResultTitle: 'Real result:',
        speedupLabel: 'Speedup',
        operationLabel: 'Operation',
        elementsLabel: 'Elements',
      },
    },
  },
});
