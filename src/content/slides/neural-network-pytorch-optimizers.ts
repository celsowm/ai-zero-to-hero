import { defineSlide } from './_factory';

export const neuralNetworkPytorchOptimizers = defineSlide({
  id: 'neural-network-pytorch-optimizers',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: 'Otimizador no loop certo',
      body: `Para LM, o erro comum nao e "escolher AdamW ou SGD". E errar a **ordem do loop**.

Ritual correto:
1. forward
2. loss
3. \`zero_grad()\`
4. backward
5. \`step()\`

Ponto critico:
- \`zero_grad()\` evita acumular gradiente velho sem querer.
- \`step()\` sem backward atualizado aplica ruido, nao aprendizado.
- em AdamW, o otimizador tambem guarda estado interno (momentos); recriar o objeto no meio do treino quebra essa dinamica.

Otimizador e a etapa que transforma gradiente em movimento de parametro.
Se o loop estiver errado, nenhum otimizador salva o treino.`,
    },
    'en-us': {
      title: 'The optimizer in the right loop',
      body: `For LM training, the common failure is not "AdamW vs SGD". It is loop order.

Correct ritual:
1. forward
2. loss
3. \`zero_grad()\`
4. backward
5. \`step()\`

Critical points:
- \`zero_grad()\` prevents accidental stale-gradient accumulation.
- \`step()\` without fresh backward applies noise, not learning.
- in AdamW, the optimizer also carries internal state (moments); recreating it mid-training breaks that dynamic.

Optimizer is the stage that turns gradient into parameter movement.
If loop order is wrong, optimizer choice cannot rescue training.`,
    },
  },
  visual: {
    id: 'pytorch-execution-pipeline',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Fluxo' }],
        codePanel: {
          title: 'Sinal que o otimizador consome',
          description: 'Snippet simples para observar a etapa anterior ao `optimizer.step()`: formacao de gradiente.',
          source: { snippetId: 'pytorch-lm/autograd-step', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 5], content: 'Partimos de logits e target para isolar a matematica do update.' },
            { lineRange: [7, 8], content: '`loss` + `backward` gera exatamente o sinal que o otimizador vai usar.' },
            { lineRange: [10, 11], content: 'Antes do step, ja conseguimos inspecionar o que mudara.' },
          ],
        },
        pipelinePanel: {
          title: 'Fluxo operacional do update',
          subtitle: 'O otimizador não “aprende sozinho”. Ele só transforma o gradiente certo, na ordem certa, em movimento de parâmetro.',
          steps: [
            { label: 'forward', body: 'Os pesos atuais produzem logits e, indiretamente, o erro do batch.', risk: 'Sem uma leitura clara do forward, o restante do loop parece ruído estatístico.' },
            { label: 'loss', body: 'A loss concentra o erro em um escalar que o backward consegue propagar.', risk: 'Se a loss estiver mal formada, o otimizador só receberá um sinal confuso.' },
            { label: 'zero_grad()', body: 'Limpa o buffer de gradientes antes do batch atual.', risk: 'Sem isso, o batch novo soma gradiente velho e altera a escala real do update.' },
            { label: 'backward()', body: 'Converte erro em `.grad` por parâmetro.', risk: 'Chamar `step()` sem backward novo não aplica aprendizado; aplica movimento sem sinal fresco.' },
            { label: 'step()', body: 'AdamW ou SGD transforma `.grad` em deslocamento efetivo dos pesos.', risk: 'Recriar o optimizer no meio do treino apaga estado interno e muda a trajetória.' },
          ],
          failureTitle: 'Falhas do loop',
          failureModes: [
            { label: 'Acúmulo acidental', value: 'Quase sempre vem de `zero_grad()` fora do lugar ou ausente.' },
            { label: 'Trajetória quebrada', value: 'Recriar AdamW apaga momentos e reinicia a dinâmica do update.' },
            { label: 'Step cego', value: 'Sem backward atualizado, o optimizer não está “otimizando”; está aplicando ruído.' },
          ],
          mentalModelTitle: 'Modelo mental',
          mentalModel: [
            'Optimizer não cria gradiente; ele consome gradiente.',
            '`zero_grad()` protege a leitura do batch atual.',
            'Estado interno do optimizer também faz parte da continuidade do treino.',
          ],
          footer: 'Erros tipicos: esquecer zero_grad ou recriar optimizer e perder a dinamica acumulada.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Flow' }],
        codePanel: {
          title: 'Signal consumed by optimizer',
          description: 'Simple snippet to inspect the stage before `optimizer.step()`: gradient formation.',
          source: { snippetId: 'pytorch-lm/autograd-step', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 5], content: 'We start from logits and targets to isolate update math.' },
            { lineRange: [7, 8], content: '`loss` + `backward` creates exactly the signal the optimizer consumes.' },
            { lineRange: [10, 11], content: 'Even before step, we can inspect what will move.' },
          ],
        },
        pipelinePanel: {
          title: 'Operational update flow',
          subtitle: 'The optimizer does not “learn by itself”. It only turns the correct gradient, in the correct order, into parameter movement.',
          steps: [
            { label: 'forward', body: 'Current weights produce logits and, indirectly, the batch error.', risk: 'Without a clear forward reading, the rest of the loop looks like statistical noise.' },
            { label: 'loss', body: 'Loss concentrates error into a scalar that backward can propagate.', risk: 'If loss is malformed, the optimizer only receives a confused signal.' },
            { label: 'zero_grad()', body: 'Clears gradient buffers before the current batch.', risk: 'Without it, the new batch adds stale gradients and changes the true update scale.' },
            { label: 'backward()', body: 'Turns error into per-parameter `.grad` values.', risk: 'Calling `step()` without a fresh backward does not apply learning; it applies motion without signal.' },
            { label: 'step()', body: 'AdamW or SGD turns `.grad` into actual weight displacement.', risk: 'Recreating the optimizer mid-run erases internal state and changes trajectory.' },
          ],
          failureTitle: 'Loop failures',
          failureModes: [
            { label: 'Accidental accumulation', value: 'Usually caused by misplaced or missing `zero_grad()`.' },
            { label: 'Broken trajectory', value: 'Recreating AdamW erases moments and restarts update dynamics.' },
            { label: 'Blind step', value: 'Without fresh backward, the optimizer is not optimizing; it is applying noise.' },
          ],
          mentalModelTitle: 'Mental model',
          mentalModel: [
            'The optimizer does not create gradients; it consumes them.',
            '`zero_grad()` protects the meaning of the current batch.',
            'Optimizer internal state is also part of training continuity.',
          ],
          footer: 'Common bugs: missing zero_grad or recreating the optimizer and losing accumulated dynamics.',
        },
      },
    },
  },
});
