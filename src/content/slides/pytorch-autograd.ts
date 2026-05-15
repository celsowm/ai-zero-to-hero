import { defineSlide } from './_factory';

export const pytorchAutograd = defineSlide({
  id: 'pytorch-autograd',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Autograd e Grafos Dinâmicos',
      body: `O segredo da flexibilidade do PyTorch está no **Autograd**: o motor de diferenciação automática.

### O que é o Autograd?
Imagine que cada operação matemática que você faz (soma, multiplicação, ReLU) é anotada em um "caderno" secreto pelo PyTorch. 
- **No Forward:** Ele registra o que foi feito.
- **No Backward:** Ele lê esse caderno de trás para frente e aplica a **Regra da Cadeia** automaticamente para calcular todos os gradientes.

### Por que Grafo Dinâmico?
Antigamente (TF 1.x), o grafo era estático: você desenhava o mapa antes de começar a viagem. No PyTorch, o grafo é **construído enquanto você dirige**.
- **Flexibilidade Total:** Você pode usar \`if\`, \`for\` e recursão Python. O "caderno" do Autograd se adapta a cada variação do código em tempo real.
- **Debug Nativo:** Como o grafo é criado na hora, você pode usar \`print()\` ou breakpoints para ver o que está acontecendo no meio do cálculo.

> Chamar \`loss.backward()\` é como dar o comando para o Autograd ler o caderno e entregar a "bússola" (gradientes) para o otimizador.`,
    },
    'en-us': {
      title: 'Autograd and Dynamic Graphs',
      body: `The secret to PyTorch's flexibility lies in **Autograd**: the automatic differentiation engine.

### What is Autograd?
Imagine that every mathematical operation you perform (addition, multiplication, ReLU) is noted in a secret "notebook" by PyTorch.
- **Forward pass:** It records what was done.
- **Backward pass:** It reads this notebook backwards and applies the **Chain Rule** automatically to calculate all gradients.

### Why Dynamic Graphs?
In the past (TF 1.x), graphs were static: you drew the map before starting the journey. In PyTorch, the graph is **built while you drive**.
- **Total Flexibility:** You can use Python \`if\`, \`for\`, and recursion. The Autograd "notebook" adapts to every code variation in real-time.
- **Native Debug:** Since the graph is created on the fly, you can use \`print()\` or breakpoints to see what is happening in the middle of the calculation.

> Calling \`loss.backward()\` is like commanding Autograd to read the notebook and deliver the "compass" (gradients) to the optimizer.`,
    },
  },
  visual: {
    id: 'pytorch-autograd',
    copy: {
      'pt-br': {
        tabs: [
          { label: 'Demonstração' },
          { label: 'Código (Benchmark)' }
        ],
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
        // Code view titles
        pythonLikeTitle: 'Abordagem "Python-like" (Sequencial)',
        webgpuShaderTitle: 'Abordagem "PyTorch-like" (WebGPU Shader)',
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
        tabs: [
          { label: 'Demo' },
          { label: 'Code (Benchmark)' }
        ],
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
        // Code view titles
        pythonLikeTitle: '"Python-like" Approach (Sequential)',
        webgpuShaderTitle: '"PyTorch-like" Approach (WebGPU Shader)',
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
