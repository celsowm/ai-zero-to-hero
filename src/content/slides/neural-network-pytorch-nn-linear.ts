import { defineSlide } from './_factory';

export const neuralNetworkPytorchNnLinear = defineSlide({
  id: 'neural-network-pytorch-nn-linear',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: '`nn.Linear`: projeção, não “camada mágica”',
      body: `Temos representação vetorial por token, mas ainda falta a decisão: **como sair de um vetor interno para escolha de próximo token?**

(B = lote, T = tempo/comprimento da sequência, C = largura da representação interna, V = tamanho do vocabulário)

A camada \`Embedding\` transforma cada token em um vetor denso de tamanho \`C\`.
Depois disso, cada posição da sequência possui uma representação interna:

\`\`\`text
x.shape = (B, T, C)
\`\`\`

Mas o modelo ainda não decidiu qual token vem a seguir.

É aqui que entra a camada:

\`\`\`text
nn.Linear(C, V)
\`\`\`

Ela funciona como uma "cabeça de previsão" (\`head\`), convertendo cada vetor interno de tamanho \`C\` em \`V\` scores, um para cada token possível do vocabulário.

Assim:

\`\`\`text
Embedding:
ID do token → vetor interno

Linear:
vetor interno → scores do vocabulário
\`\`\`

Depois da projeção linear:

\`\`\`text
logits.shape = (B, T, V)
\`\`\`

Ou seja, para cada item do lote e para cada posição da sequência, o modelo produz uma lista com \`V\` valores.

Exemplo conceitual:

\`\`\`text
logits[b, t, 42]  = score do token 42
logits[b, t, 999] = score do token 999
\`\`\`

Quanto maior o score, maior a chance daquele token ser escolhido como próximo token.

Esses scores normalmente passam por \`softmax\`, virando probabilidades sobre todo o vocabulário.`,
    },
    'en-us': {
      title: '`nn.Linear`: projection, not a “magic layer”',
      body: `We have per-token vector representations, but the decision step is still missing: **how do we go from an internal vector to choosing the next token?**

(B = batch, T = time/sequence length, C = internal representation width, V = vocabulary size)

The \`Embedding\` layer turns each token into a dense vector of size \`C\`.
After that, each sequence position has an internal representation:

\`\`\`text
x.shape = (B, T, C)
\`\`\`

But the model hasn't decided which token comes next yet.

This is where the layer comes in:

\`\`\`text
nn.Linear(C, V)
\`\`\`

It works as a "prediction head" (\`head\`), converting each internal vector of size \`C\` into \`V\` scores, one for each possible token in the vocabulary.

So:

\`\`\`text
Embedding:
token ID → internal vector

Linear:
internal vector → vocabulary scores
\`\`\`

After the linear projection:

\`\`\`text
logits.shape = (B, T, V)
\`\`\`

That is, for each item in the batch and each position in the sequence, the model produces a list of \`V\` values.

Conceptual example:

\`\`\`text
logits[b, t, 42]  = score for token 42
logits[b, t, 999] = score for token 999
\`\`\`

The higher the score, the more likely that token is to be chosen as the next token.

These scores typically go through \`softmax\`, becoming probabilities over the entire vocabulary.`,
    },
  },
  visual: {
    id: 'pytorch-projection-space',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Código' }, { label: 'Mapa de shape' }],
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
