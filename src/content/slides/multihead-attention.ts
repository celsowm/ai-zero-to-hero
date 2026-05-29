import { defineSlide } from './_factory';

export const multiheadAttention = defineSlide({
  id: 'multihead-attention',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: 'Multi-head attention: 12 leituras paralelas',
      body: `Imagine um corpus com apenas dois documentos:

\`D1 = we the people of usa .\`  
\`D2 = are we the people of usa ?\`

Depois da tokenização, padding, embedding e posição, o Transformer não enxerga mais frases como texto. Ele enxerga uma tabela numérica:

\`X.shape = (B, T, C)\`  
\`X.shape = (2, 8, 768)\`

Ou seja:

- \`B = 2\` documentos no batch
- \`T = 8\` posições por documento
- \`C = 768\` números em cada vetor de token

Cada linha dessa tabela é um token em uma posição.  
O token \`people\`, por exemplo, aparece nos dois documentos, mas em posições diferentes e com contextos diferentes.

---

### O que a multi-head faz?

Uma única atenção criaria uma única matriz de pesos para misturar os tokens.  
A multi-head attention divide a largura interna \`C = 768\` em 12 subespaços menores:

\`768 = 12 × 64\`

Então não temos "12 modelos".  
Temos o mesmo bloco calculando **12 leituras paralelas** da mesma sequência.

Cada head recebe uma versão menor de \`Q\`, \`K\` e \`V\`:

\`Q, K, V: (B, T, 768)\`  
viram:

\`Q, K, V: (B, 12, T, 64)\`

Agora cada head calcula sua própria matriz de atenção:

\`attention_scores: (B, 12, T, T)\`

No nosso batch:

\`attention_scores: (2, 12, 8, 8)\`

Isso significa:

> Para cada documento, para cada uma das 12 heads, cada token calcula quanto vai misturar de cada outro token.

---

### Exemplo: \`people\`

No primeiro documento:

\`we the people of usa .\`

o token \`people\` pode receber informação de:

\`we\`, \`the\`, \`people\`, \`of\`, \`usa\`, \`.\`

No segundo documento:

\`are we the people of usa ?\`

o token \`people\` pode receber informação de:

\`are\`, \`we\`, \`the\`, \`people\`, \`of\`, \`usa\`, \`?\`

A palavra é a mesma, mas a atualização não é a mesma.

Tecnicamente:

\`people_D1\` e \`people_D2\` começam próximos porque usam o mesmo embedding base.

Mas depois da atenção:

\`people_D1 ≠ people_D2\`

porque cada um foi misturado com tokens diferentes.

---

### O que cada head pode aprender?

Uma head pode ficar sensível a relações locais:

\`we → the → people → of → usa\`

Outra pode reforçar agrupamentos:

\`the → people\`  
\`of → usa\`

Outra pode capturar a estrutura de pergunta:

\`are → we\`  
\`usa → ?\`

Outra pode ajudar a decidir o final:

\`we the people of usa → .\`  
\`are we the people of usa → ?\`

Cada head escreve só \`64\` dimensões.  
Depois as 12 saídas são concatenadas de volta:

\`12 × 64 = 768\`

e passam por \`c_proj\`, que mistura tudo de novo em um vetor único por token.

---

### Resumo mental

A multi-head attention é como rodar 12 formas diferentes de calcular contexto sobre a mesma sequência.

Cada head produz uma atualização parcial.

Depois:

\`concat(head_1, ..., head_12) → c_proj → residual stream\`

Nenhuma head decide sozinha o próximo token.  
Ela só escreve uma parte da atualização.

A previsão final ainda depende dos outros blocos, das MLPs, do \`ln_f\` e do \`lm_head\`.`,
      rightBody: `\`\`\`python
snippet:attention/multihead-shapes
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 7], content: 'Definimos o contrato de shapes: batch, tempo, largura interna, número de heads e dimensão por head.' },
        { lineRange: [9, 14], content: 'A projeção QKV gera 3C e depois cada tensor é reorganizado em H heads de dimensão D.' },
        { lineRange: [16, 22], content: 'Cada head calcula attention logits e pesos próprios; no fim, concatenamos as heads e voltamos para a largura C.' },
      ],
    },
    'en-us': {
      title: 'Multi-head attention: 12 parallel reads',
      body: `Imagine a corpus with just two documents:

\`D1 = we the people of usa .\`  
\`D2 = are we the people of usa ?\`

After tokenization, padding, embedding and position encoding, the Transformer no longer sees sentences as text. It sees a numeric table:

\`X.shape = (B, T, C)\`  
\`X.shape = (2, 8, 768)\`

That is:

- \`B = 2\` documents in the batch
- \`T = 8\` positions per document
- \`C = 768\` numbers in each token vector

Each row in this table is a token at a position.  
The token \`people\`, for example, appears in both documents, but at different positions and with different contexts.

---

### What does multi-head do?

A single attention head would create a single weight matrix to mix tokens.  
Multi-head attention splits the inner width \`C = 768\` into 12 smaller subspaces:

\`768 = 12 × 64\`

So it is not "12 models".  
It is the same block computing **12 parallel reads** of the same sequence.

Each head receives a smaller version of \`Q\`, \`K\`, and \`V\`:

\`Q, K, V: (B, T, 768)\`  
become:

\`Q, K, V: (B, 12, T, 64)\`

Now each head computes its own attention matrix:

\`attention_scores: (B, 12, T, T)\`

In our batch:

\`attention_scores: (2, 12, 8, 8)\`

This means:

> For each document, for each of the 12 heads, each token computes how much to mix from every other token.

---

### Example: \`people\`

In the first document:

\`we the people of usa .\`

the token \`people\` may receive information from:

\`we\`, \`the\`, \`people\`, \`of\`, \`usa\`, \`.\`

In the second document:

\`are we the people of usa ?\`

the token \`people\` may receive information from:

\`are\`, \`we\`, \`the\`, \`people\`, \`of\`, \`usa\`, \`?\`

The word is the same, but the update is not the same.

Technically:

\`people_D1\` and \`people_D2\` start close because they use the same base embedding.

But after attention:

\`people_D1 ≠ people_D2\`

because each one was mixed with different tokens.

---

### What can each head learn?

One head may become sensitive to local relations:

\`we → the → people → of → usa\`

Another may reinforce groupings:

\`the → people\`  
\`of → usa\`

Another may capture question structure:

\`are → we\`  
\`usa → ?\`

Another may help decide the ending:

\`we the people of usa → .\`  
\`are we the people of usa → ?\`

Each head writes only \`64\` dimensions.  
Then the 12 outputs are concatenated back:

\`12 × 64 = 768\`

and go through \`c_proj\`, which mixes everything again into a single vector per token.

---

### Mental summary

Multi-head attention is like running 12 different ways of computing context over the same sequence.

Each head produces a partial update.

Then:

\`concat(head_1, ..., head_12) → c_proj → residual stream\`

No head decides the next token by itself.  
It only writes a piece of the update.

The final prediction still depends on the other blocks, the MLPs, \`ln_f\`, and \`lm_head\`.`,
      rightBody: `\`\`\`python
snippet:attention/multihead-shapes
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 7], content: 'We define the shape contract: batch, time, hidden width, number of heads, and per-head width.' },
        { lineRange: [9, 14], content: 'The QKV projection creates 3C, then each tensor is reshaped into H heads of width D.' },
        { lineRange: [16, 22], content: 'Each head computes its own attention logits and weights; at the end, we concatenate heads and return to width C.' },
      ],
    },
  },
  visual: {
    id: 'multihead-diagram',
    copy: {
      'pt-br': {
        shapesTab: 'Formato dos Dados',
        attentionTab: 'Explorador de Heads',
        pipelineTab: 'Resumo & Projeção',
        shapeExplanation: 'O Transformer enxerga números, não frases',
        headLocal: 'Relações Locais',
        headGroup: 'Agrupamentos',
        headQuestion: 'Estrutura Pergunta',
        headEnd: 'Fim de Frase',
        insightLocal: 'A Head local foca nas palavras imediatamente vizinhas. O token recebe informações fortemente do seu entorno imediato para entender o fluxo passo a passo.',
        insightGroup: 'Esta Head aprende dependências como "the → people" ou "of → usa". O token atualiza seu significado buscando seu par gramatical.',
        insightQuestionYes: 'Em uma frase interrogativa, o modelo mapeia tokens fundamentais de estrutura ("are", "?") para entender o tom da frase, distribuindo essa informação para os outros.',
        insightQuestionNo: 'Como esta frase não é uma pergunta, esta Head específica não encontra seus gatilhos ("are", "?") e tende a reter a informação no próprio token ou em um padrão difuso.',
        insightEnd: 'Esta Head propaga a intenção final da frase (afirmação ou dúvida) prestando forte atenção no sinal de pontuação.',
        peopleNote: 'Note como o token people no {doc} foca apenas no contexto afirmativo. Após a atenção, people_D1 ≠ people_D2.',
        summary: 'Nenhuma head decide sozinha o próximo token. Cada uma escreve só 64 dimensões (uma parte da atualização). Depois, as 12 saídas são coladas de volta.',
        pipelineNote: 'Nenhuma head decide sozinha o próximo token. Cada uma escreve só 64 dimensões (uma parte da atualização). Depois, as 12 saídas são concatenadas de volta.',
      },
      'en-us': {
        shapesTab: 'Data Shape',
        attentionTab: 'Head Explorer',
        pipelineTab: 'Summary & Projection',
        shapeExplanation: 'The Transformer sees numbers, not sentences',
        headLocal: 'Local Relations',
        headGroup: 'Groupings',
        headQuestion: 'Question Structure',
        headEnd: 'Sentence End',
        insightLocal: 'The local head focuses on immediate neighboring words. The token receives strong information from its immediate surroundings to understand the flow step by step.',
        insightGroup: 'This head learns dependencies like "the → people" or "of → usa". The token updates its meaning by looking for its grammatical pair.',
        insightQuestionYes: 'In an interrogative sentence, the model maps fundamental structure tokens ("are", "?") to understand the sentence tone, distributing this information to others.',
        insightQuestionNo: 'Since this sentence is not a question, this specific head does not find its triggers ("are", "?") and tends to retain information in the token itself or in a diffuse pattern.',
        insightEnd: 'This head propagates the final intent of the sentence (statement or question) by paying strong attention to the punctuation mark.',
        peopleNote: 'Notice how the token people in {doc} focuses only on the affirmative context. After attention, people_D1 ≠ people_D2.',
        summary: 'No head decides the next token by itself. Each one writes only 64 dimensions (part of the update). Then the 12 outputs are glued back together.',
        pipelineNote: 'No head decides the next token by itself. Each one writes only 64 dimensions (part of the update). Then the 12 outputs are concatenated back.',
      },
    },
  },
});
