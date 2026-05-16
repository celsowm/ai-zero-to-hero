import { defineSlide } from './_factory';

export const modelEvaluationHf = defineSlide({
  id: 'model-evaluation-hf',
  type: 'two-column',
  options: {
    columnRatios: [0.5, 0.5],
  },
  content: {
    'pt-br': {
      title: `Avaliando o modelo`,
      body: `Treinar sem avaliar é voar às cegas. A biblioteca **\`evaluate\`** padroniza métricas para qualquer tarefa.

1. **Perplexidade:** métrica principal para language models. P = e^(cross-entropy). Quanto menor, melhor. GPT-2 tem ~20 no Wikitext.

2. **BLEU:** compara geração com referência humana. Usado para tradução e summarization. Range 0-1, >0.3 é bom.

3. **ROUGE:** focado em overlap de n-grams. Padrão para summarization.

4. **Exact Match / F1:** para QA e classificação. Mede se a resposta é idêntica (EM) ou parcial (F1).

5. **Pipeline de avaliação:** gerar predições → calcular métricas → comparar com baseline. Sem \`evaluate\`, cada métrica tem uma API diferente.

> Avaliar não é opcional — é a bússola que diz se o modelo melhorou ou piorou.
`,
      rightBody: `
\`\`\`python
snippet:transformers/model-evaluation
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 3],
          content: 'Importamos `evaluate` para métricas e `transformers` para modelo e pipeline.',
        },
        {
          lineRange: [6, 10],
          content: 'Carregamos as métricas e configuramos o modelo e tokenizador.',
        },
        {
          lineRange: [11, 20],
          content: 'Perplexity: média sobre o corpus. GPT-2 no Wikitext dá ~20.',
        },
        {
          lineRange: [23, 26],
          content: 'BLEU: compara geração com referências humanas. Precisamos de listas de refs.',
        },
        {
          lineRange: [29, 31],
          content: 'Pipeline de geração: gera texto com o modelo para avaliação qualitativa.',
        },
      ],
    },
    'en-us': {
      title: `Evaluating the model`,
      body: `Training without evaluating is flying blind. The **\`evaluate\`** library standardizes metrics for any task.

1. **Perplexity:** the main metric for language models. P = e^(cross-entropy). Lower is better. GPT-2 scores ~20 on Wikitext.

2. **BLEU:** compares generation with human reference. Used for translation and summarization. Range 0-1, >0.3 is good.

3. **ROUGE:** focused on n-gram overlap. Standard for summarization.

4. **Exact Match / F1:** for QA and classification. Measures if the answer is identical (EM) or partial (F1).

5. **Evaluation pipeline:** generate predictions → compute metrics → compare with baseline. Without \`evaluate\`, each metric has a different API.

> Evaluating isn't optional — it's the compass that tells you if the model improved or got worse.
`,
      rightBody: `
\`\`\`python
snippet:transformers/model-evaluation
\`\`\``,
      codeExplanations: [
        {
          lineRange: [1, 3],
          content: 'We import `evaluate` for metrics and `transformers` for model and pipeline.',
        },
        {
          lineRange: [6, 10],
          content: 'We load the metrics and configure the model and tokenizer.',
        },
        {
          lineRange: [11, 20],
          content: 'Perplexity: average over the corpus. GPT-2 on Wikitext scores ~20.',
        },
        {
          lineRange: [23, 26],
          content: 'BLEU: compares generation with human references. We need lists of refs.',
        },
        {
          lineRange: [29, 31],
          content: 'Generation pipeline: generates text with the model for qualitative evaluation.',
        },
      ],
    },
  },
});
