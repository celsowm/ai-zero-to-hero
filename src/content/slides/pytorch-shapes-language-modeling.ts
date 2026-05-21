import { defineSlide } from './_factory';

export const pytorchShapesLanguageModeling = defineSlide({
  id: 'pytorch-shapes-language-modeling',
  type: 'two-column',
  options: { columnRatios: [0.42, 0.58] },
  content: {
    'pt-br': {
      title: 'Convencoes de shape para LM (language model)',
      body: `No slide anterior, o modelo ja recebia IDs inteiros e produzia **scores de saida**. Falta fechar a pergunta central: **scores para fazer o que, exatamente?**

Resposta: o modelo tenta prever **qual token vem a seguir** em cada posicao da sequencia.
- por isso ele nao produz um numero so, mas um placar sobre o vocabulario inteiro;
- e por isso o contrato de shape precisa preservar batch, tempo e vocabulario ao mesmo tempo.

Agora sim faz sentido formalizar o contrato B/T/C/V para esse tipo de treino.

Termo novo com motivacao: **logits**.

O que são logits:
- são **scores brutos** que o modelo gera para cada token do vocabulário;
- ainda **não são probabilidades**;
- viram distribuicao apos normalizacao (softmax), usada para penalizar no treino e escolher token na geracao.

- **B** = batch
- **T** = sequência
- **C** = hidden size
- **V** = vocabulário

Contrato minimo de treino:
- \`idx\` e \`targets\` sempre inteiros em \`(B, T)\`
- hidden states em \`(B, T, C)\`
- logits em \`(B, T, V)\` = para cada posição temporal, um vetor de \`V\` scores
- flatten para loss: \`logits -> (B*T, V)\` e \`targets -> (B*T)\`

Critério de erro usado aqui:
- **CE (Cross-Entropy / Entropia Cruzada)**, também vista como NLL média no batch;
- leitura prática por token correto: \`CE = -log(p_token_correto)\`;
- em classificação, isso é o mesmo espírito do **log-loss** multiclasse.
- ponte com slides anteriores: no lugar da lógica do **MSE** (erro contínuo), agora penalizamos confiança na classe/token errado.

Fechando o ciclo:
- logits viram distribuicao sobre o vocabulario
- a distribuicao vira escolha de indice (argmax ou sampling) na geracao

Invariantes de sanidade:
1. \`idx/targets\` usam \`torch.long\`
2. tensores comparados na loss ficam no mesmo device
3. loss final é escalar

O proximo passo e mostrar como o mesmo tensor de IDs gera pares de entrada/alvo para esse treino.`,
    },
    'en-us': {
      title: 'Shape conventions for LM (language model)',
      body: `In the previous slide, the model already consumed integer IDs and produced **output scores**. One central question is still open: **scores for what, exactly?**

In language modeling, the task is simple to define:
- for each sequence position, the model tries to predict **which token comes next**;
- that is why it does not output a single number, but a scoreboard over the full vocabulary;
- and that is why the shape contract must preserve batch, time, and vocabulary at once.

Only now does it make sense to formalize the B/T/C/V contract for this kind of training.

New term with motivation: **logits**.

What logits are:
- they are **raw scores** the model outputs for each vocabulary token;
- they are **not probabilities yet**;
- they become a distribution after normalization (softmax), used to penalize training and choose tokens at generation time.

- **B** = batch
- **T** = sequence
- **C** = hidden size
- **V** = vocabulary

Minimum training contract:
- \`idx\` and \`targets\` are always integer tensors in \`(B, T)\`
- hidden states are \`(B, T, C)\`
- logits are \`(B, T, V)\` = for each time position, one vector of \`V\` scores
- loss flattening: \`logits -> (B*T, V)\` and \`targets -> (B*T)\`

Error criterion used here:
- **CE (Cross-Entropy)**, also read as average NLL over the batch;
- per-correct-token operational view: \`CE = -log(p_correct_token)\`;
- in classification terms, this is the same family as multiclass **log-loss**.
- bridge to earlier slides: instead of **MSE** (continuous error), we now penalize confidence assigned to the wrong class/token.

Closing the loop:
- logits become a vocabulary distribution
- that distribution becomes an index choice (argmax or sampling) during generation

Sanity invariants:
1. \`idx/targets\` use \`torch.long\`
2. tensors in the loss are on the same device
3. final loss is scalar

The next step is to show how that same ID tensor becomes input/target pairs for this training setup.`,
    },
  },
  visual: {
    id: 'pytorch-shape-trace-flow',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Vocabulario' }],
        codePanel: {
          title: 'Contrato de shape completo',
          description: 'Snippet curto para validar shape, dtype, flatten e loss em uma passada.',
          source: { snippetId: 'pytorch-lm/shape-contract', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 4], content: 'Começamos declarando B, T, C e V e importando a cross-entropy; isso fixa o vocabulário de shape usado no restante do exemplo.' },
            { lineRange: [6, 9], content: 'Criamos `idx`, `targets`, `hidden` e `logits` no contrato esperado: entrada/alvo em `(B, T)` e saída em `(B, T, V)`.' },
            { lineRange: [11, 13], content: 'O flatten converte o problema temporal em uma lista de casos de classificação, no formato que a cross-entropy realmente consome.' },
            { lineRange: [15, 21], content: 'Os prints verificam sanidade de shape, dtype e device e confirmam que a loss final é escalar.' },
          ],
        },
        vocabPanel: {
          title: 'Vocabulario: o que e e como aparece nos shapes',
          subtitle: 'V é a quantidade de tokens diferentes que o modelo conhece. Cada token ganha um ID unico e uma linha na tabela de embedding.',
          tokenLabel: 'Token',
          idLabel: 'ID',
          shapeLabel: 'embedding table: V tokens × C dimensoes cada',
          examples: [
            { token: 'hello', id: 0 },
            { token: 'world', id: 1 },
            { token: 'the', id: 2 },
            { token: '.', id: 3 },
            { token: '[UNK]', id: 4 },
          ],
          dimensionCard: {
            shapes: ['V = 5', 'V × C', 'C = 16'],
            embedLabel: 'Tokens',
            embedShape: 'V = 5',
            vocabLabel: 'Tabela',
            vocabShape: '(V, C) = (5, 16)',
            dimLabel: 'Dimensao',
            dimShape: 'C = 16',
          },
          footer: 'Regra: V aparece no shape dos logits (B, T, V) porque cada posicao vota em todo o vocabulario.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Vocabulary' }],
        codePanel: {
          title: 'Full shape contract',
          description: 'Compact snippet to validate shape, dtype, flattening, and loss in one pass.',
          source: { snippetId: 'pytorch-lm/shape-contract', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 4], content: 'We start by declaring B, T, C, and V and importing cross-entropy, which fixes the shape vocabulary used by the rest of the snippet.' },
            { lineRange: [6, 9], content: 'We create `idx`, `targets`, `hidden`, and `logits` in the expected contract: input/target in `(B, T)` and model scores in `(B, T, V)`.' },
            { lineRange: [11, 13], content: 'Flattening rewrites the temporal tensor problem into a list of classification cases in the exact format cross-entropy expects.' },
            { lineRange: [15, 21], content: 'Final prints check shape, dtype, and device consistency and confirm the final loss is a scalar.' },
          ],
        },
        vocabPanel: {
          title: 'Vocabulary: what it is and how it appears in shapes',
          subtitle: 'V is the number of distinct tokens the model knows. Each token gets a unique ID and one row in the embedding table.',
          tokenLabel: 'Token',
          idLabel: 'ID',
          shapeLabel: 'embedding table: V tokens × C dimensions each',
          examples: [
            { token: 'hello', id: 0 },
            { token: 'world', id: 1 },
            { token: 'the', id: 2 },
            { token: '.', id: 3 },
            { token: '[UNK]', id: 4 },
          ],
          dimensionCard: {
            shapes: ['V = 5', 'V × C', 'C = 16'],
            embedLabel: 'Tokens',
            embedShape: 'V = 5',
            vocabLabel: 'Table',
            vocabShape: '(V, C) = (5, 16)',
            dimLabel: 'Dimension',
            dimShape: 'C = 16',
          },
          footer: 'Rule: V appears in logits shape (B, T, V) because each position votes over the whole vocabulary.',
        },
      },
    },
  },
});
