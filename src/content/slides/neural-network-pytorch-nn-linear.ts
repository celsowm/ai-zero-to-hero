import { defineSlide } from './_factory';

export const neuralNetworkPytorchNnLinear = defineSlide({
  id: 'neural-network-pytorch-nn-linear',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: '`nn.Linear`: projeção, não “camada mágica”',
      body: `Pergunta-problema deste ponto: **como transformar representação interna em decisão sobre vocabulário?**

A resposta operacional começa em \`nn.Linear(in, out)\`, que aplica uma transformação afim em cada vetor da última dimensão:

\`y = xW^T + b\`

No contrato clássico \`(B,T,C)\` de language models:
- \`B\` = batch (quantas sequências em paralelo),
- \`T\` = tempo/comprimento da sequência (tokens por sequência),
- \`C\` = **dimensão de embedding / hidden dimension** (às vezes chamada de channels/capacity, mas aqui a leitura prática é largura vetorial por token).

Por isso, \`nn.Linear(C, V)\` e \`nn.Linear(C, C)\` ignoram totalmente \`B\` e \`T\`: a camada projeta, de forma isolada, cada vetor de tamanho \`C\` na última dimensão.

Leitura operacional para LM:
1. **não mistura batch/tempo**: só atua no eixo final.
2. **troca largura de representação**: \`C -> V\`, \`C -> C\`, \`C -> 4C\`.
3. **define semântica da saída**:
   - \`C -> V\` = logits do vocabulário;
   - \`C -> C\` = transformação interna no residual stream.
4. **compartilha pesos no tempo**: a mesma matriz é aplicada a todas as posições da grade \`(B,T)\`.

No contexto de LM, isso conecta diretamente ao passo de logits e reaparece depois em MLP e blocos Transformer.

Se você confunde isso, perde a leitura do modelo.
\`Linear\` responde sempre: **“qual dimensão estou projetando para qual outra dimensão?”**`,
    },
    'en-us': {
      title: '`nn.Linear`: projection, not a “magic layer”',
      body: `Core question at this point: **how do we turn internal representation into a vocabulary decision?**

The operational answer starts with \`nn.Linear(in, out)\`, which applies an affine transform on vectors from the last axis:

\`y = xW^T + b\`

In the standard LM tensor contract \`(B,T,C)\`:
- \`B\` = batch (how many sequences run in parallel),
- \`T\` = time/sequence length (tokens per sequence),
- \`C\` = **embedding dimension / hidden dimension** (sometimes called channels/capacity, but operationally this is the per-token vector width).

That is why \`nn.Linear(C, V)\` and \`nn.Linear(C, C)\` completely ignore \`B\` and \`T\`: the layer projects each size-\`C\` vector independently on the last axis.

Operational reading for LM:
1. **it does not mix batch/time**: it acts only on the final axis.
2. **it changes representation width**: \`C -> V\`, \`C -> C\`, \`C -> 4C\`.
3. **it defines output semantics**:
   - \`C -> V\` = vocabulary logits;
   - \`C -> C\` = internal residual-stream transform.
4. **it shares weights across time**: the same matrix is applied to every position on the \`(B,T)\` grid.

In LM context, this connects directly to logits and returns later in MLP and Transformer blocks.

If this is unclear, model reading breaks down.
\`Linear\` always answers: **“which dimension am I projecting into which new dimension?”**`,
    },
  },
  visual: {
    id: 'pytorch-projection-space',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Mapa de shape' }],
        codePanel: {
          title: 'Projeção mínima: embedding -> logits',
          description: 'Exemplo curto onde `Linear` troca a última dimensão sem mexer em lote e sequência.',
          source: { snippetId: 'pytorch-lm/linear-to-logits', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 4], content: 'Definimos B, T, C e V para deixar explícito: lote, tempo, largura interna e tamanho do vocabulário.' },
            { lineRange: [6, 7], content: 'A embedding gera vetores de largura C e a camada linear converte esses vetores em pontuações de vocabulário (C -> V).' },
            { lineRange: [9, 11], content: 'No forward, cada ID vira vetor e depois vira logits; isso acontece posição por posição no lote inteiro.' },
            { lineRange: [13, 14], content: 'Os prints confirmam o ponto central: B e T são preservados, e só a última dimensão muda.' },
          ],
        },
        blueprintPanel: {
          title: 'Como ler `Linear` sem cair em abstração vazia',
          subtitle: 'Perguntas que você deve responder ao ver `nn.Linear` no código.',
          stages: [
            { label: 'Entrada', title: 'O `Linear` enxerga vetores da última dimensão', shape: '(B,T,C)', body: 'Batch e tempo continuam sendo contexto externo. O que a camada realmente consome é cada vetor de largura C.', reading: 'A pergunta certa não é “qual o rank do tensor?”, mas “qual vetor está sendo projetado?”.' },
            { label: 'Projeção', title: 'A mesma matriz atua em paralelo na grade inteira', shape: 'W: C -> V', body: 'Não existe uma matriz por token ou por posição temporal. A mesma transformação é compartilhada em todas as células de `(B,T)`.', reading: 'Isso explica por que `Linear` muda semântica sem misturar batch nem tempo.' },
            { label: 'Saída', title: 'A largura muda e o significado muda junto', shape: '(B,T,V)', body: 'Quando a saída vira V, cada posição passa a carregar um placar sobre o vocabulário. O resultado não é “mais um tensor”; é uma decisão bruta de próximo token.', reading: '`C -> V` é mudança de papel, não só mudança de shape.' },
          ],
          invariantsTitle: 'Invariantes',
          invariants: [
            '`nn.Linear` atua só no último eixo.',
            'Batch e tempo são preservados.',
            'A nova largura define a semântica da saída.',
          ],
          diagnosticsTitle: 'Erros comuns',
          diagnostics: [
            'Ler `Linear` como caixa-preta e esquecer qual dimensão entra e qual sai.',
            'Assumir que a camada mistura posições temporais quando ela só projeta vetores locais.',
            'Ver `C -> V` como detalhe matemático e perder que isso produz logits.',
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
            { lineRange: [1, 4], content: 'We define B, T, C, and V explicitly: batch size, sequence length, hidden width, and vocabulary size.' },
            { lineRange: [6, 7], content: 'Embedding creates C-wide vectors, and the linear layer projects those vectors into vocabulary scores (C -> V).' },
            { lineRange: [9, 11], content: 'In forward, each ID becomes a vector and then logits; this runs position-by-position across the full batch.' },
            { lineRange: [13, 14], content: 'The prints verify the key invariant: B and T stay fixed while only the last axis changes.' },
          ],
        },
        blueprintPanel: {
          title: 'How to read `Linear` without empty abstraction',
          subtitle: 'Questions you should answer every time `nn.Linear` appears.',
          stages: [
            { label: 'Input', title: '`Linear` sees vectors on the last axis', shape: '(B,T,C)', body: 'Batch and time stay as outer structure. What the layer actually consumes is each width-C vector.', reading: 'The right question is not “what rank is this tensor?”, but “which vector is being projected?”.' },
            { label: 'Projection', title: 'The same matrix acts across the full grid', shape: 'W: C -> V', body: 'There is not one matrix per token or per time step. The same transformation is shared across every `(B,T)` cell.', reading: 'That is why `Linear` changes semantics without mixing batch or time.' },
            { label: 'Output', title: 'Changing width also changes meaning', shape: '(B,T,V)', body: 'Once output width becomes V, each position carries a vocabulary scoreboard. The result is not “just another tensor”; it is a raw next-token decision surface.', reading: '`C -> V` is a change of role, not only a change of shape.' },
          ],
          invariantsTitle: 'Invariants',
          invariants: [
            '`nn.Linear` acts only on the last axis.',
            'Batch and time are preserved.',
            'The new width defines output semantics.',
          ],
          diagnosticsTitle: 'Common failures',
          diagnostics: [
            'Reading `Linear` as a black box and forgetting which dimension enters and which exits.',
            'Assuming the layer mixes time positions when it only projects local vectors.',
            'Treating `C -> V` as math trivia instead of the step that creates logits.',
          ],
          footer: 'Reading rule: in LM stacks, most block transitions are ultimately `Linear` projections.',
        },
      },
    },
  },
});
