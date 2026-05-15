import { defineSlide } from './_factory';

export const pytorchAutograd = defineSlide({
  id: 'pytorch-autograd',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Autograd e Grafos Dinâmicos',
      body: `O segredo da flexibilidade do PyTorch está em como ele lida com o cálculo de gradientes.

### O Problema do Grafo Estático
Antigamente (TensorFlow 1.x), você precisava definir todo o modelo (grafo) antes de rodar. Debugar era um pesadelo: erros só apareciam no "runtime" do grafo, não na sua linha de código.

### Autograd: Grafo Dinâmico
No PyTorch, o grafo é construído **no momento da execução** (Eager Mode).
- **Flexibilidade:** Você pode usar \`if\`, \`for\` e recursão Python dentro do seu modelo.
- **Backprop Automático:** O PyTorch rastreia cada operação. Basta chamar \`.backward()\` e ele calcula todos os gradientes para você.
- **Debug Nativo:** Use \`print()\`, \`pdb\` ou breakpoints como em qualquer código Python comum.

> Cada vez que você roda o modelo, o PyTorch "redesenha" o caminho para o cálculo dos gradientes de forma transparente.`,
    },
    'en-us': {
      title: 'Autograd and Dynamic Graphs',
      body: `The secret to PyTorch's flexibility lies in how it handles gradient computation.

### The Static Graph Problem
In the past (TensorFlow 1.x), you had to define the entire model (graph) before running it. Debugging was a nightmare: errors only appeared in the graph's "runtime", not at your line of code.

### Autograd: Dynamic Graph
In PyTorch, the graph is built **at the time of execution** (Eager Mode).
- **Flexibility:** You can use Python \`if\`, \`for\`, and recursion inside your model.
- **Automatic Backprop:** PyTorch tracks every operation. Just call \`.backward()\` and it calculates all gradients for you.
- **Native Debug:** Use \`print()\`, \`pdb\`, or breakpoints just like in any ordinary Python code.

> Every time you run the model, PyTorch "redraws" the path for gradient calculation transparently.`,
    },
  },
  visual: {
    id: 'pytorch-autograd',
    copy: {
      'pt-br': {
        autogradTitle: 'Grafo Computacional Dinâmico',
        dynamicGraphLabel: 'PyTorch (dinâmico)',
        staticGraphLabel: 'TF 1.x (estático)',
        forwardLabel: 'Forward pass',
        backwardLabel: 'Backward pass',
        // Real benchmark labels for performance insight
        realBenchmarkTitle: 'Velocidade Real no Browser',
        runRealBenchmark: 'Testar Performance Real',
        runningReal: 'Calculando',
        jsPureLabel: 'Loops Python-like (JS)',
        jsTypedLabel: 'Vectorized (Typed)',
        webgpuLabel: 'Aceleração GPU',
        webgpuSupported: 'WebGPU On',
        webgpuNotSupported: 'WebGPU Off',
        simulatedWarning: 'WebGPU não disponível — resultado simulado.',
        realResultTitle: 'Speedup:',
        speedupLabel: 'Ganho de Velocidade',
        operationLabel: 'Operação',
        elementsLabel: 'Dados',
        // Reuse some labels from the other visual for type safety
        beforeLabel: '',
        afterLabel: '',
        pain1: '', pain2: '', pain3: '', pain4: '',
        solution1: '', solution2: '', solution3: '', solution4: '',
        benchmarkTitle: '', modelSizeLabel: '', runBenchmark: '', running: '',
        pythonPureLabel: '', numpyLabel: '', pytorchCpuLabel: '', pytorchGpuLabel: '',
        timeUnit: 'ms', insightTitle: '',
      },
      'en-us': {
        autogradTitle: 'Dynamic Computational Graph',
        dynamicGraphLabel: 'PyTorch (dynamic)',
        staticGraphLabel: 'TF 1.x (static)',
        forwardLabel: 'Forward pass',
        backwardLabel: 'Backward pass',
        realBenchmarkTitle: 'Real Browser Speed',
        runRealBenchmark: 'Test Real Performance',
        runningReal: 'Calculating',
        jsPureLabel: 'Python-like Loops (JS)',
        jsTypedLabel: 'Vectorized (Typed)',
        webgpuLabel: 'GPU Acceleration',
        webgpuSupported: 'WebGPU On',
        webgpuNotSupported: 'WebGPU Off',
        simulatedWarning: 'WebGPU not available — simulated result.',
        realResultTitle: 'Speedup:',
        speedupLabel: 'Speed gain',
        operationLabel: 'Operation',
        elementsLabel: 'Data',
        // Reuse some labels from the other visual for type safety
        beforeLabel: '',
        afterLabel: '',
        pain1: '', pain2: '', pain3: '', pain4: '',
        solution1: '', solution2: '', solution3: '', solution4: '',
        benchmarkTitle: '', modelSizeLabel: '', runBenchmark: '', running: '',
        pythonPureLabel: '', numpyLabel: '', pytorchCpuLabel: '', pytorchGpuLabel: '',
        timeUnit: 'ms', insightTitle: '',
      },
    },
  },
});
