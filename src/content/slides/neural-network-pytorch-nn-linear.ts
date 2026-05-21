import { defineSlide } from './_factory';

export const neuralNetworkPytorchNnLinear = defineSlide({
  id: 'neural-network-pytorch-nn-linear',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: '`nn.Linear`: projeção, não “camada mágica”',
      body: `O slide anterior mostrou que cada token vira um vetor denso de tamanho \`C\` via embedding. Agora o modelo precisa **transformar esse vetor em uma decisão**: qual token vem a seguir?

O problema é este:
- Temos um vetor \`h \\in \\mathbb{R}^C\` para cada posição da sequência;
- Precisamos de um **placar** sobre as \`V\` palavras do vocabulário;
- Esse placar precisa ser treinável para aprender qual contexto favorece qual token.

A ferramenta para isso é \`nn.Linear(in, out)\`, que aplica uma transformação afim em cada vetor da última dimensão:

\`y = xW^T + b\`

(onde \`x\` é o vetor de entrada de dimensão \`in\`, \`W\` é a matriz de pesos de dimensão \`out × in\`, ^T é a transposição, e \`b\` é o vetor de bias de dimensão \`out\` — o resultado é o produto escalar de cada vetor pela matriz de pesos transposta, seguido de soma do bias, projeto independente em cada posição do tensor)

No contrato clássico \`(B,T,C)\` de language models:
- \`B\` = batch (quantas sequências em paralelo),
- \`T\` = tempo/comprimento da sequência (tokens por sequência),
- \`C\` = **dimensão de embedding / hidden dimension** (largura vetorial por token, já definida no slide de embedding-intro).

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
      body: `The previous slide showed that each token becomes a dense vector of size \`C\` via embedding. Now the model needs to **turn that vector into a decision**: which token comes next?

The problem is:
- We have a vector \`h \\in \\mathbb{R}^C\` for each sequence position;
- We need a **scoreboard** over the \`V\` vocabulary words;
- That scoreboard must be trainable to learn which context favors which token.

The tool for this is \`nn.Linear(in, out)\`, which applies an affine transform on vectors from the last axis:

\`y = xW^T + b\`

(where \`x\` is the input vector of dimension \`in\`, \`W\` is the weight matrix of dimension \`out × in\`, ^T is the transpose, and \`b\` is the bias vector of dimension \`out\` — the result is the dot product of each vector by the transposed weight matrix, followed by bias addition, projected independently at each position of the tensor)

In the standard LM tensor contract \`(B,T,C)\`:
- \`B\` = batch (how many sequences run in parallel),
- \`T\` = time/sequence length (tokens per sequence),
- \`C\` = **embedding dimension / hidden dimension** (per-token vector width, already established in the embedding-intro slide).

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
          subtitle: '',
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
          subtitle: '',
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
