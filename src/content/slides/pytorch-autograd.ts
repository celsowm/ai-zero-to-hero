import { defineSlide } from './_factory';

export const pytorchAutograd = defineSlide({
  id: 'pytorch-autograd',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Autograd: o que é, por que esse nome, e como entra no treino',
      body: `No slide "força bruta" da regressão linear, implementamos o backward manualmente com derivadas de sigmoid e atualização de pesos na unha. No PyTorch, **todo esse trabalho manual vira uma chamada só**: \`loss.backward()\`.

Ponte com os slides anteriores: no bloco de regressão, o alvo escalar era minimizado com **MSE**; aqui no LM, o papel continua igual (gerar sinal para backward), mas o critério típico vira **CE (cross-entropy)** por token.

**Autograd** = *automatic differentiation* (diferenciação automática). O nome é direto: **auto**matic **grad**ient — o motor calcula gradientes sozinho, sem você derivar nada à mão.

Imagine que cada operação matemática que você faz (soma, multiplicação, ReLU) é anotada em um **"caderno" secreto** pelo PyTorch:

- **No Forward:** ele registra o que foi feito.
- **No Backward:** ele lê esse caderno de trás para frente e aplica a **Regra da Cadeia** automaticamente para calcular todos os gradientes.

Mini caso operacional:
- sem \`zero_grad()\`, o passo 2 soma gradiente do passo 1.
- com \`zero_grad()\`, cada backward representa só o batch atual.

Sem Autograd, você teria que derivar e implementar manualmente o backward de cada operação — exatamente como fizemos no exemplo manual.`,
    },
    'en-us': {
      title: 'Autograd: what it is, why this name, and where it enters training',
      body: `In the "brute force" linear regression slide, we implemented backward manually with sigmoid derivatives and weight updates by hand. In PyTorch, **all that manual work becomes a single call**: \`loss.backward()\`.

Bridge to earlier slides: in the regression block, the scalar objective was minimized with **MSE**; here in LM, the role is the same (produce backward signal), but the typical criterion becomes per-token **CE (cross-entropy)**.

**Autograd** = *automatic differentiation*. The name says it all: **auto**matic **grad**ient — the engine computes gradients on its own, no manual derivation needed.

Imagine that every math operation you perform (addition, multiplication, ReLU) gets annotated in a **"secret notebook"** by PyTorch:

- **On Forward:** it records what was done.
- **On Backward:** it reads that notebook backwards and applies the **Chain Rule** automatically to compute every gradient.

Operational mini-case:
- without \`zero_grad()\`, step 2 accumulates step 1 gradients.
- with \`zero_grad()\`, each backward reflects only the current batch.

Without Autograd, you would need to derive and implement backward for each operation manually — exactly what we did in the manual example.`,
    },
  },
  visual: {
    id: 'pytorch-autograd-3d',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Código' }, { label: 'Mecânica' }],
        codePanel: {
          title: 'Backward mínimo',
          description: 'Snippet reduzido: logits + target + backward. Cada linha do código ganha explicação ancorada abaixo.',
          source: { snippetId: 'pytorch-lm/autograd-step', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 2], content: 'Import torch e a função de cross-entropy — as duas ferramentas mínimas para observar o backward.' },
            { lineRange: [4, 5], content: 'Criamos um tensor 1×3 com `requires_grad=True` e um alvo escalar. Sem `requires_grad`, nenhum gradiente é formado.' },
            { lineRange: [7, 8], content: '`F.cross_entropy` aplica softmax + -log do alvo; `backward()` preenche `logits.grad` pela regra da cadeia.' },
            { lineRange: [10, 11], content: '`loss` é o número a ser minimizado; `logits.grad` mostra quanto cada logit deve descer.' },
          ],
        },
        walkthroughPanel: {
          title: 'Walkthrough do autograd',
          subtitle: 'Cada passo ancora em uma (ou duas) linhas do snippet. Siga a sequência para ver o grafo ganhar vida.',
          steps: [
            {
              label: 'tensor marcado',
              body: 'O flag `requires_grad=True` na linha 4 coloca `logits` no radar do autograd. A partir daqui, toda operação sobre esse tensor será gravada no grafo computacional.',
              risk: 'Esquecer esse flag = `logits.grad` fica `None` após o `backward()`, o que só aparece quando você tenta usar o gradiente e dá erro silencioso.',
              shape: 'shape: [1, 3]',
            },
            {
              label: 'cross_entropy',
              body: 'Na linha 7, `F.cross_entropy` junta softmax e log-likelihood em uma chamada. Para logits `[2.0, 0.5, -1.0]` e `target=0`, o softmax fica ~`[0.785, 0.175, 0.039]` e a loss resulta em ~`0.242`.',
              risk: 'Achar que a loss mede erro em todas as classes — na verdade, CE só olha para o índice do target (classe correta). As outras classes entram no softmax, não na loss.',
              shape: 'loss: 0.242',
            },
            {
              label: 'backward()',
              body: 'Na linha 8, `loss.backward()` aciona o motor. O PyTorch percorre o grafo de trás para frente, aplicando a regra da cadeia em cada nó para distribuir o gradiente até `logits`.',
              risk: 'Chamar `backward()` duas vezes no mesmo grafo sem `retain_graph=True` dá erro — o grafo é descartado após a primeira passagem.',
              shape: 'chain rule',
            },
            {
              label: 'logits.grad',
              body: 'Na linha 11, `logits.grad` está preenchido. Para CE + softmax, a fórmula cai em `grad = softmax - one_hot(target)`. Resultado: `[-0.215, 0.175, 0.039]`. O sinal negativo no índice do alvo diz "diminua esse logit".',
              risk: 'Em loops de treino, esquecer `optimizer.zero_grad()` acumula o gradiente do batch anterior e distorce o update.',
              shape: '[-0.215, 0.175, 0.039]',
            },
          ],
          failureTitle: 'Bugs comuns nesta sequência',
          failureModes: [
            { label: '.grad = None', value: 'Esqueceu `requires_grad=True` ou o tensor saiu do grafo antes da loss.' },
            { label: 'Loss não é escalar', value: '`backward()` exige um número (shape `[]`). Se a loss for vetor, você precisa de `gradient=`.' },
            { label: 'Gradiente acumulado', value: 'Em loops consecutivos, falta `zero_grad()` faz cada batch herdar a sensibilidade do anterior.' },
          ],
          mentalModelTitle: 'Modelo mental em 3 passos',
          mentalModel: [
            '1. `requires_grad` marca o tensor como observável pelo autograd.',
            '2. Cada operação no forward grava uma aresta no grafo.',
            '3. `backward()` percorre essas arestas ao contrário e preenche `.grad`.',
          ],
          footer: 'Regra prática: se `logits.grad` está None, o problema aconteceu antes do `backward()`, não dentro dele.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Mechanics' }],
        codePanel: {
          title: 'Minimal backward pass',
          description: 'Reduced snippet: logits + target + backward. Every line gets a grounded explanation below.',
          source: { snippetId: 'pytorch-lm/autograd-step', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 2], content: 'Import torch and the cross-entropy function — the two minimal tools needed to observe backward.' },
            { lineRange: [4, 5], content: 'We create a 1×3 tensor with `requires_grad=True` and a scalar target. Without `requires_grad`, no gradient is formed.' },
            { lineRange: [7, 8], content: '`F.cross_entropy` applies softmax + -log of the target; `backward()` fills `logits.grad` via the chain rule.' },
            { lineRange: [10, 11], content: '`loss` is the scalar to minimize; `logits.grad` shows how much each logit must move down.' },
          ],
        },
        walkthroughPanel: {
          title: 'Autograd walkthrough',
          subtitle: 'Each step is anchored in one (or two) lines of the snippet. Follow the sequence to see the graph come alive.',
          steps: [
            {
              label: 'marked tensor',
              body: 'The `requires_grad=True` flag on line 4 puts `logits` on autograd\'s radar. From here, every operation on this tensor is recorded in the computational graph.',
              risk: 'Forgetting this flag leaves `logits.grad` as `None` after `backward()` — only surfacing when you try to use the gradient.',
              shape: 'shape: [1, 3]',
            },
            {
              label: 'cross_entropy',
              body: 'On line 7, `F.cross_entropy` bundles softmax and log-likelihood. For logits `[2.0, 0.5, -1.0]` and `target=0`, softmax is ~`[0.785, 0.175, 0.039]` and the loss comes out to ~`0.242`.',
              risk: 'Thinking loss sees all classes — in fact, CE only looks at the target index (correct class). The other classes enter softmax, not loss.',
              shape: 'loss: 0.242',
            },
            {
              label: 'backward()',
              body: 'On line 8, `loss.backward()` triggers the engine. PyTorch walks the graph from output to inputs, applying the chain rule at each node to distribute gradient back to `logits`.',
              risk: 'Calling `backward()` twice on the same graph (without `retain_graph=True`) errors out — the graph is freed after the first pass.',
              shape: 'chain rule',
            },
            {
              label: 'logits.grad',
              body: 'On line 11, `logits.grad` is filled. For CE + softmax, the formula collapses to `grad = softmax - one_hot(target)`. Result: `[-0.215, 0.175, 0.039]`. The negative signal at the target index says "lower this logit".',
              risk: 'In training loops, forgetting `optimizer.zero_grad()` lets the previous batch\'s gradient accumulate and distort the update.',
              shape: '[-0.215, 0.175, 0.039]',
            },
          ],
          failureTitle: 'Common bugs in this sequence',
          failureModes: [
            { label: '.grad = None', value: '`requires_grad=True` was missing or the tensor left the graph before the loss.' },
            { label: 'Loss not scalar', value: '`backward()` requires a scalar (shape `[]`). If loss is a vector, you need the `gradient=` argument.' },
            { label: 'Accumulated gradient', value: 'In successive loops, missing `zero_grad()` makes each batch inherit the previous batch\'s sensitivity.' },
          ],
          mentalModelTitle: 'Mental model in 3 steps',
          mentalModel: [
            '1. `requires_grad` marks the tensor as observable by autograd.',
            '2. Each operation in the forward pass records an edge in the graph.',
            '3. `backward()` walks those edges backwards and fills `.grad`.',
          ],
          footer: 'Practical rule: if `logits.grad` is None, the bug happened before `backward()`, not inside it.',
        },
      },
    },
  },
});
