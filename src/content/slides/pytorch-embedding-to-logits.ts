import { defineSlide } from './_factory';

export const pytorchEmbeddingToLogits = defineSlide({
  id: 'pytorch-embedding-to-logits',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: 'Embedding -> logits: contrato formal de previsao',
      body: `Problema formal deste slide: como mapear \'idx\' discreto para uma distribuicao de proximo token sem quebrar o contrato de shape?

Notacao do pipeline:
- \`idx \in Z^{BxT}\`
- \`E \in R^{VxC}\`
- \`H = E[idx] \in R^{BxTxC}\`
- \`W_out \in R^{VxC}\`, \`b \in R^V\`
- \`logits = H W_out^T + b \in R^{BxTxV}\`

Leitura operacional por espaco:
1. \`idx\` carrega identidade discreta por posicao temporal.
2. \`Embedding\` move para espaco continuo parametrizado (representacao \`C\`).
3. Projecao de saida transforma representacao em scores nao normalizados por classe.

Consumo do tensor em treino e inferencia:
- treino com \`cross_entropy\`: \`(B*T,V)\` contra \`(B*T)\` via flatten alinhado;
- inferencia autoregressiva: \`logits[:, -1, :]\` para escolher o proximo indice.

Regra de rigor: \`C\` e espaco de representacao; \`V\` e espaco de decisao. Misturar esses papeis quebra leitura e debug.`,
    },
    'en-us': {
      title: 'Embedding -> logits: formal prediction contract',
      body: `Formal problem for this slide: how do we map discrete \'idx\' into a next-token distribution without breaking shape contracts?

Pipeline notation:
- \`idx \in Z^{BxT}\`
- \`E \in R^{VxC}\`
- \`H = E[idx] \in R^{BxTxC}\`
- \`W_out \in R^{VxC}\`, \`b \in R^V\`
- \`logits = H W_out^T + b \in R^{BxTxV}\`

Operational reading by space:
1. \`idx\` carries discrete identity per time position.
2. \`Embedding\` moves data into continuous parametric space (representation width \`C\`).
3. Output projection turns representation into non-normalized class scores.

How the tensor is consumed in training and inference:
- training with \`cross_entropy\`: \`(B*T,V)\` against \`(B*T)\` via aligned flattening;
- autoregressive inference: \`logits[:, -1, :]\` to choose the next index.

Rigor rule: \`C\` is representation space; \`V\` is decision space. Mixing these roles breaks interpretation and debugging.`,
    },
  },
  visual: {
    id: 'pytorch-embedding-logits-contract',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Pipeline interativo' }],
        interactive: {
          title: 'Pipeline interativo: idx → H → logits → loss / next',
          subtitle: 'Ajuste B, T, C, V e percorra cada estagio para ver como o tensor muda de forma e papel.',
          sliders: { batch: 'B (batch)', time: 'T (tempo)', channels: 'C (canais)', vocab: 'V (vocab)' },
          legend: {
            idx: 'idx (B,T) — ids inteiros por posicao',
            hidden: 'H (B,T,C) — vetores continuos',
            logits: 'logits (B,T,V) — scores por classe',
            loss: '(B*T, V) vs (B*T) — cross-entropy',
            next: 'logits[:, -1, :] → (B,V) — proximo token',
          },
          playLabel: '▶ Animar',
          pauseLabel: '⏸ Pausar',
          resetLabel: '↺ Reset',
        },
        codePanel: {
          title: 'Contrato completo: idx -> embedding -> logits -> loss',
          description: 'Snippet unico com forward, flatten para cross-entropy e slice de inferencia autoregressiva.',
          source: { snippetId: 'pytorch-lm/embedding-logits-contract', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 3], content: 'Importamos torch, modulos de rede e a cross-entropy funcional.' },
            { lineRange: [5, 7], content: 'Definimos dimensoes estruturais B/T/C/V e inicializamos embedding + cabeca de saida.' },
            { lineRange: [9, 10], content: 'Geramos idx e targets inteiros no contrato base `(B,T)`.' },
            { lineRange: [12, 13], content: 'Forward: IDs viram representacoes `(B,T,C)` e depois logits `(B,T,V)`.' },
            { lineRange: [15, 16], content: 'Flatten alinhado prepara entrada e alvo para `cross_entropy`.' },
            { lineRange: [18, 18], content: 'Calculamos loss escalar de treino.' },
            { lineRange: [20, 20], content: 'Na inferencia autoregressiva, usamos apenas a ultima posicao temporal.' },
            { lineRange: [22, 26], content: 'As impressoes validam shapes criticos para treino e geracao.' },
          ],
        },
        blueprintPanel: {
          title: 'Cadeia causal de espacos',
          subtitle: 'Este slide nao e sobre camada isolada; e sobre o contrato ponta-a-ponta que conecta representacao e decisao.',
          stages: [
            {
              label: '1. idx discreto',
              title: 'Identidade simbolica por tempo',
              shape: 'idx -> (B,T)',
              body: 'Entrada e inteiro discreto. Nao ha geometria vetorial aqui; ha apenas indice por posicao temporal.',
              reading: 'Primeira verificacao: dtype inteiro e alinhamento temporal de entrada/alvo.',
            },
            {
              label: '2. embedding',
              title: 'Levantamento para espaco continuo',
              shape: 'H -> (B,T,C)',
              body: 'Lookup parametrizado consulta E e produz representacoes treinaveis com largura C sem alterar B nem T.',
              reading: 'Aqui nasce o espaco de representacao onde blocos internos operam.',
            },
            {
              label: '3. output projection',
              title: 'Mapeamento C -> V',
              shape: 'logits -> (B,T,V)',
              body: 'A cabeca linear aplica o mesmo operador em toda grade (B,T) e gera scores por classe na base do vocabulario.',
              reading: 'V e espaco de decisao; ainda sem normalizacao probabilistica.',
            },
            {
              label: '4. training consume',
              title: 'Cross-entropy exige flatten alinhado',
              shape: '(B*T,V) vs (B*T)',
              body: 'O cubo temporal e reindexado para lista de casos de classificacao mantendo correspondencia token-a-token.',
              reading: 'Flatten errado mantem shape valido mas corrompe supervisao.',
            },
            {
              label: '5. inference slice',
              title: 'Decisao na ultima posicao',
              shape: 'logits[:, -1, :] -> (B,V)',
              body: 'Na geracao autoregressiva, apenas o ultimo passo temporal participa da escolha do proximo indice.',
              reading: 'Treino consome toda a sequencia; inferencia consome o corte final.',
            },
          ],
          diagnosticsTitle: 'Falhas de leitura frequentes',
          diagnostics: [
            'Confundir `C` com `V` e interpretar projeção de saída como continuação do espaço de representação.',
            'Usar `targets` fora de `torch.long`, quebrando a semântica discreta da cross-entropy.',
            'Perder alinhamento temporal no flatten (`logits` e `targets` deixam de se referir ao mesmo token).',
          ],
          footer: 'Contrato mental: embedding constrói representacao; projeção constrói decisao; loss e slice definem o uso operacional do mesmo tensor.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Interactive pipeline' }],
        interactive: {
          title: 'Interactive pipeline: idx → H → logits → loss / next',
          subtitle: 'Tune B, T, C, V and step through each stage to see how the tensor changes shape and role.',
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
            { lineRange: [1, 3], content: 'We import torch, neural modules, and functional cross-entropy.' },
            { lineRange: [5, 7], content: 'We define structural dimensions B/T/C/V and initialize embedding plus output head.' },
            { lineRange: [9, 10], content: 'We create integer idx and targets in base `(B,T)` contract.' },
            { lineRange: [12, 13], content: 'Forward pass: IDs become `(B,T,C)` representations, then `(B,T,V)` logits.' },
            { lineRange: [15, 16], content: 'Aligned flattening adapts logits/targets to cross-entropy input format.' },
            { lineRange: [18, 18], content: 'We compute scalar training loss.' },
            { lineRange: [20, 20], content: 'For autoregressive inference, we keep only the last time position.' },
            { lineRange: [22, 26], content: 'Prints validate critical shapes for training and generation.' },
          ],
        },
        blueprintPanel: {
          title: 'Causal chain of spaces',
          subtitle: 'This slide is not about one isolated layer; it is about the end-to-end contract linking representation and decision.',
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
              body: 'The temporal cube is reindexed into a list of classification cases while preserving token-to-token correspondence.',
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
