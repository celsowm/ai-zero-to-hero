import { defineSlide } from './_factory';

export const languageModelingIntro = defineSlide({
  id: 'language-modeling-intro',
  type: 'two-column',
  options: { columnRatios: [0.56, 0.44] },
  content: {
    'pt-br': {
      title: 'Language modeling: onde tudo encaixa',
      body: `Até aqui, muita coisa parecia separada: regressão, redes neurais, tensores, embeddings, logits, loss e PyTorch. **Language modeling é o ponto onde tudo isso vira uma única tarefa treinável.**

O contrato antigo continua vivo:

\`\`\`txt
entrada -> modelo -> previsão -> erro -> ajuste de pesos
\`\`\`

Agora só trocamos os nomes:

\`\`\`txt
tokens x -> LM -> logits (B,T,V) -> CE contra y -> backward
\`\`\`

O que já vimos reaparece aqui:

1. **Regressão e redes:** continuamos aprendendo por erro. Antes podia ser MSE; agora a loss mede surpresa sobre o próximo token.
2. **Tensores:** o texto já virou números em formato \`(B,T)\`. O batch não é detalhe: é a forma real do problema.
3. **Token batch:** \`x = idx[:, :-1]\` e \`y = idx[:, 1:]\`. Cada posição de \`x\` pergunta: "qual token vem depois?".
4. **Mini-LM:** \`Embedding\` transforma IDs em vetores; \`lm_head\` transforma vetores em logits sobre o vocabulário.
5. **Classificação:** em cada posição, o modelo escolhe entre \`V\` classes possíveis, uma para cada token.

Definição operacional:

> um language model aprende, para cada posição do contexto, uma distribuição de probabilidade para o próximo token.

Isso não é decorar frases. É ajustar pesos para aumentar a probabilidade dos próximos tokens vistos no treino e reduzir a surpresa média.

Guarde a ponte para o próximo slide: **treinar** usa \`x\`, \`y\`, logits e loss; **gerar** usa só o prefixo atual e repete a escolha do próximo token.`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/token-batch
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 6], content: 'O snippet materializa o mapa do slide: começamos com IDs de tokens em batch, não com texto cru.' },
        { lineRange: [8, 10], content: 'Aqui nasce a supervisão de linguagem: `x` é o contexto visível e `y` é o próximo token correto em cada posição.' },
        { lineRange: [12, 14], content: 'Os prints servem para conferir o contrato operacional: várias posições treináveis em paralelo dentro do mesmo batch.' },
      ],
    },
    'en-us': {
      title: 'Language modeling: where everything connects',
      body: `So far, many ideas may have felt separate: regression, neural networks, tensors, embeddings, logits, loss, and PyTorch. **Language modeling is where all of them become one trainable task.**

The old contract is still alive:

\`\`\`txt
input -> model -> prediction -> error -> weight update
\`\`\`

Now we only rename the pieces:

\`\`\`txt
tokens x -> LM -> logits (B,T,V) -> CE against y -> backward
\`\`\`

What we already saw reappears here:

1. **Regression and networks:** we still learn from error. Before it could be MSE; now the loss measures surprise about the next token.
2. **Tensors:** text has already become numbers shaped \`(B,T)\`. The batch is not an implementation detail; it is the real shape of the problem.
3. **Token batch:** \`x = idx[:, :-1]\` and \`y = idx[:, 1:]\`. Each position in \`x\` asks: "which token comes next?".
4. **Mini-LM:** \`Embedding\` maps IDs to vectors; \`lm_head\` maps vectors to vocabulary logits.
5. **Classification:** at each position, the model chooses among \`V\` possible classes, one per vocabulary token.

Operational definition:

> a language model learns, for each position in the context, a probability distribution for the next token.

This is not memorizing sentences. It is adjusting weights to increase the probability of next tokens observed during training and reduce average surprise.

Keep the bridge to the next slide: **training** uses \`x\`, \`y\`, logits, and loss; **generation** uses only the current prefix and repeatedly picks the next token.`,
      rightBody: `\`\`\`python
snippet:pytorch-lm/token-batch
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 6], content: 'The snippet materializes the slide map: we start from token IDs in a batch, not from raw text.' },
        { lineRange: [8, 10], content: 'This is where language supervision appears: `x` is the visible context and `y` is the correct next token at each position.' },
        { lineRange: [12, 14], content: 'The prints verify the operational contract: many trainable positions run in parallel inside the same batch.' },
      ],
    },
  },
});
