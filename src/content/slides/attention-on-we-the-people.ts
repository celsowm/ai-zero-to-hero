import { defineSlide } from './_factory';

export const attentionOnWeThePeople = defineSlide({
  id: 'attention-on-we-the-people',
  type: 'two-column',
  options: {
    columnRatios: [0.42, 0.58],
  },
  content: {
    'pt-br': {
      title: 'Atenção causal em "We the people"',
      body: `Agora a atenção deixa de ser metáfora e vira uma conta rastreável.

Para prever o próximo token depois de \`We the people\`, a posição \`people\` faz uma pergunta: **quais tokens anteriores ajudam a decidir o próximo passo?**

Pipeline real:
1. \`Q\` de \`people\` compara com as \`K\` de \`We\`, \`the\` e \`people\`
2. isso gera \`attention_logits = Q @ K.T / sqrt(d_k)\`
3. a máscara causal bloqueia qualquer posição futura
4. o softmax transforma esses logits em pesos que somam 100%
5. os pesos misturam os vetores \`V\` e geram o contexto final

Leitura importante: atenção não "entende" por magia. Ela calcula **quanto cada Value entra no vetor final**.

Esses são logits de atenção entre posições, não logits finais do vocabulário. Os logits de próximo token vêm depois, quando o residual stream acumulado passa pelo \`lm_head\`.`,
      rightBody: `\`\`\`python
snippet:attention/causal-attention-mini
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 9], content: 'Montamos Q, K e V mínimos para três tokens. O exemplo é pequeno para a conta caber inteira no slide.' },
        { lineRange: [10, 17], content: 'Os attention logits vêm do produto escalar escalado; a máscara causal impede que uma posição leia tokens futuros antes do softmax.' },
        { lineRange: [18, 21], content: 'Imprimimos tokens, pesos de atenção e contexto para conferir a distribuição calculada pela Query `people`.' },
      ],
    },
    'en-us': {
      title: 'Causal attention on "We the people"',
      body: `Now attention stops being a metaphor and becomes a traceable calculation.

To predict the next token after \`We the people\`, the \`people\` position asks: **which previous tokens help decide the next step?**

Real pipeline:
1. \`people\`'s \`Q\` compares against the \`K\` vectors for \`We\`, \`the\`, and \`people\`
2. this produces \`attention_logits = Q @ K.T / sqrt(d_k)\`
3. the causal mask blocks any future position
4. softmax turns those logits into weights that sum to 100%
5. the weights mix the \`V\` vectors and produce the final context

Key reading: attention does not "understand" by magic. It computes **how much each Value enters the final vector**.

These are attention logits between positions, not final vocabulary logits. Next-token logits come later, when the accumulated residual stream goes through the \`lm_head\`.`,
      rightBody: `\`\`\`python
snippet:attention/causal-attention-mini
\`\`\``,
      codeExplanations: [
        { lineRange: [1, 9], content: 'We build minimal Q, K, and V tensors for three tokens. The example is small so the whole calculation fits on the slide.' },
        { lineRange: [10, 17], content: 'Attention logits come from the scaled dot product; the causal mask prevents a position from reading future tokens before softmax.' },
        { lineRange: [18, 21], content: 'We print tokens, attention weights, and context to check the distribution computed by the `people` Query.' },
      ],
    },
  },
  visual: {
    id: 'attention-weight-explorer',
    copy: {
      'pt-br': {
        title: 'Pipeline da atenção causal',
        subtitle: 'Selecione uma Query e acompanhe attention logits -> máscara -> softmax -> contexto',
        clickHint: 'Clique nos tokens: cada linha mostra o que aquela posição pode ler.',
        queryLabel: 'Query ativa',
        keyLabel: 'Matriz de atenção causal',
        attentionWeightLabel: 'Pesos após softmax',
        contextMeaningLabel: 'Como o contexto é formado',
        scoreLabel: 'Attention logit',
        maskLabel: 'Máscara causal',
        valueLabel: 'Value misturado',
        beforeLabel: 'Token isolado',
        afterLabel: 'Depois da atenção',
        sentenceTokens: ['We', 'the', 'people'],
        scoreMatrix: [
          [1.7, -99, -99],
          [0.8, 1.4, -99],
          [1.2, 0.4, 1.8],
        ],
        attentionMatrix: [
          [1, 0, 0],
          [0.35, 0.65, 0],
          [0.31, 0.14, 0.55],
        ],
        valueSummaries: [
          'identidade coletiva',
          'marca sintática',
          'sujeito central',
        ],
        meaningBefore: [
          'pronome sem contexto',
          'artigo definido',
          'pessoas genéricas',
        ],
        meaningAfter: [
          'início de uma voz coletiva',
          'conecta "We" ao substantivo',
          'sujeito coletivo pronto para prever "of"',
        ],
        insightTitle: 'Leitura:',
        insights: [
          'a linha escolhida é a Query',
          'colunas futuras são bloqueadas',
          'Values viram mistura ponderada',
        ],
      },
      'en-us': {
        title: 'Causal attention pipeline',
        subtitle: 'Select a Query and follow attention logits -> mask -> softmax -> context',
        clickHint: 'Click tokens: each row shows what that position is allowed to read.',
        queryLabel: 'Active Query',
        keyLabel: 'Causal attention matrix',
        attentionWeightLabel: 'Weights after softmax',
        contextMeaningLabel: 'How context is formed',
        scoreLabel: 'Attention logit',
        maskLabel: 'Causal mask',
        valueLabel: 'Mixed Value',
        beforeLabel: 'Isolated token',
        afterLabel: 'After attention',
        sentenceTokens: ['We', 'the', 'people'],
        scoreMatrix: [
          [1.7, -99, -99],
          [0.8, 1.4, -99],
          [1.2, 0.4, 1.8],
        ],
        attentionMatrix: [
          [1, 0, 0],
          [0.35, 0.65, 0],
          [0.31, 0.14, 0.55],
        ],
        valueSummaries: [
          'collective identity',
          'syntactic marker',
          'central subject',
        ],
        meaningBefore: [
          'pronoun without context',
          'definite article',
          'generic people',
        ],
        meaningAfter: [
          'start of a collective voice',
          'connects "We" to the noun',
          'collective subject ready to predict "of"',
        ],
        insightTitle: 'Read it as:',
        insights: [
          'the selected row is the Query',
          'future columns are blocked',
          'Values become a weighted mix',
        ],
      },
    },
  },
});
