import { defineSlide } from './_factory';

export const neuralNetworkPytorchOptimizers = defineSlide({
  id: 'neural-network-pytorch-optimizers',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: 'SGD, AdamW e o loop certo',
      body: `Depois de entender o SGD como regra direta (peso novo = peso velho − lr × gradiente), vamos para o AdamW, que é o otimizador mais usado em redes neurais modernas.

**AdamW significa:**

**Adam + W**

Onde:

**Adam** = **A**daptive **M**oment **E**stimation (estimação adaptativa de momentos).

O Adam usa duas médias:
- média dos gradientes (momentum)
- média dos gradientes ao quadrado (escala adaptativa)

O **W** vem de **W**eight **D**ecay, ou **decaimento de pesos**: uma penalização que empurra pesos muito grandes para valores menores.

Então: **AdamW = Adam com decaimento de pesos desacoplado**.

A diferença do nome é que o AdamW aplica o parâmetro \`weight_decay\` (decaimento de pesos) separado da atualização principal do Adam, o que costuma funcionar melhor em deep learning moderno.

Na prática, muitas vezes ele dá passos mais "inteligentes" e costuma convergir mais rápido, especialmente em redes neurais modernas.

Com o mesmo lr = 0.01, ele pode mudar os valores mais agressivamente do que o SGD.

**Comparação simples:**

| Otimizador | Como aprende | Vantagem | Desvantagem |
|---|---|---|---|
| SGD | Usa o gradiente direto | Simples, estável, bom para generalização | Pode ser lento |
| AdamW | Usa estatísticas dos gradientes | Converge rápido, bom padrão para deep learning | Pode precisar de cuidado com lr e \`weight_decay\` (decaimento de pesos) |

Para treino de modelos hoje, especialmente **transformers, CNNs e redes maiores**, AdamW costuma ser a escolha padrão. Para casos simples ou quando você quer controle máximo e boa generalização, SGD ainda é muito usado, normalmente com momentum.

O código ao lado mostra os dois lado a lado com os mesmos logits iniciais e mesmo lr.`,
    },
    'en-us': {
      title: 'SGD, AdamW, and the right loop',
      body: `After understanding SGD as a direct rule (new weight = old weight − lr × gradient), let's move to AdamW, the most widely used optimizer in modern neural networks.

**AdamW stands for:**

**Adam + W**

Where:

**Adam** = **A**daptive **M**oment **E**stimation.

Adam uses two moving averages:
- average of past gradients (momentum)
- average of squared gradients (adaptive scale)

The **W** stands for **W**eight **D**ecay.

So: **AdamW = Adam with decoupled Weight Decay**.

The key difference is that AdamW applies weight\_decay separately from Adam's main update, which tends to work better in modern deep learning.

In practice, it often takes more "intelligent" steps and tends to converge faster, especially in modern neural networks.

With the same lr = 0.01, it can change values more aggressively than SGD.

**Simple comparison:**

| Optimizer | How it learns | Advantage | Disadvantage |
|---|---|---|---|
| SGD | Uses gradient directly | Simple, stable, good generalization | Can be slow |
| AdamW | Uses gradient statistics | Fast convergence, good deep learning default | May need careful lr and weight\_decay tuning |

For training models today, especially **transformers, CNNs, and larger networks**, AdamW is the standard choice. For simple cases or when you want maximum control and good generalization, SGD is still widely used, typically with momentum.

The code on the right shows both side by side with the same initial logits and same lr.`,
    },
  },
  visual: {
    id: 'optimizer-comparison-chart',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Código' }, { label: 'Comparação' }],
        codePanel: {
          title: 'SGD vs AdamW na prática',
          description: 'Mesmos logits iniciais, mesmo target, mesmo lr — compare o resultado de cada otimizador.',
          source: { snippetId: 'pytorch-lm/optimizers-comparison', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 4], content: 'Importamos as bibliotecas e definimos o target fixo que servirá de referência para ambos os otimizadores.' },
            { lineRange: [6, 13], content: 'Configuramos SGD com logits e learning rate: o passo é direto — gradiente vezes lr.' },
            { lineRange: [15, 17], content: 'SGD já executou: loss e logits impressos mostram o resultado de um único passo com a regra simples.' },
            { lineRange: [20, 27], content: 'AdamW parte dos mesmos logits iniciais e mesmo lr, mas usa estatísticas internas — o resultado final costuma ser diferente do SGD, mesmo na primeira iteração.' },
            { lineRange: [29, 31], content: 'Resultado do AdamW: loss e logits após o primeiro passo, mostrando na prática a diferença entre as regras de update.' },
          ],
        },
        eyebrow: 'Comparação visual',
        title: 'SGD × AdamW',
        description: 'Duas colunas, duas animações: caminho até o mínimo e queda da loss durante o treino.',
        restartLabel: 'Reiniciar animações',
        sgdBullets: [
          'Usa o gradiente atual de forma simples.',
          'Pode ser mais lento, mas é fácil de entender.',
          'Com momentum, fica mais estável em muitos casos.',
        ],
        adamwBullets: [
          'Ajusta o passo por parâmetro automaticamente.',
          'Costuma convergir rápido em redes modernas.',
          'É muito usado em transformers e modelos grandes.',
        ],
        summaryTitle: 'Resumo rápido',
        summaryText: 'SGD segue o gradiente de maneira direta. AdamW usa médias dos gradientes, ajusta o tamanho do passo por parâmetro e aplica decaimento de pesos separado da atualização adaptativa.',
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Comparison' }],
        codePanel: {
          title: 'SGD vs AdamW in practice',
          description: 'Same initial logits, same target, same lr — compare each optimizer\'s outcome.',
          source: { snippetId: 'pytorch-lm/optimizers-comparison', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 4], content: 'Import libraries and define a fixed target that will serve as reference for both optimizers.' },
            { lineRange: [6, 13], content: 'Configure SGD with logits and learning rate: the step is direct — gradient times lr.' },
            { lineRange: [15, 17], content: 'SGD has already stepped: printed loss and logits show the result of a single step with the simple rule.' },
            { lineRange: [20, 27], content: 'AdamW starts from the same initial logits and same lr, but uses internal statistics — the result often differs from SGD even on the first iteration.' },
            { lineRange: [29, 31], content: 'AdamW result: loss and logits after the first step, showing the practical difference between update rules.' },
          ],
        },
        eyebrow: 'Visual comparison',
        title: 'SGD × AdamW',
        description: 'Two columns, two animations: path to the minimum and loss drop during training.',
        restartLabel: 'Restart animations',
        sgdBullets: [
          'Uses the current gradient in a simple way.',
          'Can be slower, but is easy to understand.',
          'With momentum, it becomes more stable in many cases.',
        ],
        adamwBullets: [
          'Adjusts the step per parameter automatically.',
          'Often converges faster in modern networks.',
          'Widely used in transformers and large models.',
        ],
        summaryTitle: 'Quick summary',
        summaryText: 'SGD follows the gradient directly. AdamW uses gradient averages, adjusts step size per parameter, and applies weight decay separately from the adaptive update.',
      },
    },
  },
});
