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

Neste primeiro exemplo usamos \`SGD\` de propósito: ele é a regra mais transparente. No próximo slide, \`AdamW\` entra como uma regra de passo mais usada na prática, não como um conceito novo.

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

This first example uses \`SGD\` on purpose: it is the most transparent update rule. In the next slide, \`AdamW\` appears as a more practical step rule, not as a new concept.

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
            { lineRange: [1, 6], content: 'Criamos peso treinável, alvo e optimizer para isolar a ideia central: ajustar parâmetro para reduzir erro.' },
            { lineRange: [7, 12], content: 'A loss mede erro, `backward()` gera gradiente e `step()` aplica o update; depois `zero_grad()` limpa para o próximo ciclo.' },
            { lineRange: [13, 15], content: 'No fim, imprimimos loss e peso atualizado para verificar que o parâmetro realmente se moveu.' },
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
            { lineRange: [1, 6], content: 'We create a trainable weight, target, and optimizer to isolate the core idea: adjust parameters to reduce error.' },
            { lineRange: [7, 12], content: 'Loss measures error, `backward()` creates gradients, and `step()` applies the update; then `zero_grad()` resets for the next cycle.' },
            { lineRange: [13, 15], content: 'Finally, we print loss and updated weight to confirm the parameter actually moved.' },
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
