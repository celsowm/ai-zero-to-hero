import { defineSlide } from './_factory';

export const promptEvaluation = defineSlide({
  id: 'prompt-evaluation',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Avaliação de Prompts',
      body: `Se você não mede, não melhora. Avaliação de prompts é sobre **comparar sistematicamente** diferentes versões para encontrar a que produz melhores resultados.

### Métodos de avaliação

1. **A/B Testing** — rodar duas versões do prompt e comparar métricas (accuracy, relevância, formato)
2. **LLM-as-a-Judge** — usar um LLM mais forte para avaliar respostas de um modelo menor
3. **Métricas automáticas** — ROUGE, BLEU, exact match para tarefas com ground truth

### Framework: Promptfoo

\`\`\`python
snippet:prompt-eng/prompt-eval-ab
\`\`\`

### LangSmith para tracking

O LangSmith permite **logar cada execução de prompt** com métricas associadas, facilitando comparação temporal.

### Boas práticas

1. **Teste com edge cases** — não apenas exemplos fáceis
2. **Múltiplas execuções** — LLMs são estocásticos, rode 5-10x por versão
3. **Métricas específicas** — defina o que "bom" significa numericamente

> Sem avaliação, você está "chutando se o prompt melhorou". Com métricas, você está **fazendo engenharia**.`,
    },
    'en-us': {
      title: 'Prompt Evaluation',
      body: `If you don't measure, you don't improve. Prompt evaluation is about **systematically comparing** different versions to find the one that produces the best results.

### Evaluation methods

1. **A/B Testing** — run two prompt versions and compare metrics (accuracy, relevance, format)
2. **LLM-as-a-Judge** — use a stronger LLM to evaluate answers from a smaller model
3. **Automatic metrics** — ROUGE, BLEU, exact match for tasks with ground truth

### Framework: Promptfoo

\`\`\`python
snippet:prompt-eng/prompt-eval-ab
\`\`\`

### LangSmith for tracking

LangSmith allows you to **log every prompt execution** with associated metrics, making temporal comparison easier.

### Best practices

1. **Test with edge cases** — not just easy examples
2. **Multiple runs** — LLMs are stochastic, run 5-10x per version
3. **Specific metrics** — define what "good" means numerically

> Without evaluation, you're "guessing if the prompt improved". With metrics, you're **doing engineering**.`,
    },
  },
  visual: {
    id: 'prompt-evaluation-visual',
    copy: {
      'pt-br': {
        title: 'A/B Testing de Prompts',
        promptALabel: 'Prompt A',
        promptBLabel: 'Prompt B',
        accuracyLabel: 'Accuracy',
        formatLabel: 'Formato correto',
        latencyLabel: 'Latência',
        winnerLabel: 'Vencedor',
        metricLabel: 'Métrica',
      },
      'en-us': {
        title: 'Prompt A/B Testing',
        promptALabel: 'Prompt A',
        promptBLabel: 'Prompt B',
        accuracyLabel: 'Accuracy',
        formatLabel: 'Correct format',
        latencyLabel: 'Latency',
        winnerLabel: 'Winner',
        metricLabel: 'Metric',
      },
    },
  },
});
