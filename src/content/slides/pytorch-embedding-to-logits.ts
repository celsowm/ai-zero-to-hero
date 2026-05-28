import { defineSlide } from './_factory';

export const pytorchEmbeddingToLogits = defineSlide({
  id: 'pytorch-embedding-to-logits',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Embedding -> logits: contrato formal de previsão',
      body: `Aqui vemos o caminho completo até a loss.

Começamos com tokens de entrada:

\`\`\`text
idx.shape = (B, T)
\`\`\`

No exemplo:

\`\`\`text
B = 2
T = 4
C = 8
V = 100
\`\`\`

O embedding transforma cada ID de token em um vetor interno de tamanho C:

\`\`\`text
H = embedding(idx)
\`\`\`

Resultado:

\`\`\`text
H.shape = (B, T, C)
\`\`\`

Ou seja: para cada item do lote e para cada posição da sequência, temos agora um vetor de representação.

Depois usamos uma projeção linear:

\`\`\`text
out_proj = nn.Linear(C, V)
\`\`\`

Ela transforma cada vetor interno em scores sobre o vocabulário:

\`\`\`text
logits = out_proj(H)
\`\`\`

Resultado:

\`\`\`text
logits.shape = (B, T, V)
\`\`\`

Cada posição agora tem V scores, um para cada token possível.

Para calcular a loss, juntamos as dimensões B e T:

\`\`\`text
logits_flat.shape = (B * T, V)
targets_flat.shape = (B * T)
\`\`\`

Isso transforma todas as posições de todos os exemplos em uma lista de previsões.

A função cross_entropy compara, para cada posição, os scores do modelo com o token correto em targets.

\`\`\`text
loss = F.cross_entropy(logits_flat, targets_flat)
\`\`\`

Essa loss é um único número escalar: quanto menor, melhor o modelo está prevendo os tokens corretos.

Também pegamos:

\`\`\`text
next_token_scores = logits[:, -1, :]
\`\`\`

Isso seleciona os scores da última posição da sequência, normalmente usados para escolher o próximo token na geração.

Resultado:

\`\`\`text
next_token_scores.shape = (B, V)
\`\`\`

> **Observação:** nesse código, \`targets\` é aleatório só para demonstrar o formato. Em um modelo de linguagem real, os targets normalmente seriam os próprios tokens deslocados uma posição para frente.`,
    },
    'en-us': {
      title: 'Embedding -> logits: formal prediction contract',
      body: `Here we see the full path to the loss.

We start with input tokens:

\`\`\`text
idx.shape = (B, T)
\`\`\`

In the example:

\`\`\`text
B = 2
T = 4
C = 8
V = 100
\`\`\`

The embedding turns each token ID into an internal vector of size C:

\`\`\`text
H = embedding(idx)
\`\`\`

Result:

\`\`\`text
H.shape = (B, T, C)
\`\`\`

That is: for each item in the batch and each position in the sequence, we now have a representation vector.

Then we use a linear projection:

\`\`\`text
out_proj = nn.Linear(C, V)
\`\`\`

It transforms each internal vector into scores over the vocabulary:

\`\`\`text
logits = out_proj(H)
\`\`\`

Result:

\`\`\`text
logits.shape = (B, T, V)
\`\`\`

Each position now has V scores, one for each possible token.

To compute the loss, we merge the B and T dimensions:

\`\`\`text
logits_flat.shape = (B * T, V)
targets_flat.shape = (B * T)
\`\`\`

This turns all positions across all examples into a flat list of predictions.

The cross_entropy function compares, for each position, the model's scores against the correct token in targets.

\`\`\`text
loss = F.cross_entropy(logits_flat, targets_flat)
\`\`\`

This loss is a single scalar: the lower it is, the better the model predicts the correct tokens.

We also take:

\`\`\`text
next_token_scores = logits[:, -1, :]
\`\`\`

This selects the scores from the last sequence position, typically used to choose the next token during generation.

Result:

\`\`\`text
next_token_scores.shape = (B, V)
\`\`\`

> **Note:** in this code, \`targets\` is random only to demonstrate the format. In a real language model, the targets would normally be the tokens themselves shifted one position forward.`,
    },
  },
  visual: {
    id: 'pytorch-embedding-logits-contract',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Pipeline interativo' }],
        interactive: {
          title: 'Pipeline interativo: idx → H → logits → loss / next',
          subtitle: 'Ajuste B, T, C, V e percorra cada estágio para ver como o tensor muda de forma e papel. (B=lote, T=tempo, C=largura da representação, V=vocabulário).',
          sliders: { batch: 'B (batch)', time: 'T (tempo)', channels: 'C (canais)', vocab: 'V (vocab)' },
          legend: {
            idx: 'idx (B,T) — ids inteiros por posição',
            hidden: 'H (B,T,C) — vetores contínuos',
            logits: 'logits (B,T,V) — scores por classe',
            loss: '(B*T, V) vs (B*T) — cross-entropy',
            next: 'logits[:, -1, :] → (B,V) — próximo token',
          },
          playLabel: '▶ Animar',
          pauseLabel: '⏸ Pausar',
          resetLabel: '↺ Reset',
        },
        codePanel: {
          title: 'Contrato completo: idx -> embedding -> logits -> loss',
          description: 'Snippet único com forward, flatten para cross-entropy e slice de inferência autoregressiva.',
          source: { snippetId: 'pytorch-lm/embedding-logits-contract', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 3], content: 'Importamos PyTorch, os módulos de rede e a função de perda cross-entropy; isso prepara, no mesmo snippet, a parte do modelo e a parte do cálculo de erro.' },
            { lineRange: [5, 7], content: 'Definimos quatro tamanhos do problema: B (lote), T (comprimento da sequência), C (largura do vetor interno) e V (tamanho do vocabulário). Com esses valores, criamos a embedding e a camada final que projeta para o vocabulário.' },
            { lineRange: [9, 10], content: 'Geramos `idx` e `targets` como inteiros no formato `(B, T)`, que é o formato esperado para entrada tokenizada e alvo por posição temporal.' },
            { lineRange: [12, 13], content: 'No forward, os IDs viram vetores `(B, T, C)` via embedding e depois viram logits `(B, T, V)` via projeção final; cada token passa a ter um placar sobre todo o vocabulário.' },
            { lineRange: [15, 16], content: 'Fazemos o flatten de logits e targets para o formato exigido pela cross-entropy: uma linha de predição por posição e um alvo correspondente por posição.' },
            { lineRange: [18, 18], content: 'Aqui calculamos uma loss escalar única do lote, que é o número usado no backward para orientar atualização de pesos.' },
            { lineRange: [20, 20], content: 'Para inferência autoregressiva, pegamos só a última posição temporal, porque é ela que decide o próximo token da sequência.' },
            { lineRange: [22, 26], content: 'Os prints finais funcionam como checklist rápido de contrato: shape de hidden, shape de logits, shape após flatten e formato da loss.' },
          ],
        },
        blueprintPanel: {
          title: 'Cadeia causal de espaços',
          subtitle: 'Este slide não é sobre camada isolada; é sobre o contrato ponta-a-ponta que conecta representação e decisão. (B=lote, T=tempo, C=largura da representação, V=vocabulário).',
          stages: [
            {
              label: '1. idx discreto',
              title: 'Identidade simbólica por tempo',
              shape: 'idx -> (B,T)',
              body: 'Entrada é inteiro discreto. Não há geometria vetorial aqui; há apenas índice por posição temporal.',
              reading: 'Primeira verificação: dtype inteiro e alinhamento temporal de entrada/alvo.',
            },
            {
              label: '2. embedding',
              title: 'Levantamento para espaço contínuo',
              shape: 'H -> (B,T,C)',
              body: 'Lookup parametrizado consulta E e produz representações treináveis com largura C sem alterar B nem T.',
              reading: 'Aqui nasce o espaço de representação onde blocos internos operam.',
            },
            {
              label: '3. output projection',
              title: 'Mapeamento C -> V',
              shape: 'logits -> (B,T,V)',
              body: 'A cabeça linear aplica o mesmo operador em toda grade (B,T) e gera scores por classe na base do vocabulário.',
              reading: 'V é espaço de decisão; ainda sem normalização probabilística.',
            },
            {
              label: '4. training consume',
              title: 'Cross-entropy exige flatten alinhado',
              shape: '(B*T,V) vs (B*T)',
              body: 'O cubo temporal e reindexado para lista de casos de classificacao mantendo correspondencia token-a-token. Esse escalar cumpre o mesmo papel estrutural que o MSE cumpria em regressao.',
              reading: 'Flatten errado mantem shape valido mas corrompe supervisao.',
            },
            {
              label: '5. inference slice',
              title: 'Decisão na última posição',
              shape: 'logits[:, -1, :] -> (B,V)',
              body: 'Na geração autoregressiva, apenas o último passo temporal participa da escolha do próximo índice.',
              reading: 'Treino consome toda a sequência; inferência consome o corte final.',
            },
          ],
          diagnosticsTitle: 'Falhas de leitura frequentes',
          diagnostics: [
            'Confundir `C` com `V` e interpretar projeção de saída como continuação do espaço de representação.',
            'Usar `targets` fora de `torch.long`, quebrando a semântica discreta da cross-entropy.',
            'Perder alinhamento temporal no flatten (`logits` e `targets` deixam de se referir ao mesmo token).',
          ],
          footer: 'Contrato mental: embedding constrói representação; projeção constrói decisão; loss e slice definem o uso operacional do mesmo tensor.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Interactive pipeline' }],
        interactive: {
          title: 'Interactive pipeline: idx → H → logits → loss / next',
          subtitle: 'Tune B, T, C, V and step through each stage to see how the tensor changes shape and role. (B=batch size, T=sequence length, C=representation width, V=vocabulary size).',
          sliders: { batch: 'B (batch)', time: 'T (time)', channels: 'C (channels)', vocab: 'V (vocab)' },
          legend: {
            idx: 'idx (B,T) — integer ids per position',
            hidden: 'H (B,T,C) — continuous vectors',
            logits: 'logits (B,T,V) — per-class scores',
            loss: '(B*T, V) vs (B*T) — cross-entropy',
            next: 'logits[:, -1, :] → (B,V) — next token',
          },
          playLabel: '▶ Animate',
          pauseLabel: '⏸ Pause',
          resetLabel: '↺ Reset',
        },
        codePanel: {
          title: 'Full contract: idx -> embedding -> logits -> loss',
          description: 'Single snippet with forward pass, cross-entropy flattening, and autoregressive inference slice.',
          source: { snippetId: 'pytorch-lm/embedding-logits-contract', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 3], content: 'We import PyTorch, neural-network modules, and the cross-entropy loss function, so model definition and error computation live in the same example.' },
            { lineRange: [5, 7], content: 'We define four core sizes: B (batch size), T (sequence length), C (hidden vector width), and V (vocabulary size). Then we initialize embedding and the final projection layer to vocabulary space.' },
            { lineRange: [9, 10], content: 'We create `idx` and `targets` as integer tensors in `(B, T)`, which is the expected tokenized input/target format per time position.' },
            { lineRange: [12, 13], content: 'In forward, IDs become `(B, T, C)` vectors through embedding, then become `(B, T, V)` logits through output projection; each token position now has scores over the full vocabulary.' },
            { lineRange: [15, 16], content: 'We flatten logits and targets into the exact cross-entropy input format: one prediction row per position and one matching target per position.' },
            { lineRange: [18, 18], content: 'Here we compute one scalar loss for the batch, which is the value used by backward to drive weight updates.' },
            { lineRange: [20, 20], content: 'For autoregressive inference, we keep only the final time position, because that slice is what chooses the next token.' },
            { lineRange: [22, 26], content: 'The final prints are a quick contract check: hidden shape, logits shape, flattened shapes, and loss shape.' },
          ],
        },
        blueprintPanel: {
          title: 'Causal chain of spaces',
          subtitle: 'This slide is not about one isolated layer; it is about the end-to-end contract linking representation and decision. (B=batch size, T=sequence length, C=representation width, V=vocabulary size).',
          stages: [
            {
              label: '1. discrete idx',
              title: 'Symbolic identity over time',
              shape: 'idx -> (B,T)',
              body: 'Input is discrete integer data. No vector geometry exists yet; only one index per time position.',
              reading: 'First check: integer dtype and temporal alignment between input and targets.',
            },
            {
              label: '2. embedding',
              title: 'Lift into continuous space',
              shape: 'H -> (B,T,C)',
              body: 'Parameterized lookup reads E and emits trainable width-C representations without changing B or T.',
              reading: 'This is where representation space begins for downstream blocks.',
            },
            {
              label: '3. output projection',
              title: 'Map C -> V',
              shape: 'logits -> (B,T,V)',
              body: 'The output head applies one shared operator across the full (B,T) grid and produces per-class scores over vocabulary basis.',
              reading: 'V is decision space; still pre-normalization.',
            },
            {
              label: '4. training consume',
              title: 'Cross-entropy requires aligned flattening',
              shape: '(B*T,V) vs (B*T)',
              body: 'The temporal cube is reindexed into a list of classification cases while preserving token-to-token correspondence. This scalar plays the same structural role MSE had in regression.',
              reading: 'Wrong flattening can keep valid shapes while corrupting supervision.',
            },
            {
              label: '5. inference slice',
              title: 'Decision at the final position',
              shape: 'logits[:, -1, :] -> (B,V)',
              body: 'In autoregressive generation, only the last time step is used to pick the next index.',
              reading: 'Training consumes all positions; inference consumes the final slice.',
            },
          ],
          diagnosticsTitle: 'Frequent interpretation failures',
          diagnostics: [
            'Confusing `C` with `V` and reading output projection as continuation of representation space.',
            'Using targets outside `torch.long`, breaking cross-entropy class semantics.',
            'Losing temporal alignment during flattening (`logits` no longer match the same-token targets).',
          ],
          footer: 'Mental contract: embedding builds representation; projection builds decision; loss and slice define operational usage of the same tensor.',
        },
      },
    },
  },
});
