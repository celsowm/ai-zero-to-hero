import { defineSlide } from './_factory';

export const pytorchMinimalLanguageModel = defineSlide({
  id: 'pytorch-minimal-language-model',
  type: 'two-column',
  options: { columnRatios: [0.46, 0.54] },
  content: {
    'pt-br': {
      title: 'Mini LM end-to-end em PyTorch',
      body: `Este slide fecha o primeiro ciclo completo de language modeling: **texto -> tokens -> batch -> modelo -> loss -> treino -> geração**.

Não é mais só uma classe solta. O exemplo mostra a menor versão executável do contrato que vimos nos slides anteriores.

Fluxo didático:

1. **Corpus mínimo**: uma frase curta vira lista de tokens, vocabulário e IDs inteiros.
2. **Batch supervisionado**: o mesmo tensor \`idx\` gera \`x = idx[:, :-1]\` e \`y = idx[:, 1:]\`.
3. **Modelo**: \`Embedding\` transforma IDs em vetores; \`lm_head\` transforma vetores em logits sobre o vocabulário.
4. **Loss**: os logits \`(B,T,V)\` são achatados para a cross-entropy comparar cada posição com o próximo token correto.
5. **Treino**: \`zero_grad -> backward -> step\` reduz a surpresa média nos exemplos vistos.
6. **Geração**: com um prefixo, o modelo usa os logits da última posição, escolhe o próximo token e anexa ao contexto.

O ponto principal não é qualidade do texto gerado. É enxergar, numa peça só, todas as engrenagens que depois reaparecem em GPTs maiores.

Limite honesto: este é um **bigram LM didático**. Ele não tem atenção, não lê contexto longo de verdade e não é arquitetura de produção. Ele serve para provar o pipeline antes de complicar o corpo interno.`,
    },
    'en-us': {
      title: 'An end-to-end mini LM in PyTorch',
      body: `This slide closes the first complete language-modeling cycle: **text -> tokens -> batch -> model -> loss -> training -> generation**.

It is no longer just an isolated class. The example shows the smallest executable version of the contract we built in previous slides.

Teaching flow:

1. **Tiny corpus**: a short sentence becomes tokens, a vocabulary, and integer IDs.
2. **Supervised batch**: the same \`idx\` tensor creates \`x = idx[:, :-1]\` and \`y = idx[:, 1:]\`.
3. **Model**: \`Embedding\` maps IDs to vectors; \`lm_head\` maps vectors to vocabulary logits.
4. **Loss**: logits \`(B,T,V)\` are flattened so cross-entropy can compare every position with the correct next token.
5. **Training**: \`zero_grad -> backward -> step\` reduces average surprise over the examples seen.
6. **Generation**: given a prefix, the model uses the last-position logits, picks the next token, and appends it to the context.

The main point is not generation quality. It is seeing, in one piece, all the gears that later reappear inside larger GPT-style models.

Honest limit: this is a **teaching bigram LM**. It has no attention, no real long-context reading, and it is not a production architecture. It proves the pipeline before we make the internal body more complex.`,
    },
  },
  visual: {
    id: 'pytorch-architecture-blueprint',
    copy: {
      'pt-br': {
        tabs: [{ label: 'Codigo' }, { label: 'Fluxo' }],
        codePanel: {
          title: 'Um LM mínimo, mas executável de ponta a ponta',
          description: 'O código cria dados, monta x/y, calcula logits e loss, treina por alguns passos e usa o mesmo modelo para gerar novos tokens.',
          source: { snippetId: 'pytorch-lm/minimal-language-model', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 15], content: 'Preparação end-to-end: texto cru vira tokens, vocabulário, IDs e o par supervisionado `x/y` deslocado.' },
            { lineRange: [17, 31], content: 'A classe implementa o contrato do LM: IDs entram, embeddings viram vetores, `lm_head` produz logits e a CE mede erro quando há targets.' },
            { lineRange: [33, 41], content: 'A geração reaproveita o mesmo forward, mas só olha a última posição de logits para escolher e anexar o próximo token.' },
            { lineRange: [43, 59], content: 'O final é o loop completo: instancia modelo e optimizer, mede loss antes, treina, mede loss depois e imprime uma continuação gerada.' },
          ],
        },
        blueprintPanel: {
          title: 'Pipeline completo em uma peça',
          subtitle: 'A utilidade deste mini-modelo não é ser poderoso; é tornar visível o ciclo inteiro antes de entrarmos em atenção e blocos GPT.',
          stages: [
            { label: 'Dados', title: 'Texto vira supervisão', shape: 'texto -> tokens -> ids -> x/y', body: 'O exemplo começa do texto e monta `x` e `y`. Isso evita a sensação de que o modelo aparece no vácuo.', reading: '`x` é o contexto visível; `y` é o próximo token correto em cada posição.' },
            { label: 'Forward', title: 'IDs viram placares de vocabulário', shape: '(B,T) -> (B,T,C) -> (B,T,V)', body: '`Embedding` cria vetores por token e `lm_head` cria um placar para cada token possível do vocabulário.', reading: 'Cada posição temporal vira um problema de classificação entre `V` tokens.' },
            { label: 'Loss', title: 'O erro vira um escalar treinável', shape: '(B*T,V) vs (B*T)', body: 'A cross-entropy precisa enxergar uma lista de exemplos. Por isso achatamos batch e tempo antes de comparar logits com targets.', reading: 'É o mesmo papel estrutural do MSE antes: produzir um número para `backward()`.' },
            { label: 'Treino', title: 'Pesos mudam por gradiente', shape: 'loss -> backward -> step', body: 'O loop mostra a perda antes e depois. Se a loss cai, o mini-LM aprendeu melhor as transições do corpus minúsculo.', reading: 'Aqui fica concreto que LM ainda é aprendizado supervisionado por erro.' },
            { label: 'Geração', title: 'Treinar e gerar usam o mesmo modelo', shape: 'prefixo -> último logit -> próximo token', body: 'Na geração não existe target nem loss. O modelo prevê o próximo token, anexa ao contexto e repete.', reading: 'Essa é a ponte direta para o próximo bloco: treino paralelo, geração iterativa.' },
          ],
          invariantsTitle: 'O que este exemplo garante',
          invariants: [
            'O código roda de ponta a ponta sem depender de dataset externo.',
            'A mesma classe cobre treino e geração.',
            'A queda de loss confirma que o loop de otimização está funcionando.',
          ],
          diagnosticsTitle: 'O que ele ainda não ensina',
          diagnostics: [
            'Não há atenção para combinar informação entre posições distantes.',
            'O modelo é essencialmente local/bigram, então a geração é limitada.',
            'Não há batching real de dataset, validação, checkpoint ou arquitetura profunda.',
          ],
          footer: 'Depois disso, crescer o modelo significa trocar o corpo interno; o contrato externo continua reconhecível.',
        },
      },
      'en-us': {
        tabs: [{ label: 'Code' }, { label: 'Flow' }],
        codePanel: {
          title: 'A minimal LM that actually runs end to end',
          description: 'The code creates data, builds x/y, computes logits and loss, trains for a few steps, and uses the same model to generate tokens.',
          source: { snippetId: 'pytorch-lm/minimal-language-model', language: 'python' },
          codeExplanations: [
            { lineRange: [1, 15], content: 'End-to-end setup: raw text becomes tokens, vocabulary, IDs, and the shifted supervised `x/y` pair.' },
            { lineRange: [17, 31], content: 'The class implements the LM contract: IDs come in, embeddings become vectors, `lm_head` produces logits, and CE measures error when targets exist.' },
            { lineRange: [33, 41], content: 'Generation reuses the same forward pass, but only reads the last-position logits to choose and append the next token.' },
            { lineRange: [43, 59], content: 'The ending is the full loop: instantiate model and optimizer, measure loss before, train, measure loss after, and print a generated continuation.' },
          ],
        },
        blueprintPanel: {
          title: 'The whole pipeline in one piece',
          subtitle: 'The purpose of this mini-model is not power; it is making the full cycle visible before we introduce attention and GPT blocks.',
          stages: [
            { label: 'Data', title: 'Text becomes supervision', shape: 'text -> tokens -> ids -> x/y', body: 'The example starts from text and builds `x` and `y`. That prevents the model from feeling disconnected from the data.', reading: '`x` is the visible context; `y` is the correct next token at each position.' },
            { label: 'Forward', title: 'IDs become vocabulary scores', shape: '(B,T) -> (B,T,C) -> (B,T,V)', body: '`Embedding` creates vectors per token and `lm_head` creates one score board over all vocabulary tokens.', reading: 'Each time position becomes a classification problem over `V` tokens.' },
            { label: 'Loss', title: 'Error becomes one trainable scalar', shape: '(B*T,V) vs (B*T)', body: 'Cross-entropy expects a list of examples. That is why we flatten batch and time before comparing logits with targets.', reading: 'It plays the same structural role MSE played earlier: produce a number for `backward()`.' },
            { label: 'Training', title: 'Weights change by gradient', shape: 'loss -> backward -> step', body: 'The loop shows loss before and after. If loss drops, the mini-LM has learned the tiny corpus transitions better.', reading: 'This makes concrete that LM is still supervised learning from error.' },
            { label: 'Generation', title: 'Training and generation use the same model', shape: 'prefix -> last logit -> next token', body: 'During generation there is no target and no loss. The model predicts the next token, appends it, and repeats.', reading: 'This is the direct bridge to the next block: parallel training, iterative generation.' },
          ],
          invariantsTitle: 'What this example guarantees',
          invariants: [
            'The code runs end to end without an external dataset.',
            'The same class covers training and generation.',
            'The loss drop confirms that the optimization loop works.',
          ],
          diagnosticsTitle: 'What it still does not teach',
          diagnostics: [
            'No attention to combine information across distant positions.',
            'The model is essentially local/bigram, so generation is limited.',
            'No real dataset batching, validation, checkpointing, or deep architecture.',
          ],
          footer: 'After this, growing the model means replacing the internal body; the outer contract stays recognizable.',
        },
      },
    },
  },
});
