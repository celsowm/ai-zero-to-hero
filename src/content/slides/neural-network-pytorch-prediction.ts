import { defineSlide } from './_factory';

export const neuralNetworkPytorchPrediction = defineSlide({
  id: 'neural-network-pytorch-prediction',
  type: 'two-column',
  options: { columnRatios: [0.42, 0.58] },
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
          title: 'Loop de geracao autoregressiva',
          description: 'Mini modelo Embedding + Linear gerando token a token. A aba de baixo mostra o loop em camera lenta.',
          source: { snippetId: 'pytorch-lm/inference-loop', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 2], content: 'Importamos `torch` e `nn`, ou seja, o núcleo de tensores e os blocos de rede usados no exemplo.' },
            { lineRange: [4, 9], content: 'Definimos um mini language model: embedding converte IDs em vetores e a camada linear converte esses vetores em logits de vocabulário.' },
            { lineRange: [11, 13], content: 'Criamos o contexto inicial e o token de parada (`EOS`), que define quando a geração pode encerrar.' },
            { lineRange: [15, 17], content: 'Entramos em modo de inferência com `eval()` e `no_grad()`, para evitar ruído de treino e custo de gradiente.' },
            { lineRange: [18, 20], content: 'Cada forward gera logits para todas as posições do contexto atual, mas só a última posição é usada para decidir o próximo token.' },
            { lineRange: [21, 22], content: 'Escolhemos o próximo token com `argmax` e anexamos ao contexto, alimentando o próximo ciclo de geração.' },
            { lineRange: [23, 24], content: 'Se o token gerado for `EOS`, encerramos o loop antes de atingir o limite máximo de passos.' },
            { lineRange: [26, 26], content: 'No final, exibimos a sequência completa para inspecionar como o contexto evoluiu token por token.' },
          ],
        },
        generation: {
          title: 'Loop em camera lenta',
          subtitle: 'Cada passo: forward -> pega ultima posicao -> argmax -> anexa ao contexto.',
          initialTokens: ['5', '11', '7'],
          generatedTokens: ['18', '24', '3', '0'],
          vocabularyHint: 'Aqui o ultimo token "0" e o EOS: o loop para sozinho.',
          embeddingLabel: 'Embedding',
          linearLabel: 'Linear',
          logitsLabel: 'logits[:,-1,:]',
          contextLabel: 'context',
          nextLabel: 'Proximo token →',
          prevLabel: '← Anterior',
          nextStepLabel: 'Clique em "Proximo token" para rodar mais um passo do loop.',
          stepLabel: 'Passo',
          completionLabel: 'EOS gerado. Loop encerrado.',
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
          title: 'Autoregressive generation loop',
          description: 'Tiny Embedding + Linear model emitting one token at a time. The panel below shows the loop in slow motion.',
          source: { snippetId: 'pytorch-lm/inference-loop', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 2], content: 'We import `torch` and `nn`, the tensor core and neural-network building blocks used by the snippet.' },
            { lineRange: [4, 9], content: 'We define a tiny language model: embedding turns token IDs into vectors, and the linear layer turns vectors into vocabulary logits.' },
            { lineRange: [11, 13], content: 'We create the initial context and an `EOS` stop token, which sets the generation stopping rule.' },
            { lineRange: [15, 17], content: 'We switch to inference mode with `eval()` and `no_grad()` to avoid training noise and gradient overhead.' },
            { lineRange: [18, 20], content: 'Each forward pass produces logits for every current context position, but only the last position is used to choose the next token.' },
            { lineRange: [21, 22], content: 'We pick the next token with `argmax` and append it to context, feeding the next generation step.' },
            { lineRange: [23, 24], content: 'If the emitted token is `EOS`, the loop exits before reaching the maximum step budget.' },
            { lineRange: [26, 26], content: 'Finally, we print the full generated sequence to inspect how context evolved token by token.' },
          ],
        },
        generation: {
          title: 'Loop in slow motion',
          subtitle: 'Each step: forward -> take last position -> argmax -> append to context.',
          initialTokens: ['5', '11', '7'],
          generatedTokens: ['18', '24', '3', '0'],
          vocabularyHint: 'Here the last emitted token "0" is EOS: the loop stops on its own.',
          embeddingLabel: 'Embedding',
          linearLabel: 'Linear',
          logitsLabel: 'logits[:,-1,:]',
          contextLabel: 'context',
          nextLabel: 'Next token →',
          prevLabel: '← Previous',
          nextStepLabel: 'Click "Next token" to run one more step of the loop.',
          stepLabel: 'Step',
          completionLabel: 'EOS emitted. Loop finished.',
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
