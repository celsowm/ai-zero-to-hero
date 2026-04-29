import { defineSlide } from './_factory';

export const zeroShotPrompting = defineSlide({
  id: 'zero-shot-prompting',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Zero-Shot Prompting',
      body: `Zero-shot é quando você pede uma tarefa ao modelo **sem dar nenhum exemplo**. É o formato mais comum — e também o mais propenso a falhas.

### Quando funciona bem

1. **Tarefas genéricas** — resumir, traduzir, classificar sentimentos
2. **Modelos grandes** — GPT-4, Claude 3, Llama 3 70B têm conhecimento interno rico
3. **Formatos simples** — perguntas diretas com resposta curta

### Quando falha

1. **Formatos específicos** — o modelo não adivinha a estrutura exata que você quer
2. **Raciocínio complexo** — sem exemplos de "como pensar", o modelo chuta
3. **Domínios nichados** — conhecimento muito específico sem contexto prévio

### Benchmark zero-shot

\`\`\`python
snippet:prompt-eng/zero-shot-basic
\`\`\`

> Zero-shot funciona para **o que o modelo já viu no treino**. Para comportamentos novos, você precisa de exemplos.`,
    },
    'en-us': {
      title: 'Zero-Shot Prompting',
      body: `Zero-shot is when you ask the model to perform a task **without any examples**. It's the most common format — and also the most prone to failures.

### When it works well

1. **Generic tasks** — summarize, translate, sentiment classification
2. **Large models** — GPT-4, Claude 3, Llama 3 70B have rich internal knowledge
3. **Simple formats** — direct questions with short answers

### When it fails

1. **Specific formats** — the model can't guess the exact structure you want
2. **Complex reasoning** — without examples of "how to think", the model guesses
3. **Niche domains** — very specific knowledge without prior context

### Zero-shot benchmark

\`\`\`python
snippet:prompt-eng/zero-shot-basic
\`\`\`

> Zero-shot works for **what the model has seen in training**. For new behaviors, you need examples.`,
    },
  },
  visual: {
    id: 'zero-shot-prompting-visual',
    copy: {
      'pt-br': {
        title: 'Zero-Shot: Quando Funciona?',
        worksLabel: '✅ Funciona bem',
        failsLabel: '❌ Falha',
        genericLabel: 'Tarefas genéricas',
        specificLabel: 'Formatos específicos',
        largeModelLabel: 'Modelos grandes (GPT-4+)',
        reasoningLabel: 'Raciocínio complexo',
        simpleLabel: 'Formatos simples',
        nicheLabel: 'Domínios nichados',
      },
      'en-us': {
        title: 'Zero-Shot: When Does It Work?',
        worksLabel: '✅ Works well',
        failsLabel: '❌ Fails',
        genericLabel: 'Generic tasks',
        specificLabel: 'Specific formats',
        largeModelLabel: 'Large models (GPT-4+)',
        reasoningLabel: 'Complex reasoning',
        simpleLabel: 'Simple formats',
        nicheLabel: 'Niche domains',
      },
    },
  },
});
