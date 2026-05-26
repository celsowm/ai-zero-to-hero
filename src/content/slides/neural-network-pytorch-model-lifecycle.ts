import { defineSlide } from './_factory';

export const neuralNetworkPytorchModelLifecycle = defineSlide({
  id: 'neural-network-pytorch-model-lifecycle',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Ciclo de vida do modelo',
      body: `Nos slides anteriores, discutimos otimizadores — como \`AdamW\` ajusta pesos quando existe um loop de treino. Agora entra uma separação importante: **modo do modelo**, **rastreamento de gradiente** e **atualização de pesos** são coisas diferentes em PyTorch.

Contrato de ciclo de vida:
1. **\`model.train()\`**: coloca algumas camadas em comportamento de treino.
2. **\`model.eval()\`**: coloca essas camadas em comportamento de avaliação. Não congela pesos.
3. **\`torch.no_grad()\`**: desliga o rastreamento do autograd naquele bloco.
4. **\`optimizer.step()\`**: é o que realmente altera parâmetros depois do \`backward()\`.
5. **checkpoint**: salva pesos e, no treino, também pode salvar otimizador, época e outros estados.

Dois exemplos comuns: **Dropout** é uma camada que, durante o treino, zera aleatoriamente parte das ativações para reduzir overfitting (quando o modelo memoriza demais o treino e generaliza pior). **BatchNorm** é uma camada que normaliza ativações usando estatísticas do lote. Na prática, \`eval()\` deixa a inferência mais previsível: Dropout para de sortear unidades, e BatchNorm passa a usar estatísticas acumuladas em vez das estatísticas do lote atual.

O que muda de verdade:
- \`train()\` não atualiza peso sozinho; só muda o comportamento de algumas camadas.
- \`eval()\` não é \`requires_grad=False\`; parâmetros continuam treináveis se você fizer \`backward()\`.
- \`no_grad()\` não muda o modo do modelo; só evita construir grafo.
- congelar pesos é outra operação: mudar \`param.requires_grad\` ou tirar parâmetros do otimizador.

Erro recorrente:
- tratar \`eval()\` como congelamento de pesos.
- avaliar com dropout ainda ativo e culpar "instabilidade".
- inferir sem \`no_grad()\` e gastar memória sem necessidade.`,
    },
    'en-us': {
      title: 'Model lifecycle',
      body: `In the preceding slides we covered optimizers — how \`AdamW\` updates weights when there is a training loop. Now the important separation is: **model mode**, **gradient tracking**, and **parameter updates** are different things in PyTorch.

Lifecycle contract:
1. **\`model.train()\`**: puts some layers in training behavior.
2. **\`model.eval()\`**: puts those layers in evaluation behavior. It does not freeze weights.
3. **\`torch.no_grad()\`**: disables autograd tracking inside that block.
4. **\`optimizer.step()\`**: actually changes parameters after \`backward()\`.
5. **checkpointing**: saves weights and, during training, can also save optimizer, epoch, and other state.

Two common examples: **Dropout** is a layer that randomly zeros part of the activations during training to reduce overfitting (when the model memorizes training data too much and generalizes worse). **BatchNorm** is a layer that normalizes activations using batch statistics. In practice, \`eval()\` makes inference more predictable: Dropout stops randomly zeroing units, and BatchNorm uses stored running statistics instead of the current batch statistics.

What really changes:
- \`train()\` does not update weights by itself; it only changes the behavior of some layers.
- \`eval()\` is not \`requires_grad=False\`; parameters remain trainable if you run \`backward()\`.
- \`no_grad()\` does not change model mode; it only avoids graph construction.
- freezing weights is a separate operation: changing \`param.requires_grad\` or removing parameters from the optimizer.

Recurring mistakes:
- treating \`eval()\` as weight freezing.
- evaluating with dropout still active then blaming model instability.
- inferring without \`no_grad()\` and wasting memory.`,
    },
  },
  visual: {
    id: 'pytorch-execution-pipeline',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Código' }, { label: 'Estados' }],
        codePanel: {
          title: 'Mudança de modo em código',
          description: 'Mesmo modelo, duas decisões separadas: modo de treino/avaliação e rastreamento de gradiente.',
          source: { snippetId: 'pytorch-lm/model-lifecycle', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 5], content: 'Criamos um modelo simples com Dropout, uma camada que zera aleatoriamente ativações durante o treino, e um lote fictício para testar o forward.' },
            { lineRange: [6, 10], content: '`model.train()` ativa o comportamento de treino do Dropout. O tensor de saída ainda rastreia gradiente porque não estamos em `no_grad()`.' },
            { lineRange: [12, 16], content: '`model.eval()` muda o comportamento das camadas, e `torch.no_grad()` desliga o rastreamento do autograd para esta inferência.' },
            { lineRange: [18, 18], content: 'As formas das saídas são iguais; o que muda é o estado operacional usado para produzir essas saídas.' },
          ],
        },
        pipelinePanel: {
          title: 'Três controles separados',
          subtitle: 'Modo do modelo, autograd e atualização de pesos costumam aparecer juntos no treino, mas não são a mesma coisa.',
          steps: [
            { label: 'train()', body: 'Liga comportamento de treino em camadas que mudam entre treino e avaliação.', risk: 'Não chama `backward()`, não muda pesos e não é sinônimo de “treinar”.' },
            { label: 'eval()', body: 'Liga comportamento de avaliação: Dropout deixa de zerar ativações e BatchNorm usa estatísticas acumuladas.', risk: 'Não congela parâmetros. O nome correto é modo de avaliação, não congelamento.' },
            { label: 'no_grad()', body: 'Pede ao autograd para não montar grafo naquele bloco de código.', risk: 'Não troca `train()` por `eval()`; se Dropout estiver ativo, continua ativo.' },
            { label: 'backward()', body: 'Calcula gradientes para tensores que participam do grafo e têm `requires_grad=True`.', risk: 'Gradiente calculado ainda não atualiza peso sozinho.' },
            { label: 'optimizer.step()', body: 'Aplica os gradientes aos parâmetros registrados no otimizador.', risk: 'Parâmetros fora do otimizador, ou com gradiente bloqueado, não são atualizados.' },
          ],
          failureTitle: 'Falhas recorrentes',
          failureModes: [
            { label: 'Confundir com freeze', value: '`eval()` só muda comportamento de algumas camadas; congelar pesos é `requires_grad=False` ou ajuste no otimizador.' },
            { label: 'Avaliação ruidosa', value: 'Dropout ativo por falta de `eval()` pode variar saídas entre passes.' },
            { label: 'Memória alta', value: 'Inferência sem `no_grad()` constrói grafo sem necessidade.' },
          ],
          mentalModelTitle: 'Leitura mental',
          mentalModel: [
            'Modo do modelo decide como camadas sensíveis ao modo se comportam.',
            'Autograd decide se o grafo será guardado para derivadas.',
            'Otimizador decide quais parâmetros recebem update.',
          ],
          footer: 'Para inferência comum, use `model.eval()` junto com `torch.no_grad()`.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'States' }],
        codePanel: {
          title: 'Mode switching in code',
          description: 'Same model, two separate decisions: train/eval mode and gradient tracking.',
          source: { snippetId: 'pytorch-lm/model-lifecycle', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 5], content: 'We build a tiny model with Dropout, a layer that randomly zeros activations during training, and a dummy batch to test the forward pass.' },
            { lineRange: [6, 10], content: '`model.train()` enables Dropout training behavior. The output tensor still tracks gradients because we are not inside `no_grad()`.' },
            { lineRange: [12, 16], content: '`model.eval()` changes layer behavior, and `torch.no_grad()` disables autograd tracking for this inference.' },
            { lineRange: [18, 18], content: 'The output shapes are the same; what changes is the operational state used to produce them.' },
          ],
        },
        pipelinePanel: {
          title: 'Three separate controls',
          subtitle: 'Model mode, autograd, and parameter updates usually appear together in training, but they are not the same thing.',
          steps: [
            { label: 'train()', body: 'Enables training behavior in layers that change between training and evaluation.', risk: 'It does not call `backward()`, does not update weights, and is not the same as “training”.' },
            { label: 'eval()', body: 'Enables evaluation behavior: Dropout stops zeroing activations and BatchNorm uses stored statistics.', risk: 'It does not freeze parameters. The precise name is evaluation mode, not freezing.' },
            { label: 'no_grad()', body: 'Tells autograd not to build a graph inside that block of code.', risk: 'It does not replace `train()` with `eval()`; active Dropout stays active.' },
            { label: 'backward()', body: 'Computes gradients for tensors in the graph that have `requires_grad=True`.', risk: 'Computed gradients still do not update weights by themselves.' },
            { label: 'optimizer.step()', body: 'Applies gradients to parameters registered in the optimizer.', risk: 'Parameters outside the optimizer, or with gradient tracking blocked, are not updated.' },
          ],
          failureTitle: 'Recurring failures',
          failureModes: [
            { label: 'Confusing eval with freeze', value: '`eval()` only changes the behavior of some layers; freezing weights is `requires_grad=False` or an optimizer change.' },
            { label: 'Noisy evaluation', value: 'Dropout left active because `eval()` is missing can vary outputs between passes.' },
            { label: 'High memory', value: 'Inference without `no_grad()` builds a graph unnecessarily.' },
          ],
          mentalModelTitle: 'Mental model',
          mentalModel: [
            'Model mode decides how mode-sensitive layers behave.',
            'Autograd decides whether the graph is kept for derivatives.',
            'The optimizer decides which parameters receive updates.',
          ],
          footer: 'For ordinary inference, use `model.eval()` together with `torch.no_grad()`.',
        },
      },
    },
  },
});
