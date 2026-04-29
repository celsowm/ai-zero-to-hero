import { defineSlide } from './_factory';

export const reasoningExercise = defineSlide({
  id: 'reasoning-exercise',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Exercício: Fix the Bug — Reasoning Parser',
      body: `Um desenvolvedor criou um wrapper para reasoning models, mas o parser de thinking blocks está **quebrando** em produção.

### O bug

\`\`\`python
snippet:reasoning/bug-code
\`\`\`

### Sintomas

- Thinking blocks não são extraídos corretamente
- Resposta final vem **juntada** com pensamento
- Regex falha quando thinking tem **múltiplos parágrafos**

### Sua missão

1. Identificar por que o regex \`<thought>(.*?)</thought>\` falha com multi-line
2. Corrigir o parsing para capturar thinking blocks corretamente
3. Adicionar fallback para quando thinking não estiver presente

### Dicas

\`\`\`python
snippet:reasoning/bug-hints
\`\`\`

> O bug está no modo como o regex lida com newlines e conteúdo multi-paragraph.`,
    },
    'en-us': {
      title: 'Exercise: Fix the Bug — Reasoning Parser',
      body: `A developer created a wrapper for reasoning models, but the thinking block parser is **breaking** in production.

### The bug

\`\`\`python
snippet:reasoning/bug-code
\`\`\`

### Symptoms

- Thinking blocks aren't extracted correctly
- Final answer comes **merged** with thought
- Regex fails when thinking has **multiple paragraphs**

### Your mission

1. Identify why the regex \`<thought>(.*?)</thought>\` fails with multi-line
2. Fix parsing to capture thinking blocks correctly
3. Add fallback for when thinking isn't present

### Hints

\`\`\`python
snippet:reasoning/bug-hints
\`\`\`

> The bug is in how the regex handles newlines and multi-paragraph content.`,
    },
  },
  visual: {
    id: 'reasoning-exercise-visual',
    copy: {
      'pt-br': {
        title: 'Parser Bug',
        expectedLabel: 'Esperado',
        actualLabel: 'Atual',
        thinkingTitle: 'Thinking',
        answerTitle: 'Resposta',
        brokenLabel: 'Conteúdo misturado',
        fixedLabel: 'Parsing corrigido',
      },
      'en-us': {
        title: 'Parser Bug',
        expectedLabel: 'Expected',
        actualLabel: 'Actual',
        thinkingTitle: 'Thinking',
        answerTitle: 'Answer',
        brokenLabel: 'Mixed content',
        fixedLabel: 'Fixed parsing',
      },
    },
  },
});
