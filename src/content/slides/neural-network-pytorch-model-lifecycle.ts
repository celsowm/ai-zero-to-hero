import { defineSlide } from './_factory';

export const neuralNetworkPytorchModelLifecycle = defineSlide({
  id: 'neural-network-pytorch-model-lifecycle',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Ciclo de vida do modelo',
      body: `Todo projeto serio com PyTorch alterna modos de execucao. Se isso ficar confuso, o comportamento parece "aleatorio".

Contrato de ciclo de vida:
1. **\`model.train()\`**: ativa comportamento de treino (ex: dropout).
2. **\`model.eval()\`**: congela comportamento estocastico para inferencia.
3. **\`torch.no_grad()\`**: desliga grafo para economizar memoria e tempo.
4. **checkpoint**: persiste estado para retomar exatamente de onde parou.

O que muda por modo:
- \`train()\` deixa dropout ativo e prepara o modelo para atualizar gradientes
- \`eval()\` congela comportamento estocastico do forward
- \`no_grad()\` evita construir grafo quando voce so quer medir ou gerar

Erro recorrente:
- avaliar sem \`eval()\` e culpar "instabilidade do modelo".
- inferir sem \`no_grad()\` e gastar memoria sem necessidade.`,
    },
    'en-us': {
      title: 'Model lifecycle',
      body: `Every serious PyTorch project alternates execution modes. If this is fuzzy, behavior feels random.

Lifecycle contract:
1. **\`model.train()\`**: enables training behavior (for example dropout).
2. **\`model.eval()\`**: freezes stochastic behavior for inference.
3. **\`torch.no_grad()\`**: disables graph building to save memory and time.
4. **checkpointing**: persists state to resume exactly where you stopped.

What changes per mode:
- \`train()\` keeps dropout active and prepares the model for gradient updates
- \`eval()\` freezes stochastic forward behavior
- \`no_grad()\` avoids graph construction when you only want measurement or generation

Recurring mistakes:
- evaluating without \`eval()\` then blaming model instability.
- inferring without \`no_grad()\` and wasting memory.`,
    },
  },
  visual: {
    id: 'pytorch-execution-pipeline',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Estados' }],
        codePanel: {
          title: 'Mudanca de modo em codigo',
          description: 'Mesmo modelo, dois comportamentos: treino com ruido e inferencia estavel.',
          source: { snippetId: 'pytorch-lm/model-lifecycle', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 4], content: 'Modelo pequeno com Dropout para tornar visivel a diferenca train/eval.' },
            { lineRange: [5, 8], content: 'Em treino, o forward pode injetar ruido.' },
            { lineRange: [9, 14], content: 'Em avaliacao, com no_grad, inferencia fica estavel e barata.' },
          ],
        },
        pipelinePanel: {
          title: 'Modo -> efeito no forward',
          subtitle: 'O mesmo modelo muda de comportamento conforme o modo. Se isso ficar implícito, o resultado parece aleatório.',
          steps: [
            { label: 'train()', body: 'Ativa comportamento de treino, como dropout e caminho normal para atualização de parâmetros.', risk: 'Esquecer que treino ainda está ligado e depois culpar o modelo por variância de inferência.' },
            { label: 'forward com gradiente', body: 'O grafo dinâmico é construído para que `backward()` possa propagar derivadas depois.', risk: 'Medir ou gerar nesse modo custa memória que não traz benefício algum.' },
            { label: 'eval()', body: 'Congela o comportamento estocástico do forward para produzir uma leitura estável do modelo.', risk: 'Avaliar sem `eval()` distorce a percepção de qualidade e estabilidade.' },
            { label: 'no_grad()', body: 'Desliga a construção do grafo quando você só quer inferir, medir ou gerar texto.', risk: 'Inferir sem `no_grad()` mantém custo de gradiente por puro desperdício.' },
            { label: 'checkpoint', body: 'Persiste pesos e estado operacional para retomar ou comparar execuções.', risk: 'Salvar só uma parte do estado e depois acreditar que retomou exatamente de onde parou.' },
          ],
          failureTitle: 'Falhas recorrentes',
          failureModes: [
            { label: 'Avaliação ruidosa', value: 'Quase sempre é `eval()` ausente, não “instabilidade mágica” do modelo.' },
            { label: 'Memória alta', value: 'Inferência sem `no_grad()` carrega grafo sem necessidade.' },
            { label: 'Retomada inconsistente', value: 'Checkpoint parcial quebra a continuidade operacional do treino.' },
          ],
          mentalModelTitle: 'Leitura mental',
          mentalModel: [
            'Treino = forward com ruído/gradiente preparado para update.',
            'Inferência = forward estável e barato.',
            'Checkpoint = memória operacional da execução, não simples backup.',
          ],
          footer: 'Se o resultado muda sem motivo entre duas inferencias, cheque modo do modelo primeiro.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'States' }],
        codePanel: {
          title: 'Mode switching in code',
          description: 'Same model, two behaviors: noisy training and stable inference.',
          source: { snippetId: 'pytorch-lm/model-lifecycle', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 4], content: 'Tiny model with Dropout to make train/eval difference visible.' },
            { lineRange: [5, 8], content: 'In training mode, forward may inject noise.' },
            { lineRange: [9, 14], content: 'In eval mode with no_grad, inference is stable and cheaper.' },
          ],
        },
        pipelinePanel: {
          title: 'Mode -> forward effect',
          subtitle: 'The same model changes behavior depending on mode. If that remains implicit, the output feels random.',
          steps: [
            { label: 'train()', body: 'Enables training behavior, such as dropout and the standard path toward parameter updates.', risk: 'Forgetting training mode is still active and then blaming inference variance on the model itself.' },
            { label: 'forward with gradients', body: 'The dynamic graph is built so `backward()` can propagate derivatives later.', risk: 'Measuring or generating in this mode wastes memory without any benefit.' },
            { label: 'eval()', body: 'Freezes stochastic forward behavior so you can inspect a stable model state.', risk: 'Evaluating without `eval()` distorts your view of quality and stability.' },
            { label: 'no_grad()', body: 'Disables graph construction when you only want inference, measurement, or generation.', risk: 'Running inference without `no_grad()` keeps gradient cost for no reason.' },
            { label: 'checkpoint', body: 'Persists weights and operational state so runs can be resumed or compared.', risk: 'Saving only part of the state and assuming you resumed exactly where you left off.' },
          ],
          failureTitle: 'Recurring failures',
          failureModes: [
            { label: 'Noisy evaluation', value: 'Usually missing `eval()`, not some mysterious model instability.' },
            { label: 'High memory', value: 'Inference without `no_grad()` keeps graph state unnecessarily.' },
            { label: 'Broken resume', value: 'A partial checkpoint breaks training continuity.' },
          ],
          mentalModelTitle: 'Mental model',
          mentalModel: [
            'Training = forward with stochastic behavior and gradient tracking.',
            'Inference = stable and cheaper forward pass.',
            'Checkpoint = operational memory of the run, not a casual backup.',
          ],
          footer: 'If output changes unexpectedly between inferences, check model mode first.',
        },
      },
    },
  },
});
