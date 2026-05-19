import { defineSlide } from './_factory';

export const neuralNetworkPytorchOptimizers = defineSlide({
  id: 'neural-network-pytorch-optimizers',
  type: 'two-column',
  options: { columnRatios: [0.54, 0.46] },
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
    id: 'pytorch-dual-panel',
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
        visualPanel: {
          title: 'Fluxo operacional do update',
          items: [
            { label: 'forward', value: 'Produz logits com pesos atuais.' },
            { label: 'loss', value: 'Mede erro contra target do batch.' },
            { label: 'backward', value: 'Converte erro em gradiente por parametro.' },
            { label: 'step', value: 'Aplica regra do otimizador (ex: AdamW) para mover pesos.' },
            { label: 'estado interno', value: 'AdamW carrega momentos e acumuladores; perder isso muda a trajetoria do treino.' },
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
        visualPanel: {
          title: 'Operational update flow',
          items: [
            { label: 'forward', value: 'Produces logits with current weights.' },
            { label: 'loss', value: 'Measures batch error against targets.' },
            { label: 'backward', value: 'Turns error into per-parameter gradients.' },
            { label: 'step', value: 'Applies optimizer rule (for example AdamW) to move weights.' },
            { label: 'internal state', value: 'AdamW carries moments and accumulators; losing them changes training trajectory.' },
          ],
          footer: 'Common bugs: missing zero_grad or recreating the optimizer and losing accumulated dynamics.',
        },
      },
    },
  },
});
