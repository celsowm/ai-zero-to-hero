import { defineSlide } from './_factory';

export const neuralNetworkPytorchTraining = defineSlide({
  id: 'neural-network-pytorch-training',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: 'Loop de treino para next-token',
      body: `Agora que temos batch deslocado, embedding, linear e logits, fechamos o loop de treino.

Ponte com regressão:
- antes usamos **MSE (Mean Squared Error / Erro Médio Quadrático)** para valor contínuo;
- agora usamos **CE (Cross-Entropy / Entropia Cruzada)** para classificar o próximo token.

Estrutura idêntica em ambos: \`forward → loss → backward → step\`.

Checklist por passo do loop:
1. \`logits = model(x)\` — forward produz placar para todas as posições.
2. \`loss = CE(logits, y)\` — compara logits deslocados com targets deslocados.
3. \`zero_grad()\` — limpa o buffer antes de propagar.
4. \`backward()\` — espalha o sinal de correção.
5. \`step()\` — aplica o ajuste.

Ponte importante: esses \`x/y\` são exatamente o batch deslocado do slide \`pytorch-token-batch\`.
A aba "Grafo" ao lado mostra o DAG 1:1 com cada linha do código.`,
    },
    'en-us': {
      title: 'Training loop for next-token prediction',
      body: `Now that we have the shifted batch, embedding, linear layer and logits, we close the training loop.

Bridge from regression:
- before, we used **MSE (Mean Squared Error)** for continuous-value prediction;
- now, we use **CE (Cross-Entropy)** for next-token classification.

Mechanics are identical in both: \`forward → loss → backward → step\`.

Checklist per loop step:
1. \`logits = model(x)\` — forward produces a score for every position.
2. \`loss = CE(logits, y)\` — compares shifted logits against shifted targets.
3. \`zero_grad()\` — clears buffers before propagation.
4. \`backward()\` — fans out the correction signal.
5. \`step()\` — applies the weight update.

Important bridge: these \`x/y\` tensors are exactly the shifted batch from the \`pytorch-token-batch\` slide.
The "Graph" tab shows the DAG mapped 1:1 to every code line.`,
    },
  },
  visual: {
    id: 'pytorch-training-loop-graph',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Código' }, { label: 'Grafo' }],
        codePanel: {
          title: 'Treino end-to-end mínimo',
          description: 'Batch deslocado, modelo Embedding + Linear, CE, update e uma predição final no mesmo fluxo.',
          source: { snippetId: 'pytorch-lm/lm-training-e2e', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 3], content: 'Importamos PyTorch, camadas e `cross_entropy` para fechar o ciclo de treino.' },
            { lineRange: [5, 11], content: 'Fixamos seed, definimos vocabulário, batch deslocado (`x`,`y`), modelo mínimo e optimizer para um caso real de treino.' },
            { lineRange: [13, 19], content: 'Cada passo do `for`: forward, loss com CE, `zero_grad`, backward, `step` e log da loss.' },
            { lineRange: [21, 26], content: 'No final, inspecionamos uma predição em `no_grad()` para confirmar o pipeline completo: treina e depois infere.' },
          ],
        },
        graphPanel: {
          title: 'Dependências do loop de treino',
          subtitle: 'Cada nó corresponde a uma linha do snippet da aba "Código". Aresta F → B é o loop `for`.',
          nodes: [
            {
              id: 'batch',
              label: 'x, y',
              shape: '(B,T)',
              lineRange: [7, 8],
              body: '`x` e `y` não são arbitrários: `y` é `x` deslocado uma posição — é isso que ensina o modelo a prever o **próximo** token.',
              risk: 'Se `y` não for deslocado, o modelo aprende a copiar a posição errada e a loss cai para o valor errado.',
            },
            {
              id: 'forward',
              label: 'model(x)',
              shape: 'logits (B,T,V)',
              lineRange: [14, 14],
              body: 'O modelo recebe `x` inteiro e produz logits para **todas** as T posições de uma vez (treino em paralelo).',
              risk: 'Esquecer de fazer `logits.view(-1, V)` antes da CE quebra o contrato de shape e o backward falha.',
            },
            {
              id: 'loss',
              label: 'CE(logits, y)',
              shape: 'scalar',
              lineRange: [15, 15],
              body: 'Cross-Entropy compara logits (placar) com `y` (índice do próximo token). Ponte: substitui o MSE que usávamos em regressão.',
              risk: 'Passar o target com shape errado ou sem deslocamento faz a loss medir a coisa errada — parece que o modelo não aprende.',
            },
            {
              id: 'zero_grad',
              label: 'zero_grad()',
              shape: 'buffer = 0',
              lineRange: [16, 16],
              body: 'Zera o gradiente acumulado **antes** de propagar o erro do batch atual.',
              risk: 'Sem isso, o gradiente do batch anterior se soma ao atual e polui a direção do update.',
            },
            {
              id: 'backward',
              label: 'loss.backward()',
              shape: '∂loss/∂w',
              lineRange: [17, 17],
              body: 'Propaga o sinal da loss de volta até cada parâmetro treinável via autograd.',
              risk: 'Chamar `backward()` antes de `zero_grad()` acumula gradientes entre batches e quebra a leitura do update.',
            },
            {
              id: 'step',
              label: 'optimizer.step()',
              shape: 'w ← w - lr·∂',
              lineRange: [18, 18],
              body: 'Aplica o ajuste final nos pesos: é aqui que o modelo efetivamente aprende.',
              risk: 'Chamar `step()` antes de `backward()` significa atualizar pesos com gradiente do passo errado — a loss oscila ou explode.',
            },
          ],
          edges: [
            { from: 'batch', to: 'forward' },
            { from: 'forward', to: 'loss' },
            { from: 'loss', to: 'zero_grad' },
            { from: 'zero_grad', to: 'backward' },
            { from: 'backward', to: 'step' },
            { from: 'step', to: 'forward' },
          ],
          loopLabel: 'loop 4×',
          prevLabel: '← Anterior',
          nextLabel: 'Próximo →',
          stepLabel: 'Nó',
          resetLabel: 'Recomeçar',
          bridgeTitle: 'Ponte MSE → CE',
          bridgeBody: 'Na regressão linear, MSE media quão longe o valor previsto estava do real. No LM, CE mede quão surpreso o modelo fica ao ver o próximo token — mesma lógica de "erro → correção", só a escala muda.',
          failureTitle: 'Bugs que travam o treino',
          failureModes: [
            { label: 'Target sem deslocar', value: 'O batch não foi deslocado como next-token training exige e a loss para de cair.' },
            { label: 'Ordem invertida', value: '`step()` antes de `backward()` ou `zero_grad()` depois — o otimizador atualiza com gradiente velho.' },
            { label: 'Loss plana', value: 'Geralmente é bug de dados, target ou shape, não "modelo ruim". Checar a DAG resolve 90% dos casos.' },
          ],
          footer: 'Diagnóstico rápido: se a loss não cai, volte na DAG e confirme se cada seta está na ordem certa.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Graph' }],
        codePanel: {
          title: 'Minimal end-to-end training',
          description: 'Shifted batch, Embedding + Linear model, CE loss, weight updates, and a final prediction in one flow.',
          source: { snippetId: 'pytorch-lm/lm-training-e2e', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 3], content: 'We import PyTorch, layers, and `cross_entropy` to close the full training cycle.' },
            { lineRange: [5, 11], content: 'We fix the seed, define vocabulary, shifted batch (`x`,`y`), a minimal model, and an optimizer for a real trainable setup.' },
            { lineRange: [13, 19], content: 'Each `for` step: forward, loss with CE, `zero_grad`, backward, `step`, and loss logging.' },
            { lineRange: [21, 26], content: 'At the end, we inspect one prediction under `no_grad()` to confirm the full path: train first, infer next.' },
          ],
        },
        graphPanel: {
          title: 'Training-loop dependencies',
          subtitle: 'Each node maps to a line in the Code tab. Edge F → B is the `for` loop.',
          nodes: [
            {
              id: 'batch',
              label: 'x, y',
              shape: '(B,T)',
              lineRange: [7, 8],
              body: '`x` and `y` are not arbitrary: `y` is `x` shifted by one position — that is what teaches the model to predict the **next** token.',
              risk: 'If `y` is not shifted, the model learns to copy the wrong position and the loss collapses to a wrong value.',
            },
            {
              id: 'forward',
              label: 'model(x)',
              shape: 'logits (B,T,V)',
              lineRange: [14, 14],
              body: 'The model receives the entire `x` and produces logits for **all** T positions in one shot (parallel training).',
              risk: 'Forgetting `logits.view(-1, V)` before CE breaks the shape contract and backward fails.',
            },
            {
              id: 'loss',
              label: 'CE(logits, y)',
              shape: 'scalar',
              lineRange: [15, 15],
              body: 'Cross-Entropy compares logits (score) with `y` (next-token index). Bridge: it replaces the MSE we used for regression.',
              risk: 'Passing the target with wrong shape or without shift makes the loss measure the wrong thing — it looks like the model does not learn.',
            },
            {
              id: 'zero_grad',
              label: 'zero_grad()',
              shape: 'buffer = 0',
              lineRange: [16, 16],
              body: 'Clears the accumulated gradient **before** propagating the current batch error.',
              risk: 'Without this, the previous batch gradient leaks into the current one and pollutes the update direction.',
            },
            {
              id: 'backward',
              label: 'loss.backward()',
              shape: '∂loss/∂w',
              lineRange: [17, 17],
              body: 'Propagates the loss signal back to every trainable parameter via autograd.',
              risk: 'Calling `backward()` before `zero_grad()` accumulates gradients across batches and breaks update interpretation.',
            },
            {
              id: 'step',
              label: 'optimizer.step()',
              shape: 'w ← w - lr·∂',
              lineRange: [18, 18],
              body: 'Applies the final weight adjustment: this is where the model actually learns.',
              risk: 'Calling `step()` before `backward()` means updating weights with the previous step\'s gradient — loss oscillates or explodes.',
            },
          ],
          edges: [
            { from: 'batch', to: 'forward' },
            { from: 'forward', to: 'loss' },
            { from: 'loss', to: 'zero_grad' },
            { from: 'zero_grad', to: 'backward' },
            { from: 'backward', to: 'step' },
            { from: 'step', to: 'forward' },
          ],
          loopLabel: '4× loop',
          prevLabel: '← Previous',
          nextLabel: 'Next →',
          stepLabel: 'Node',
          resetLabel: 'Reset',
          bridgeTitle: 'Bridge MSE → CE',
          bridgeBody: 'In linear regression, MSE measured how far the predicted value was from the truth. In LM, CE measures how surprised the model is by the next token — same "error → correction" logic, just a different scale.',
          failureTitle: 'Bugs that stall training',
          failureModes: [
            { label: 'Unshifted target', value: 'The batch was not shifted the way next-token training requires, and loss stops decreasing.' },
            { label: 'Wrong order', value: '`step()` before `backward()` or `zero_grad()` after — optimizer updates with a stale gradient.' },
            { label: 'Flat loss', value: 'Usually a data, target, or shape bug, not a "weak model". Walking the DAG solves 90% of the cases.' },
          ],
          footer: 'Quick diagnosis: if loss does not fall, walk the DAG and confirm every arrow is in the right order.',
        },
      },
    },
  },
});
