import { defineSlide } from './_factory';

export const neuralNetworkPytorchNnLinear = defineSlide({
  id: 'neural-network-pytorch-nn-linear',
  type: 'two-column',
  options: { columnRatios: [0.52, 0.48] },
  content: {
    'pt-br': {
      title: '`nn.Linear`: projeção, não “camada mágica”',
      body: `\`nn.Linear(in, out)\` aplica uma transformação afim em cada vetor da última dimensão:

\`y = xW^T + b\`

Leitura operacional para LM:
1. **não mistura batch/tempo**: só atua no eixo final.
2. **troca largura de representação**: \`C -> V\`, \`C -> C\`, \`C -> 4C\`.
3. **define semântica da saída**:
   - \`C -> V\` = logits do vocabulário;
   - \`C -> C\` = transformação interna no residual stream.

Se você confunde isso, perde a leitura do modelo.  
\`Linear\` responde sempre: **“qual dimensão estou projetando para qual outra dimensão?”**`,
    },
    'en-us': {
      title: '`nn.Linear`: projection, not a “magic layer”',
      body: `\`nn.Linear(in, out)\` applies an affine transform on vectors from the last axis:

\`y = xW^T + b\`

Operational reading for LM:
1. **it does not mix batch/time**: it acts only on the final axis.
2. **it changes representation width**: \`C -> V\`, \`C -> C\`, \`C -> 4C\`.
3. **it defines output semantics**:
   - \`C -> V\` = vocabulary logits;
   - \`C -> C\` = internal residual-stream transform.

If this is unclear, model reading breaks down.  
\`Linear\` always answers: **“which dimension am I projecting into which new dimension?”**`,
    },
  },
  visual: {
    id: 'pytorch-dual-panel',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Mapa de shape' }],
        codePanel: {
          title: 'Projeção mínima: embedding -> logits',
          description: 'Exemplo curto onde `Linear` troca a última dimensão sem mexer em lote e sequência.',
          source: { snippetId: 'pytorch-lm/linear-to-logits', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 4], content: 'Definimos B/T/C/V para visualizar claramente o contrato de shape.' },
            { lineRange: [6, 7], content: 'Embedding produz vetores de largura C; Linear projeta C para V.' },
            { lineRange: [9, 11], content: 'Forward: IDs -> vetores -> logits para cada token do batch.' },
            { lineRange: [13, 14], content: 'Os prints provam que B e T permanecem; só a dimensão final muda.' },
          ],
        },
        visualPanel: {
          title: 'Como ler `Linear` sem cair em abstração vazia',
          subtitle: 'Perguntas que você deve responder ao ver `nn.Linear` no código.',
          items: [
            { label: 'Entrada real', value: 'Tensor de rank 3 (B,T,C). Cada posição temporal carrega um vetor C.' },
            { label: 'Operação', value: 'Mesma matriz de pesos é aplicada em paralelo para cada vetor da grade (B,T).' },
            { label: 'Saída', value: 'Tensor vira (B,T,V). Isso cria um score por token do vocabulário em cada posição.' },
            { label: 'Semântica', value: '`C -> V` significa “preparar decisão de próximo token”, não só “fazer conta linear”.' },
            { label: 'Erro comum', value: 'Tratar `Linear` como camada genérica e esquecer qual eixo está sendo projetado.' },
          ],
          footer: 'Regra de leitura: em LM, quase toda transição de bloco pode ser explicada por projeções de `Linear`.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Shape Map' }],
        codePanel: {
          title: 'Minimal projection: embedding -> logits',
          description: 'Compact example where `Linear` changes only the last axis while preserving batch and sequence.',
          source: { snippetId: 'pytorch-lm/linear-to-logits', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 4], content: 'We define B/T/C/V to make the shape contract explicit.' },
            { lineRange: [6, 7], content: 'Embedding creates C-width vectors; Linear projects C into V.' },
            { lineRange: [9, 11], content: 'Forward: IDs -> vectors -> logits at each batch-time position.' },
            { lineRange: [13, 14], content: 'Prints confirm B and T stay fixed while only the last axis changes.' },
          ],
        },
        visualPanel: {
          title: 'How to read `Linear` without empty abstraction',
          subtitle: 'Questions you should answer every time `nn.Linear` appears.',
          items: [
            { label: 'Actual input', value: 'Rank-3 tensor (B,T,C). Each time position carries one C-width vector.' },
            { label: 'Operation', value: 'The same weight matrix is applied in parallel over the full (B,T) grid.' },
            { label: 'Output', value: 'Tensor becomes (B,T,V), creating one vocabulary score vector per position.' },
            { label: 'Semantics', value: '`C -> V` means “prepare next-token decision,” not just “do a linear op”.' },
            { label: 'Common failure', value: 'Treating `Linear` as generic and forgetting which axis is being projected.' },
          ],
          footer: 'Reading rule: in LM stacks, most block transitions are ultimately `Linear` projections.',
        },
      },
    },
  },
});
