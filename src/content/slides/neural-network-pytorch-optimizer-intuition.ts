import { defineSlide } from './_factory';

export const neuralNetworkPytorchOptimizerIntuition = defineSlide({
  id: 'neural-network-pytorch-optimizer-intuition',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: 'O que e otimizador, sem misterio',
      body: `Otimizador e o componente que transforma erro em **mudanca concreta de parametro**.

Sem ele, o modelo ate calcula gradiente, mas nada se move.
Com ele, cada ciclo de treino executa: medir erro -> calcular direcao -> aplicar passo.

Leitura operacional do update:
1. \`loss\` diz "quao errado" o modelo esta no batch atual
2. \`backward()\` escreve em \`.grad\` a direcao de correcao por parametro
3. \`step()\` aplica deslocamento usando essa direcao (escala controlada pelo learning rate)
4. \`zero_grad()\` limpa o buffer para o proximo batch

Forma mental util (sem entrar em calculo pesado):
- gradiente define **para onde** andar;
- learning rate define **o tamanho do passo**;
- optimizer executa o movimento em cada peso.

Checklist minimo de ordem:
1. calcular a \`loss\` (erro atual)
2. \`backward()\` para gerar \`.grad\`
3. \`step()\` para atualizar os parametros
4. \`zero_grad()\` para nao acumular lixo de batch anterior

Sem "magia": optimizer nao inventa sinal.
Ele so converte gradiente em update coerente.`,
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
        tabs: [{ label: 'Codigo' }, { label: 'Mapa' }],
        codePanel: {
          title: 'Fluxo minimo de atualizacao',
          description: 'Exemplo enxuto: erro, gradiente, ajuste.',
          source: { snippetId: 'pytorch-lm/optimizer-intuition', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 6], content: 'Criamos peso treinavel, alvo e optimizer para isolar a ideia central: ajustar parametro para reduzir erro.' },
            { lineRange: [7, 12], content: 'A loss mede erro, `backward()` gera gradiente e `step()` aplica o update; depois `zero_grad()` limpa para o proximo ciclo.' },
            { lineRange: [13, 15], content: 'No fim, imprimimos loss e peso atualizado para verificar que o parametro realmente se moveu.' },
          ],
        },
        pipelinePanel: {
          title: 'Erro -> sinal -> ajuste',
          subtitle: 'Modelo mental robusto: separar claramente erro, direcao e tamanho de passo.',
          steps: [
            { label: 'Erro (loss)', body: 'A loss condensa o desvio do batch em um escalar que vira alvo de minimizacao.', risk: 'Sem loss confiavel, todo update vira chute orientado por sinal ruim.' },
            { label: 'Direcao (grad)', body: '`backward()` propaga esse erro e preenche `.grad` com direcao por parametro.', risk: 'Gradiente velho ou ausente faz o optimizer atuar sem referencia do batch atual.' },
            { label: 'Escala (lr)', body: 'Learning rate controla o tamanho do deslocamento aplicado em cada parametro.', risk: 'LR alta demais oscila/diverge; LR baixa demais quase nao move e parece treino travado.' },
            { label: 'Movimento (step)', body: '`step()` executa o update real nos pesos com base em gradiente + escala.', risk: 'Chamar `step()` fora de ordem gera movimento cego, nao aprendizado acumulado.' },
          ],
          failureTitle: 'Erros comuns',
          failureModes: [
            { label: 'Loss sem diagnostico', value: 'A loss nao e monitorada por passo/epoca, entao o time nao ve se update ajuda ou piora.' },
            { label: 'Update cego', value: 'Executar `step()` sem gradiente atualizado do batch atual.' },
            { label: 'Escala ruim', value: 'Learning rate incompatível com a tarefa faz o treino oscilar ou andar devagar demais.' },
            { label: 'Loop sem limpeza', value: 'Esquecer `zero_grad()` mistura sinais de batches e distorce o update.' },
          ],
          mentalModelTitle: 'Modelo mental',
          mentalModel: [
            'Loss diz "quanto errou".',
            'Gradiente diz "para onde corrigir".',
            'Learning rate diz "quanto andar".',
            'Optimizer aplica o movimento real no parametro.',
          ],
          footer: 'No proximo slide, isso vira ritual completo de loop com ordem operacional fechada.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Map' }],
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
          footer: 'In the next slide, this becomes the full loop ritual with strict operational ordering.',
        },
      },
    },
  },
});
