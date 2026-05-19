import { defineSlide } from './_factory';

export const neuralNetworkPytorchPrediction = defineSlide({
  id: 'neural-network-pytorch-prediction',
  type: 'two-column',
  options: { columnRatios: [0.54, 0.46] },
  content: {
    'pt-br': {
      title: 'Inferência: eval, no_grad e próximo token',
      body: `Inferencia nao e "treino sem step". E outro modo de execucao.

Objetivos da inferencia:
- nao construir gradiente.
- nao manter dropout ativo.
- extrair decisao do ultimo passo temporal.

No fluxo autoregressivo:
1. roda forward no contexto atual.
2. pega \`logits[:, -1, :]\`.
3. escolhe proximo token (argmax ou sampling).
4. concatena e repete.
5. para por \`EOS\` ou por limite de tokens.

Se voce esquecer \`eval()\` e \`no_grad()\`, desempenho cai e saida fica menos estavel.`,
    },
    'en-us': {
      title: 'Inference: eval, no_grad, and next token',
      body: `Inference is not "training without step". It is a different execution mode.

Inference goals:
- avoid graph construction.
- disable training-time stochastic behavior.
- extract decision from the last time step.

In autoregressive flow:
1. run forward on current context.
2. take \`logits[:, -1, :]\`.
3. pick next token (argmax or sampling).
4. append and repeat.
5. stop on \`EOS\` or token limit.

If you forget \`eval()\` and \`no_grad()\`, performance drops and outputs become less stable.`,
    },
  },
  visual: {
    id: 'pytorch-execution-pipeline',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Passos' }],
        codePanel: {
          title: 'Ritual de inferencia',
          description: 'Snippet curto para fixar a troca train -> eval e uso de no_grad.',
          source: { snippetId: 'pytorch-lm/model-lifecycle', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 4], content: 'Modelo simples para demonstrar comportamento de inferencia.' },
            { lineRange: [5, 8], content: 'Treino e inferencia podem receber mesmo input, mas comportamento interno muda.' },
            { lineRange: [9, 14], content: '`eval()` e `no_grad()` formam o par padrao para previsao/geracao.' },
          ],
        },
        pipelinePanel: {
          title: 'Passos de geracao',
          subtitle: 'Treino usa todas as posições em paralelo. Geração autoregressiva decide uma posição por vez.',
          steps: [
            { label: 'eval + no_grad', body: 'Antes do primeiro token novo, congelamos o modo do modelo e desligamos o grafo.', risk: 'Esquecer esse passo custa desempenho e pode introduzir ruído de treino.' },
            { label: 'contexto', shape: '(B,T)', body: 'O modelo recebe o prefixo atual inteiro, não apenas a última palavra.', risk: 'Confundir contexto parcial com estado interno e perder a leitura do que o modelo realmente enxerga.' },
            { label: 'forward', shape: 'logits -> (B,T,V)', body: 'A saída produz um placar para cada posição do contexto atual.', risk: 'Assumir que todos esses logits serão usados para a decisão seguinte.' },
            { label: 'última fatia', shape: 'logits[:, -1, :]', body: 'Só a posição final interessa para escolher o próximo token.', risk: 'Ler o tensor inteiro e esquecer qual corte realmente alimenta a geração.' },
            { label: 'amostra + append', body: 'Argmax ou sampling escolhe um índice; o token novo entra no contexto e o ciclo recomeça.', risk: 'Gerar sem critério de parada e transformar inferência em loop sem controle.' },
          ],
          failureTitle: 'Onde a geração degrada',
          failureModes: [
            { label: 'Modo errado', value: '`train()` ativo deixa dropout contaminar a geração.' },
            { label: 'Corte errado', value: 'Se você não pegar a última fatia, a decisão usa a posição errada do contexto.' },
            { label: 'Parada ausente', value: 'Sem `EOS` ou limite de tokens, o loop continua sem critério.' },
          ],
          mentalModelTitle: 'Modelo mental',
          mentalModel: [
            'Forward produz logits para todas as posições vistas até agora.',
            'Geração consome só a última decisão disponível.',
            'O novo token volta para a entrada e alonga o contexto.',
          ],
          footer: 'Padrao mental: treino usa todas posicoes; inferencia decide uma posicao por vez.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Steps' }],
        codePanel: {
          title: 'Inference ritual',
          description: 'Short snippet to lock in train -> eval switch and no_grad usage.',
          source: { snippetId: 'pytorch-lm/model-lifecycle', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 4], content: 'Tiny model to expose inference behavior.' },
            { lineRange: [5, 8], content: 'Training and inference may share input while internal behavior differs.' },
            { lineRange: [9, 14], content: '`eval()` and `no_grad()` are the default pair for prediction/generation.' },
          ],
        },
        pipelinePanel: {
          title: 'Generation steps',
          subtitle: 'Training consumes all positions in parallel. Autoregressive generation decides one position at a time.',
          steps: [
            { label: 'eval + no_grad', body: 'Before the first new token, freeze model mode and disable graph building.', risk: 'Skipping this hurts performance and may reintroduce training-time noise.' },
            { label: 'context', shape: '(B,T)', body: 'The model receives the entire current prefix, not only the last word.', risk: 'Confusing partial context with hidden state and losing sight of what the model actually sees.' },
            { label: 'forward', shape: 'logits -> (B,T,V)', body: 'Output produces a scoreboard for every position in the current context.', risk: 'Assuming all of those logits are equally used for the next decision.' },
            { label: 'last slice', shape: 'logits[:, -1, :]', body: 'Only the final position matters for choosing the next token.', risk: 'Reading the whole tensor and forgetting which slice truly drives generation.' },
            { label: 'sample + append', body: 'Argmax or sampling chooses an index; the new token is appended to context and the cycle restarts.', risk: 'Generating without a stop criterion and turning inference into an uncontrolled loop.' },
          ],
          failureTitle: 'Where generation degrades',
          failureModes: [
            { label: 'Wrong mode', value: '`train()` left active lets dropout contaminate generation.' },
            { label: 'Wrong slice', value: 'If you do not take the last slice, the decision uses the wrong position.' },
            { label: 'Missing stop', value: 'Without `EOS` or a token limit, the loop has no control boundary.' },
          ],
          mentalModelTitle: 'Mental model',
          mentalModel: [
            'Forward produces logits for every position seen so far.',
            'Generation consumes only the latest available decision.',
            'The new token returns to the input and extends the context.',
          ],
          footer: 'Mental model: training consumes all positions; inference decides one position at a time.',
        },
      },
    },
  },
});
