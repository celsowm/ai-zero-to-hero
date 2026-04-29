import { defineSlide } from './_factory';

export const promptChainingPatterns = defineSlide({
  id: 'prompt-chaining-patterns',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Prompt Chaining Patterns',
      body: `Prompt chaining é decompor uma tarefa complexa em **múltiplos prompts sequenciais**, onde a saída de um é a entrada do próximo. É mais confiável que um único prompt gigante.

### Padrões comuns

1. **Decomposição** — separar sub-tarefas: extrair → analisar → resumir
2. **Validação/Correção** — um prompt gera, outro verifica e corrige
3. **Iteração** — refinar gradualmente com feedback loops

### Exemplo: análise de dados com validação

\`\`\`python
snippet:prompt-eng/prompt-chain-validation
\`\`\`

### Por que chaining funciona melhor?

1. **Cada prompt é focado** — menos ambiguidade por etapa
2. **Debug facilitado** — você vê onde errou
3. **Validação intermediária** — pode parar se uma etapa falhar

> Um prompt de 10 linhas = 10 coisas que podem dar errado. **10 prompts de 1 linha** = 10 coisas que você pode debugar.`,
    },
    'en-us': {
      title: 'Prompt Chaining Patterns',
      body: `Prompt chaining is decomposing a complex task into **multiple sequential prompts**, where one output feeds the next. It's more reliable than one giant prompt.

### Common patterns

1. **Decomposition** — separate sub-tasks: extract → analyze → summarize
2. **Validation/Correction** — one prompt generates, another verifies and fixes
3. **Iteration** — gradually refine with feedback loops

### Example: data analysis with validation

\`\`\`python
snippet:prompt-eng/prompt-chain-validation
\`\`\`

### Why does chaining work better?

1. **Each prompt is focused** — less ambiguity per step
2. **Easier debugging** — you can see where it went wrong
3. **Intermediate validation** — you can stop if a step fails

> One 10-line prompt = 10 things that can go wrong. **10 one-line prompts** = 10 things you can debug.`,
    },
  },
  visual: {
    id: 'prompt-chaining-patterns-visual',
    copy: {
      'pt-br': {
        title: 'Prompt Chain: Decomposição',
        step1Label: '1. Extrair',
        step2Label: '2. Analisar',
        step3Label: '3. Validar',
        step4Label: '4. Resumir',
        arrowLabel: '→',
        inputLabel: 'Input',
        outputLabel: 'Output final',
        validationLabel: 'Validação',
      },
      'en-us': {
        title: 'Prompt Chain: Decomposition',
        step1Label: '1. Extract',
        step2Label: '2. Analyze',
        step3Label: '3. Validate',
        step4Label: '4. Summarize',
        arrowLabel: '→',
        inputLabel: 'Input',
        outputLabel: 'Final output',
        validationLabel: 'Validation',
      },
    },
  },
});
