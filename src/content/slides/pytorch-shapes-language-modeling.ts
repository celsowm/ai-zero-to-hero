import { defineSlide } from './_factory';

export const pytorchShapesLanguageModeling = defineSlide({
  id: 'pytorch-shapes-language-modeling',
  type: 'two-column',
  options: { columnRatios: [0.42, 0.58] },
  content: {
    'pt-br': {
      title: 'Convencoes de shape para LM (language model)',
      body: `Agora formalizamos o dicionário e introduzimos o termo novo deste bloco: **logits**.

O que são logits:
- são **scores brutos** que o modelo gera para cada token do vocabulário;
- ainda **não são probabilidades**;
- viram probabilidades depois de uma normalização (softmax), feita internamente pela cross-entropy no treino.

- **B** = batch
- **T** = sequência
- **C** = hidden size
- **V** = vocabulário

Contrato mínimo de treino:
- \`idx\` e \`targets\` sempre inteiros em \`(B, T)\`
- hidden states em \`(B, T, C)\`
- logits em \`(B, T, V)\` = para cada posição temporal, um vetor de \`V\` scores
- flatten para loss: \`logits -> (B*T, V)\` e \`targets -> (B*T)\`

Fechando o ciclo:
- logits viram distribuicao
- a distribuicao vira escolha de indice (argmax ou sampling) na geracao

Invariantes de sanidade:
1. \`idx/targets\` usam \`torch.long\`
2. tensores comparados na loss ficam no mesmo device
3. loss final é escalar`,
    },
    'en-us': {
      title: 'Shape conventions for LM (language model)',
      body: `Now we formalize the dictionary and introduce the new term in this block: **logits**.

What logits are:
- they are **raw scores** the model outputs for each vocabulary token;
- they are **not probabilities yet**;
- they become probabilities after normalization (softmax), applied internally by cross-entropy during training.

- **B** = batch
- **T** = sequence
- **C** = hidden size
- **V** = vocabulary

Minimum training contract:
- \`idx\` and \`targets\` are always integer tensors in \`(B, T)\`
- hidden states are \`(B, T, C)\`
- logits are \`(B, T, V)\` = for each time position, one vector of \`V\` scores
- loss flattening: \`logits -> (B*T, V)\` and \`targets -> (B*T)\`

Closing the loop:
- logits become a distribution
- the distribution becomes an index choice (argmax or sampling) during generation

Sanity invariants:
1. \`idx/targets\` use \`torch.long\`
2. tensors in the loss are on the same device
3. final loss is scalar`,
    },
  },
  visual: {
    id: 'pytorch-shape-trace-flow',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Shape Trace' }],
        codePanel: {
          title: 'Contrato de shape completo',
          description: 'Snippet curto para validar shape, dtype, flatten e loss em uma passada.',
          source: { snippetId: 'pytorch-lm/shape-contract', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 4], content: 'Definimos o dicionário B/T/C/V e preparamos cross-entropy.' },
            { lineRange: [6, 9], content: 'Criamos entrada, alvo, estados e logits no contrato esperado.' },
            { lineRange: [11, 13], content: 'Flatten transforma saída e alvo para o formato exigido pela loss.' },
            { lineRange: [15, 21], content: 'Impressões finais checam shape, dtype, device e escalar da loss.' },
          ],
        },
        tracePanel: {
          title: 'Como ler o forward sem se perder nos tensores',
          subtitle: 'Em vez de decorar shapes soltos, siga o papel de cada tensor do input ate a loss e depois ate a geracao.',
          stages: [
            {
              kicker: '1. Entrada',
              title: 'IDs inteiros entram no modelo',
              shape: 'idx, targets -> (B, T)',
              role: 'O modelo nao recebe palavras prontas. Ele recebe indices que apontam para o vocabulario, preservando batch e ordem temporal.',
              debugHint: 'Se aqui o dtype nao for inteiro, o embedding ja falha ou a loss quebra depois.',
            },
            {
              kicker: '2. Estado',
              title: 'Cada posicao vira representacao',
              shape: 'hidden -> (B, T, C)',
              role: 'Depois de embedding e camadas internas, cada token ganha um vetor contextualizado de largura C. Ainda nao ha escolha de palavra; ha representacao.',
              debugHint: 'Se esse eixo C sumir ou trocar de lugar, a cabeca final deixa de saber projetar para o vocabulario.',
            },
            {
              kicker: '3. Logits',
              title: 'A previsao nasce no eixo V',
              shape: 'logits -> (B, T, V)',
              role: 'A cabeca final transforma cada estado interno em um placar bruto sobre o vocabulario inteiro. Cada fatia logits[b,t,:] e uma disputa entre todas as palavras possiveis.',
              debugHint: 'Aqui aparece o conceito novo: logits nao sao probabilidade; sao scores antes de normalizacao.',
            },
            {
              kicker: '4. Flatten',
              title: 'Tempo vira lista de decisoes',
              shape: '(B*T, V) + (B*T)',
              role: 'A cross-entropy nao compara um cubo temporal. Ela quer uma lista de casos de classificacao: uma linha de logits por posicao, um alvo por posicao.',
              debugHint: 'Se o flatten estiver errado, a loss continua rodando, mas passa a comparar tokens desalinhados.',
            },
            {
              kicker: '5. Loss',
              title: 'O treino penaliza o token errado',
              shape: 'loss -> escalar',
              role: 'A cross-entropy olha o placar inteiro do vocabulario, aplica softmax internamente e aumenta a penalizacao quando o token correto recebe pouca massa.',
              debugHint: 'No fim, a loss precisa ser um unico numero. Se nao for, o contrato de shape quebrou antes.',
            },
          ],
          failureTitle: 'Onde depurar primeiro',
          failureModes: [
            { label: 'dtype', value: '`targets` precisa estar em `torch.long`; caso contrario, a cross-entropy nao entende classes discretas.' },
            { label: 'device', value: 'logits e targets precisam morar no mesmo device; mismatch aqui normalmente interrompe o treino na hora.' },
            { label: 'alinhamento', value: 'O flatten certo nao e detalhe: ele garante que cada linha de logits encontre exatamente o target da mesma posicao temporal.' },
          ],
          inferenceTitle: 'O mesmo tensor, outro recorte',
          inferenceSnippet: 'logits[:, -1, :]',
          inferenceBody: 'Na inferencia, nao usamos todas as posicoes para calcular erro. Pegamos apenas o placar da ultima posicao, transformamos em distribuicao e escolhemos o proximo indice por argmax ou sampling.',
          footer: 'Regra mental: hidden state e representacao; logits sao decisao bruta sobre o vocabulario; probabilidade entra so na etapa seguinte.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Shape Trace' }],
        codePanel: {
          title: 'Full shape contract',
          description: 'Compact snippet to validate shape, dtype, flattening, and loss in one pass.',
          source: { snippetId: 'pytorch-lm/shape-contract', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 4], content: 'We define the B/T/C/V dictionary and prepare cross-entropy.' },
            { lineRange: [6, 9], content: 'We create input, target, hidden states, and logits in the expected contract.' },
            { lineRange: [11, 13], content: 'Flattening adapts outputs/targets to the loss-required format.' },
            { lineRange: [15, 21], content: 'Final prints verify shape, dtype, device, and scalar loss.' },
          ],
        },
        tracePanel: {
          title: 'How to read the forward pass without getting lost in tensors',
          subtitle: 'Instead of memorizing isolated shapes, follow each tensor from input to loss and then into generation.',
          stages: [
            {
              kicker: '1. Input',
              title: 'Integer IDs enter the model',
              shape: 'idx, targets -> (B, T)',
              role: 'The model does not receive words directly. It receives vocabulary indices, while preserving batch structure and temporal order.',
              debugHint: 'If the dtype is wrong here, the embedding will fail or the loss will break later.',
            },
            {
              kicker: '2. State',
              title: 'Each position becomes a representation',
              shape: 'hidden -> (B, T, C)',
              role: 'After embeddings and internal layers, each token position gets a contextual vector of width C. No word has been chosen yet; this is still representation space.',
              debugHint: 'If axis C disappears or moves, the final head can no longer project into vocabulary space correctly.',
            },
            {
              kicker: '3. Logits',
              title: 'Prediction is born on axis V',
              shape: 'logits -> (B, T, V)',
              role: 'The final head turns each internal state into a raw scoreboard over the full vocabulary. Each slice logits[b,t,:] is a competition between all possible next words.',
              debugHint: 'This is the new concept: logits are not probabilities yet; they are scores before normalization.',
            },
            {
              kicker: '4. Flatten',
              title: 'Time becomes a list of decisions',
              shape: '(B*T, V) + (B*T)',
              role: 'Cross-entropy does not compare a temporal cube. It wants a list of classification cases: one logits row per position, one target per position.',
              debugHint: 'If flattening is wrong, the loss may still run while comparing misaligned tokens.',
            },
            {
              kicker: '5. Loss',
              title: 'Training penalizes the wrong token',
              shape: 'loss -> scalar',
              role: 'Cross-entropy inspects the full vocabulary scoreboard, applies softmax internally, and increases the penalty when the correct token receives too little mass.',
              debugHint: 'At the end, loss must collapse into a single number. If not, the shape contract was violated earlier.',
            },
          ],
          failureTitle: 'Where to debug first',
          failureModes: [
            { label: 'dtype', value: '`targets` must be `torch.long`; otherwise cross-entropy cannot interpret them as discrete classes.' },
            { label: 'device', value: 'logits and targets must live on the same device; mismatches here usually stop training immediately.' },
            { label: 'alignment', value: 'Correct flattening is not cosmetic: it ensures each logits row meets the target from the same time position.' },
          ],
          inferenceTitle: 'The same tensor, a different slice',
          inferenceSnippet: 'logits[:, -1, :]',
          inferenceBody: 'At inference time, we do not use all positions to compute error. We keep only the scoreboard for the last position, turn it into a distribution, and choose the next index via argmax or sampling.',
          footer: 'Mental rule: hidden state is representation; logits are the raw decision over the vocabulary; probabilities come one step later.',
        },
      },
    },
  },
});
