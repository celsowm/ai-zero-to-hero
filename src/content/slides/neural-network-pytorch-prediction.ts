import { defineSlide } from './_factory';

export const neuralNetworkPytorchPrediction = defineSlide({
  id: 'neural-network-pytorch-prediction',
  type: 'two-column',
  options: { columnRatios: [0.42, 0.58] },
  content: {
    'pt-br': {
      title: 'Inferência: do treino à geração do próximo token',
      body: `No slide anterior, fechamos o ciclo de treino: \`forward → loss → backward → step\`. Agora invertemos a direção: em vez de ajustar pesos, usamos o modelo para **produzir** o próximo token — \`forward → argmax → append\`.

Três pré-condições antes de rodar (todas elas vêm de "Ciclo de vida do modelo"):
- \`model.eval()\`: congela comportamento estocástico.
- \`torch.no_grad()\`: desliga grafo — sem gradiente, sem custo de backward.
- pegar só \`logits[:, -1, :]\`: a última posição decide.

Loop autoregressivo:
1. forward no contexto atual.
2. \`logits[:, -1, :]\` corta a última posição.
3. \`argmax\` escolhe o próximo token.
4. concatena ao contexto.
5. para quando gerar \`EOS\` ou bater o limite.

A geração fecha o ciclo do modelo. No próximo slide, veremos como persistir esse modelo treinado.`,
    },
    'en-us': {
      title: 'Inference: from training to next-token generation',
      body: `In the previous slide we closed the training loop: \`forward → loss → backward → step\`. Now we reverse direction: instead of updating weights, we use the model to **produce** the next token — \`forward → argmax → append\`.

Three preconditions before running (all from "Model lifecycle"):
- \`model.eval()\`: freezes stochastic behavior.
- \`torch.no_grad()\`: disables graph construction — no gradient, no backward cost.
- take only \`logits[:, -1, :]\`: the last position decides.

Autoregressive loop:
1. forward on current context.
2. \`logits[:, -1, :]\` slices the last position.
3. \`argmax\` picks the next token.
4. appends to context.
5. stops when \`EOS\` is generated or the limit is reached.

Generation closes the model cycle. In the next slide we'll see how to persist this trained model.`,
    },
  },
  visual: {
    id: 'pytorch-training-loop-graph',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Código' }, { label: 'Grafo' }],
        codePanel: {
          title: 'Loop autoregressivo mínimo',
          description: 'Modelo Embedding + Linear gerando token a token. O stepper abaixo mostra o loop em câmera lenta.',
          source: { snippetId: 'pytorch-lm/inference-loop', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 2], content: 'Importamos `torch` e `nn`, o núcleo de tensores e os blocos de rede usados no exemplo.' },
            { lineRange: [4, 9], content: 'Definimos um mini language model: embedding converte IDs em vetores e a camada linear converte esses vetores em logits de vocabulário.' },
            { lineRange: [11, 13], content: 'Criamos o contexto inicial `[5, 11, 7]` (T=3) e o token de parada (`eos_id = 0`), que define quando a geração pode encerrar.' },
            { lineRange: [15, 17], content: 'Entramos em modo de inferência com `eval()` e `no_grad()`, para evitar ruído de treino e custo de gradiente.' },
            { lineRange: [18, 20], content: 'Cada iteração do `for`: forward em todo o contexto, corte da último `logits[:, -1, :]` e `argmax` escolhendo `next_id`.' },
            { lineRange: [21, 22], content: 'Concatenamos `next_id` ao contexto — é exatamente esse append que alimenta a próxima passo do loop.' },
            { lineRange: [23, 24], content: 'Se o token gerado for `0` (EOS), saímos do `for` com `break` antes de atingir as 5 iterações.' },
            { lineRange: [26, 26], content: 'No final, exibimos a sequência completa para ver como o contexto evoluiu token por token.' },
          ],
        },
        generation: {
          title: 'Loop em câmera lenta',
          subtitle: 'Cada passo: forward → logits[:, -1, :] → argmax → append.',
          initialTokens: ['5', '11', '7'],
          generatedTokens: ['17', '9', '1', '0'],
          embeddingLabel: 'Embedding',
          linearLabel: 'Linear',
          logitsLabel: 'logits[:, -1, :]',
          contextLabel: 'Contexto',
          nextLabel: 'Próximo token →',
          prevLabel: '← Anterior',
          stepLabel: 'Passo',
          completionLabel: 'EOS gerado (0). Loop encerrado — igual ao break da linha 23.',
        },
        graphPanel: {
          title: 'Fluxo autoregressivo passo-a-passo',
          subtitle: 'Cada nó corresponde a uma operação do loop de inferência. Clique em cada nó para ver o detalhe.',
          nodes: [
            {
              id: 'context',
              label: 'context (B,T)',
              shape: 'int IDs',
              lineRange: [11, 12],
              body: 'O contexto começa como uma sequência de IDs inteiros. A cada iteração, um novo token é concatenado ao final.',
              risk: 'Esquecer que o contexto cresce a cada passo: o forward vê toda a sequência acumulada, não só o último token.',
            },
            {
              id: 'forward',
              label: 'model(context)',
              shape: 'logits (B,T,V)',
              lineRange: [18, 18],
              body: 'O forward produz logits para todas as posições do contexto, mas só a última nos interessa. Embedding transforma IDs em vetores, Linear projeta vetores em logits de vocabulário.',
              risk: 'Se o modelo ainda estiver em train() ou sem no_grad(), desperdício de memória e comportamento estocástico.',
            },
            {
              id: 'slice',
              label: 'logits[:,-1,:]',
              shape: 'logits (B,V)',
              lineRange: [19, 19],
              body: 'Cortamos apenas a última posição temporal: é ela que decide o próximo token. O resto do contexto serve apenas como memória.',
              risk: 'Pegar todas as posições (logits inteiros) e calcular argmax em dimensão errada gera um tensor de shape errado.',
            },
            {
              id: 'argmax',
              label: 'argmax → next_id',
              shape: 'int (B,1)',
              lineRange: [20, 20],
              body: 'O argmax escolhe o índice do vocabulário com maior score. É uma decisão determinística (poderia ser sampling).',
              risk: 'Argmax gera texto repetitivo e previsível. Em produção, temperature sampling ou top-k/top-p são preferidos.',
            },
            {
              id: 'concat',
              label: 'torch.cat',
              shape: '(B, T+1)',
              lineRange: [21, 21],
              body: 'Concatenamos o novo token ao contexto. O próximo forward já verá esse token como parte do input.',
              risk: 'Se o contexto cresce sem limite, excede a janela do modelo. Em produção, é necessário truncar ou usar sliding window.',
            },
          ],
          edges: [
            { from: 'context', to: 'forward' },
            { from: 'forward', to: 'slice' },
            { from: 'slice', to: 'argmax' },
            { from: 'argmax', to: 'concat' },
            { from: 'concat', to: 'forward' },
          ],
          loopLabel: 'loop auto',
          prevLabel: '← Anterior',
          nextLabel: 'Próximo →',
          stepLabel: 'Nó',
          resetLabel: 'Recomeçar',
          bridgeTitle: 'Treino vs inferência',
          bridgeBody: 'No treino, o modelo vê x e targets deslocados e usa cross-entropy para calcular loss. Na inferência, não há targets — apenas o modelo gera um token por vez a partir do contexto, em modo autoregressivo. A mesma arquitetura, dois modos de uso.',
          failureTitle: 'Falhas recorrentes',
          failureModes: [
            { label: 'Sem eval()', value: 'Dropout ainda ativo gera outputs estocásticos entre passes.' },
            { label: 'Sem no_grad()', value: 'Grafo acumula sem necessidade, estourando memória.' },
            { label: 'Contexto infinito', value: 'Sem limite de contexto, o modelo cresce o tensor até estourar a janela.' },
          ],
          footer: 'A geração fecha o ciclo do modelo: do treino ao texto. Próximo passo: persistir o modelo para deploy via checkpoint.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Graph' }],
        codePanel: {
          title: 'Minimal autoregressive loop',
          description: 'Embedding + Linear model producing one token at a time. The stepper below shows the loop in slow motion.',
          source: { snippetId: 'pytorch-lm/inference-loop', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 2], content: 'We import `torch` and `nn`, the tensor core and neural-network building blocks used by the snippet.' },
            { lineRange: [4, 9], content: 'We define a tiny language model: embedding turns token IDs into vectors, and the linear layer turns vectors into vocabulary logits.' },
            { lineRange: [11, 13], content: 'We create the initial context `[5, 11, 7]` (T=3) and the stop token (`eos_id = 0`), which sets the generation stopping rule.' },
            { lineRange: [15, 17], content: 'We switch to inference mode with `eval()` and `no_grad()` to avoid training noise and gradient overhead.' },
            { lineRange: [18, 20], content: 'Each `for` iteration: forward over the whole context, slice `logits[:, -1, :]`, then `argmax` picks `next_id`.' },
            { lineRange: [21, 22], content: 'We `cat` `next_id` back into context — this is exactly the append that feeds the next iteration.' },
            { lineRange: [23, 24], content: 'If the emitted token is `0` (EOS), we `break` out of the `for` before reaching the 5-iteration budget.' },
            { lineRange: [26, 26], content: 'Finally, we print the full sequence to see how the context evolved token by token.' },
          ],
        },
        generation: {
          title: 'Loop in slow motion',
          subtitle: 'Each step: forward → logits[:, -1, :] → argmax → append.',
          initialTokens: ['5', '11', '7'],
          generatedTokens: ['17', '9', '1', '0'],
          embeddingLabel: 'Embedding',
          linearLabel: 'Linear',
          logitsLabel: 'logits[:, -1, :]',
          contextLabel: 'Context',
          nextLabel: 'Next token →',
          prevLabel: '← Previous',
          stepLabel: 'Step',
          completionLabel: 'EOS emitted (0). Loop breaks — same as line 23.',
        },
        graphPanel: {
          title: 'Autoregressive flow step-by-step',
          subtitle: 'Each node corresponds to one operation in the inference loop. Click any node for details.',
          nodes: [
            {
              id: 'context',
              label: 'context (B,T)',
              shape: 'int IDs',
              lineRange: [11, 12],
              body: 'Context starts as a sequence of integer IDs. At each iteration, a new token is appended to the end.',
              risk: 'Forget that context grows each step: forward sees the entire accumulated sequence, not just the last token.',
            },
            {
              id: 'forward',
              label: 'model(context)',
              shape: 'logits (B,T,V)',
              lineRange: [18, 18],
              body: 'Forward produces logits for all positions, but only the last one matters. Embedding converts IDs to vectors, Linear projects vectors to vocabulary logits.',
              risk: 'If model is still in train() or without no_grad(), memory is wasted and behavior is stochastic.',
            },
            {
              id: 'slice',
              label: 'logits[:,-1,:]',
              shape: 'logits (B,V)',
              lineRange: [19, 19],
              body: 'We slice only the last temporal position: that one decides the next token. The rest of the context serves only as memory.',
              risk: 'Taking all positions (full logits) and argmax on the wrong dimension yields a wrongly shaped tensor.',
            },
            {
              id: 'argmax',
              label: 'argmax → next_id',
              shape: 'int (B,1)',
              lineRange: [20, 20],
              body: 'Argmax picks the vocabulary index with the highest score. It is a deterministic decision (sampling could be used instead).',
              risk: 'Argmax produces repetitive, predictable text. In production, temperature sampling or top-k/top-p is preferred.',
            },
            {
              id: 'concat',
              label: 'torch.cat',
              shape: '(B, T+1)',
              lineRange: [21, 21],
              body: 'We concatenate the new token into context. The next forward will see this token as part of the input.',
              risk: 'If context grows without bound, it exceeds the model window. In production, truncation or sliding window is required.',
            },
          ],
          edges: [
            { from: 'context', to: 'forward' },
            { from: 'forward', to: 'slice' },
            { from: 'slice', to: 'argmax' },
            { from: 'argmax', to: 'concat' },
            { from: 'concat', to: 'forward' },
          ],
          loopLabel: 'auto loop',
          prevLabel: '← Previous',
          nextLabel: 'Next →',
          stepLabel: 'Node',
          resetLabel: 'Reset',
          bridgeTitle: 'Training vs inference',
          bridgeBody: 'During training, the model sees x and shifted targets and uses cross-entropy to compute loss. During inference, there are no targets — the model generates one token at a time from context, in autoregressive mode. Same architecture, two usage modes.',
          failureTitle: 'Recurring failures',
          failureModes: [
            { label: 'No eval()', value: 'Dropout still active produces stochastic outputs between passes.' },
            { label: 'No no_grad()', value: 'Graph accumulates unnecessarily, blowing up memory.' },
            { label: 'Infinite context', value: 'No context limit causes the tensor to grow until it exceeds the model window.' },
          ],
          footer: 'Generation closes the model cycle: from training to text. Next step: persist the model for deployment via checkpoint.',
        },
      },
    },
  },
});
