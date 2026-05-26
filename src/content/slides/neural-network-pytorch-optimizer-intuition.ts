import { defineSlide } from './_factory';

export const neuralNetworkPytorchOptimizerIntuition = defineSlide({
  id: 'neural-network-pytorch-optimizer-intuition',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: 'O que é otimizador, sem mistério',
      body: `Otimizador é o componente que transforma erro em **mudança concreta de parâmetro**.

Sem ele, o modelo até calcula gradiente, mas nada se move.
Com ele, cada ciclo de treino executa: medir erro -> calcular direção -> aplicar passo.

Leitura operacional do update:
1. \`loss\` diz "quão errado" o modelo está no batch atual
2. \`backward()\` escreve em \`.grad\` a direção de correção por parâmetro
3. \`step()\` aplica deslocamento usando essa direção (escala controlada pelo learning rate)
4. \`zero_grad()\` limpa o buffer para o próximo batch

Forma mental útil (sem entrar em cálculo pesado):
- gradiente define **para onde** andar;
- learning rate define **o tamanho do passo**;
- optimizer executa o movimento em cada peso.

Neste primeiro exemplo usamos \`SGD\` (Stochastic Gradient Descent) de propósito: ele é a regra mais simples e transparente — o peso novo é simplesmente o peso antigo menos (learning rate × gradiente). Não há momentum, adaptação por parâmetro nem termo de regularização embutido. No próximo slide, \`AdamW\` entra como uma regra de passo mais usada na prática, não como um conceito novo.

Checklist mínimo de ordem:
1. calcular a \`loss\` (erro atual)
2. \`backward()\` para gerar \`.grad\`
3. \`step()\` para atualizar os parâmetros
4. \`zero_grad()\` para não acumular lixo de batch anterior

Sem "magia": optimizer não inventa sinal.
Ele só converte gradiente em update coerente.`,
    },
    'en-us': {
      title: 'What an optimizer is, without mystery',
      body: `An optimizer is the component that turns error into **actual parameter movement**.

Without it, gradients may exist but weights do not move.
With it, each training cycle does: measure error -> compute direction -> apply step.

Operational reading of the update:
1. \`loss\` says how wrong the model is on the current batch
2. \`backward()\` writes correction direction into per-parameter \`.grad\`
3. \`step()\` applies displacement using that direction (scale controlled by learning rate)
4. \`zero_grad()\` clears buffers for the next batch

Useful mental form (without heavy math):
- gradient defines **where to move**;
- learning rate defines **how far to move**;
- optimizer executes that movement per parameter.

This first example uses \`SGD\` (Stochastic Gradient Descent) on purpose: it is the simplest, most transparent update rule — new weight is simply old weight minus (learning rate × gradient). No momentum, no per-parameter adaptation, no built-in regularization. In the next slide, \`AdamW\` appears as a more practical step rule, not as a new concept.

Minimum order checklist:
1. compute \`loss\` (current error)
2. \`backward()\` to generate \`.grad\`
3. \`step()\` to update parameters
4. \`zero_grad()\` to avoid stale accumulation

No magic: optimizer does not invent signal.
It converts gradient signal into coherent updates.`,
    },
  },
  visual: {
    id: 'pytorch-execution-pipeline',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Código' }, { label: 'Mapa' }, { label: 'Simulador' }],
        codePanel: {
          title: 'Fluxo mínimo de atualização',
          description: 'Exemplo enxuto: erro, gradiente, ajuste.',
          source: { snippetId: 'pytorch-lm/optimizer-intuition', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 2], content: 'Importamos o PyTorch base e o submódulo `nn`, que fornece os blocos de construção de redes neurais (camadas, funções de loss, inicializadores).' },
            { lineRange: [4, 4], content: 'Criamos um tensor escalar `w = 0.0` com `requires_grad=True`, que é a única variável que o SGD vai ajustar. Marcar como treinável é o que permite ao autograd rastrear operações e depois preencher `.grad`.' },
            { lineRange: [5, 5], content: 'Definimos o valor alvo como 2.0. O objetivo do treino é que `w` se aproxime de `target` — ou seja, que o peso aprenda a predizer o valor 2.0.' },
            { lineRange: [6, 6], content: 'Instanciamos o `SGD` passando a lista de parâmetros `[w]` e o learning rate 0.1. O SGD vai executar a regra: `w = w − lr × grad` sempre que chamarmos `step()`.' },
            { lineRange: [8, 8], content: 'Calculamos a loss como erro quadrático médio (MSE) entre w e target. Essa loss é o sinal escalar que `backward()` vai propagar para gerar gradiente.' },
            { lineRange: [9, 9], content: '`loss.backward()` percorre o grafo computacional a partir da loss e preenche `w.grad` com a derivada parcial dLoss/dw. Sem esse passo, `.grad` é `None` e o optimizer não tem direção para onde mover.' },
            { lineRange: [11, 11], content: '`optimizer.step()` lê `w.grad` e aplica a regra do SGD: subtrai `lr × grad` de cada parâmetro. Aqui: `w = 0.0 − 0.1 × (-4.0) = 0.4`. O peso se moveu.' },
            { lineRange: [12, 12], content: '`optimizer.zero_grad()` zera `w.grad` de volta para 0. Isso é essencial: sem limpeza, o gradiente do próximo batch somaria com o atual, distorcendo o update.' },
            { lineRange: [14, 15], content: 'Imprimimos a loss (que caiu de 4.0 para ~2.56) e o novo peso (0.4). A queda da loss confirma que o SGD moveu o peso na direção certa, mesmo que ainda longe do alvo 2.0.' },
          ],
        },
        interactivePanel: {
          title: 'Simulador de update',
          subtitle: 'Ajuste peso, alvo e learning rate para ver quando um único `step()` melhora ou piora a loss.',
          weightLabel: 'Peso atual (w)',
          targetLabel: 'Alvo',
          learningRateLabel: 'Learning rate',
          gradientLabel: 'Gradiente (dLoss/dw)',
          stepSizeLabel: 'Tamanho do passo (lr * grad)',
          updatedWeightLabel: 'Peso após step',
          lossBeforeLabel: 'Loss antes',
          lossAfterLabel: 'Loss depois',
          interpretationTitle: 'Leitura operacional',
          interpretationBullets: [
            'Sinal do gradiente define direção do update.',
            'Learning rate controla o quanto o peso se desloca em um único step.',
            'Se a loss depois do step sobe, escala/direção estão ruins para este ponto.',
          ],
        },
        pipelinePanel: {
          title: 'Erro -> sinal -> ajuste',
          subtitle: 'Modelo mental robusto: separar claramente erro, direção e tamanho de passo.',
          steps: [
            { label: 'Erro (loss)', body: 'A loss condensa o desvio do batch em um escalar que vira alvo de minimização.', risk: 'Sem loss confiável, todo update vira chute orientado por sinal ruim.' },
            { label: 'Direção (grad)', body: '`backward()` propaga esse erro e preenche `.grad` com direção por parâmetro.', risk: 'Gradiente velho ou ausente faz o optimizer atuar sem referência do batch atual.' },
            { label: 'Escala (lr)', body: 'Learning rate controla o tamanho do deslocamento aplicado em cada parâmetro.', risk: 'LR alta demais oscila/diverge; LR baixa demais quase não move e parece treino travado.' },
            { label: 'Movimento (step)', body: '`step()` executa o update real nos pesos com base em gradiente + escala.', risk: 'Chamar `step()` fora de ordem gera movimento cego, não aprendizado acumulado.' },
          ],
          failureTitle: 'Erros comuns',
          failureModes: [
            { label: 'Loss sem diagnóstico', value: 'A loss não é monitorada por passo/época, então o time não vê se update ajuda ou piora.' },
            { label: 'Update cego', value: 'Executar `step()` sem gradiente atualizado do batch atual.' },
            { label: 'Escala ruim', value: 'Learning rate incompatível com a tarefa faz o treino oscilar ou andar devagar demais.' },
            { label: 'Loop sem limpeza', value: 'Esquecer `zero_grad()` mistura sinais de batches e distorce o update.' },
          ],
          mentalModelTitle: 'Modelo mental',
          mentalModel: [
            'Loss diz "quanto errou".',
            'Gradiente diz "para onde corrigir".',
            'Learning rate diz "quanto andar".',
            'Optimizer aplica o movimento real no parâmetro.',
          ],
          footer: 'No próximo slide, trocamos SGD por AdamW e mantemos a mesma pergunta: o gradiente certo chegou ao step certo?',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Map' }, { label: 'Simulator' }],
        codePanel: {
          title: 'Minimum update flow',
          description: 'Lean example: error, gradient, adjustment.',
          source: { snippetId: 'pytorch-lm/optimizer-intuition', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 2], content: 'Import base PyTorch and the `nn` submodule, which provides neural network building blocks (layers, loss functions, initializers).' },
            { lineRange: [4, 4], content: 'Create a scalar tensor `w = 0.0` with `requires_grad=True` — the only variable SGD will adjust. Marking it trainable lets autograd track operations and later fill `.grad`.' },
            { lineRange: [5, 5], content: 'Define the target value as 2.0. The training goal is for `w` to approach `target` — i.e. the weight learns to predict the value 2.0.' },
            { lineRange: [6, 6], content: 'Instantiate `SGD` with the parameter list `[w]` and learning rate 0.1. SGD will execute: `w = w − lr × grad` whenever we call `step()`.' },
            { lineRange: [8, 8], content: 'Compute the loss as mean squared error (MSE) between w and target. This scalar signal is what `backward()` will propagate to produce a gradient.' },
            { lineRange: [9, 9], content: '`loss.backward()` traverses the computation graph from the loss and fills `w.grad` with the partial derivative dLoss/dw. Without this, `.grad` is `None` and the optimizer has no direction to move.' },
            { lineRange: [11, 11], content: '`optimizer.step()` reads `w.grad` and applies the SGD rule: subtracts `lr × grad` from each parameter. Here: `w = 0.0 − 0.1 × (-4.0) = 0.4`. The weight moved.' },
            { lineRange: [12, 12], content: '`optimizer.zero_grad()` resets `w.grad` to 0. This is essential: without clearing, the next batch\'s gradient would accumulate on top of the current one, distorting the update.' },
            { lineRange: [14, 15], content: 'Print the loss (which dropped from 4.0 to ~2.56) and the new weight (0.4). The loss drop confirms SGD moved the weight in the right direction, even though it is still far from target 2.0.' },
          ],
        },
        interactivePanel: {
          title: 'Update simulator',
          subtitle: 'Adjust weight, target, and learning rate to see when one `step()` improves or worsens loss.',
          weightLabel: 'Current weight (w)',
          targetLabel: 'Target',
          learningRateLabel: 'Learning rate',
          gradientLabel: 'Gradient (dLoss/dw)',
          stepSizeLabel: 'Step size (lr * grad)',
          updatedWeightLabel: 'Weight after step',
          lossBeforeLabel: 'Loss before',
          lossAfterLabel: 'Loss after',
          interpretationTitle: 'Operational reading',
          interpretationBullets: [
            'Gradient sign defines update direction.',
            'Learning rate controls how far weight moves in one step.',
            'If loss after step rises, scale/direction are poor for this point.',
          ],
        },
        pipelinePanel: {
          title: 'Error -> signal -> adjustment',
          subtitle: 'Robust mental model: separate error, direction, and step size.',
          steps: [
            { label: 'Error (loss)', body: 'Loss compresses batch deviation into one scalar optimization target.', risk: 'Without a reliable loss, updates are guided by noisy or misleading objectives.' },
            { label: 'Direction (grad)', body: '`backward()` propagates error and fills `.grad` with per-parameter direction.', risk: 'Stale or missing gradients make optimizer actions unrelated to the current batch.' },
            { label: 'Scale (lr)', body: 'Learning rate controls update magnitude on each parameter.', risk: 'Too high causes oscillation/divergence; too low makes training appear stuck.' },
            { label: 'Movement (step)', body: '`step()` performs the actual parameter update from direction + scale.', risk: 'Calling `step()` out of order produces blind motion instead of accumulated learning.' },
          ],
          failureTitle: 'Common mistakes',
          failureModes: [
            { label: 'Unread loss', value: 'Loss is not tracked per step/epoch, so update quality remains invisible.' },
            { label: 'Blind update', value: 'Calling `step()` without updated gradients from current batch.' },
            { label: 'Bad scale', value: 'Incompatible learning rate makes training oscillate or move too slowly.' },
            { label: 'No cleanup', value: 'Forgetting `zero_grad()` mixes signals across batches and distorts updates.' },
          ],
          mentalModelTitle: 'Mental model',
          mentalModel: [
            'Loss says "how wrong".',
            'Gradient says "where to correct".',
            'Learning rate says "how far to move".',
            'Optimizer performs the actual parameter movement.',
          ],
          footer: 'In the next slide, we swap SGD for AdamW and keep the same question: did the right gradient reach the right step?',
        },
      },
    },
  },
});
