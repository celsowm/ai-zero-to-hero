import { defineSlide } from './_factory';

export const neuralNetworkPytorchOptimizers = defineSlide({
  id: 'neural-network-pytorch-optimizers',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: 'Otimizador no loop certo',
      body: `Agora o foco é disciplina de execução: **loop correto, no lote correto, com sinal correto**.

Falha comum em projeto real não é "escolher AdamW vs SGD".
É quebrar a ordem operacional que conecta erro ao update.

Sequencia de treino que precisa fechar:
1. forward
2. loss
3. \`zero_grad()\`
4. backward
5. \`step()\`

Por que essa ordem importa:
- \`loss\` define o alvo escalar do batch atual;
- \`backward()\` traduz esse alvo em \`.grad\` por parâmetro;
- \`step()\` move pesos com base nesse gradiente;
- \`zero_grad()\` impede que o proximo batch herde sinal velho.

Sinais práticos de loop saudável:
- loss tende a cair (mesmo com ruído local);
- gradiente existe quando esperado;
- update acontece após backward do mesmo batch.

Se a ordem quebra, o treino vira movimento cego: parâmetro muda, mas aprendizado não consolida.`,
    },
    'en-us': {
      title: 'The optimizer in the right loop',
      body: `Now the focus is execution discipline: **correct loop, correct batch, correct signal**.

In real projects, failure is rarely "AdamW vs SGD".
It is usually broken operational order between error and update.

Training sequence that must close:
1. forward
2. loss
3. \`zero_grad()\`
4. backward
5. \`step()\`

Why order matters:
- \`loss\` defines the scalar objective for the current batch;
- \`backward()\` converts that objective into per-parameter \`.grad\`;
- \`step()\` moves weights based on those gradients;
- \`zero_grad()\` prevents the next batch from inheriting stale signal.

Practical signs of a healthy loop:
- loss trends downward (even with local noise);
- gradients exist when expected;
- update happens after backward from the same batch.

If order breaks, training becomes blind motion: parameters move, learning does not consolidate.`,
    },
  },
  visual: {
    id: 'pytorch-execution-pipeline',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Código' }, { label: 'Fluxo' }],
        codePanel: {
          title: 'Sinal que o otimizador consome',
          description: 'Snippet simples para observar a etapa anterior ao `optimizer.step()`: formacao de gradiente.',
          source: { snippetId: 'pytorch-lm/autograd-step', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 5], content: 'Partimos de logits e target para focar no essencial: como nasce o gradiente que o otimizador vai consumir.' },
            { lineRange: [7, 8], content: 'A cross-entropy calcula o erro e o `backward()` propaga esse erro para preencher `.grad`.' },
            { lineRange: [10, 11], content: 'Antes do `step()`, já dá para inspecionar loss e gradiente e verificar se o sinal de update faz sentido.' },
          ],
        },
        pipelinePanel: {
          title: 'Fluxo operacional do update',
          subtitle: 'Objetivo: garantir causalidade correta entre lote atual, gradiente atual e update atual.',
          steps: [
            { label: 'forward', body: 'Com pesos atuais, o modelo gera logits para o batch corrente.', risk: 'Se entrada/target estiver desalinhado, a loss fica informativamente errada.' },
            { label: 'loss', body: 'A loss resume erro em escalar otimizado no batch atual (MSE em regressao, CE em LM).', risk: 'Loss mal definida propaga gradiente coerente com objetivo errado.' },
            { label: 'zero_grad()', body: 'Limpa `.grad` para isolar o sinal do lote atual.', risk: 'Sem limpeza, gradiente acumula entre batches e distorce escala de update.' },
            { label: 'backward()', body: 'Retropropaga e preenche `.grad` em cada parâmetro treinável.', risk: 'Pular/atrasar backward e ainda chamar step produz update sem causa atual.' },
            { label: 'step()', body: 'Executa o deslocamento dos pesos com base no `.grad` recém-calculado.', risk: 'Step fora de ordem muda parâmetro sem consolidar aprendizado do lote certo.' },
            { label: 'monitoramento', body: 'Observe loss e, quando necessario, norma de gradiente para validar estabilidade.', risk: 'Sem observabilidade, bug de loop parece “modelo ruim” por semanas.' },
          ],
          failureTitle: 'Falhas do loop',
          failureModes: [
            { label: 'Acúmulo acidental', value: 'Quase sempre vem de `zero_grad()` fora do lugar ou ausente.' },
            { label: 'Step cego', value: 'Sem backward atualizado, o optimizer não está “otimizando”; está aplicando ruído.' },
            { label: 'Batch desalinhado', value: 'Input/target inconsistentes fazem a loss guiar para um objetivo errado.' },
            { label: 'Sem telemetria', value: 'Sem acompanhar loss/gradiente, regressão de treino demora para ser detectada.' },
          ],
          mentalModelTitle: 'Modelo mental',
          mentalModel: [
            'Optimizer não cria gradiente; ele consome gradiente.',
            'Cada update precisa nascer do batch atual, não de resíduos anteriores.',
            '`zero_grad()` protege a leitura do batch atual.',
            'A ordem do loop define se o update representa aprendizado real.',
          ],
          footer: 'Regra de ouro: update bom tem causalidade local clara (batch atual -> grad atual -> step atual).',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Flow' }],
        codePanel: {
          title: 'Signal consumed by optimizer',
          description: 'Simple snippet to inspect the stage before `optimizer.step()`: gradient formation.',
          source: { snippetId: 'pytorch-lm/autograd-step', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 5], content: 'We start from logits and targets to isolate the core point: how optimizer-ready gradients are formed.' },
            { lineRange: [7, 8], content: 'Cross-entropy computes error and `backward()` propagates it, filling `.grad` for each parameter.' },
            { lineRange: [10, 11], content: 'Before calling `step()`, loss and gradient can already be inspected to validate update direction.' },
          ],
        },
        pipelinePanel: {
          title: 'Operational update flow',
          subtitle: 'Goal: enforce correct causality between current batch, current gradients, and current updates.',
          steps: [
            { label: 'forward', body: 'With current weights, the model produces logits for the current batch.', risk: 'If input/target alignment is wrong, loss becomes informative for the wrong task.' },
            { label: 'loss', body: 'Loss compresses error into the scalar objective for this batch (MSE in regression, CE in LM).', risk: 'Malformed loss can propagate gradients that optimize the wrong objective.' },
            { label: 'zero_grad()', body: 'Clears `.grad` so only current-batch signal remains.', risk: 'Without clearing, gradients accumulate across batches and distort update scale.' },
            { label: 'backward()', body: 'Backpropagates and fills `.grad` for each trainable parameter.', risk: 'Skipping/delaying backward then calling step creates updates without current-batch cause.' },
            { label: 'step()', body: 'Executes weight displacement from freshly computed gradients.', risk: 'Out-of-order step changes parameters without consolidating current-batch learning.' },
            { label: 'monitoring', body: 'Track loss and, when needed, gradient norms to validate stability.', risk: 'Without observability, loop bugs are misdiagnosed as “bad model” for too long.' },
          ],
          failureTitle: 'Loop failures',
          failureModes: [
            { label: 'Accidental accumulation', value: 'Usually caused by misplaced or missing `zero_grad()`.' },
            { label: 'Blind step', value: 'Without fresh backward, the optimizer is not optimizing; it is applying noise.' },
            { label: 'Batch misalignment', value: 'Inconsistent input/target pairing makes loss optimize the wrong objective.' },
            { label: 'No telemetry', value: 'Without watching loss/gradient signals, training regressions are detected late.' },
          ],
          mentalModelTitle: 'Mental model',
          mentalModel: [
            'The optimizer does not create gradients; it consumes them.',
            'Each update must originate from the current batch, not stale residue.',
            '`zero_grad()` protects the meaning of the current batch.',
            'Loop order determines whether updates represent real learning.',
          ],
          footer: 'Golden rule: a valid update has clear local causality (current batch -> current grad -> current step).',
        },
      },
    },
  },
});
