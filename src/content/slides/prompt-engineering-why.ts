import { defineSlide } from './_factory';

export const promptEngineeringWhy = defineSlide({
  id: 'prompt-engineering-why',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Por que Engenharia de Prompts?',
      body: `Os LLMs são incrivelmente poderosos, mas **extremamente sensíveis** à forma como você se comunica com eles. Um pequeno cambiamento no prompt pode transformar uma resposta perfeita em uma alucinação completa.

### O problema

1. **Alucinações** — o modelo inventa fatos com total confiança
2. **Inconsistência** — o mesmo prompt produz respostas diferentes
3. **Superficialidade** — respostas genéricas quando você precisa de profundidade
4. **Formato errado** — output que não segue a estrutura esperada

### Exemplo real

Compare dois prompts para a mesma tarefa:

**Prompt ruim:**
> "Me fala sobre gradient descent"

**Prompt bom:**
> "Explique gradient descent como se eu fosse um estudante de programação. Use a analogia de descer uma montanha com neblina. Inclua: (1) o que é, (2) por que é importante em ML, (3) um exemplo numérico simples com learning rate = 0.01"

> Engenharia de prompts não é "trabalhar com a API" — é **comunicar intenção de forma inequívoca** para um modelo estatístico.`,
    },
    'en-us': {
      title: 'Why Prompt Engineering?',
      body: `LLMs are incredibly powerful, but **extremely sensitive** to how you communicate with them. A small change in the prompt can turn a perfect answer into a complete hallucination.

### The problem

1. **Hallucinations** — the model invents facts with total confidence
2. **Inconsistency** — the same prompt produces different responses
3. **Superficiality** — generic answers when you need depth
4. **Wrong format** — output that doesn't follow the expected structure

### Real example

Compare two prompts for the same task:

**Bad prompt:**
> "Tell me about gradient descent"

**Good prompt:**
> "Explain gradient descent as if I were a programming student. Use the analogy of descending a foggy mountain. Include: (1) what it is, (2) why it's important in ML, (3) a simple numerical example with learning rate = 0.01"

> Prompt engineering isn't "working with the API" — it's **communicating intent unambiguously** to a statistical model.`,
    },
  },
  visual: {
    id: 'prompt-engineering-why-visual',
    copy: {
      'pt-br': {
        title: 'Impacto do Prompt na Qualidade',
        badPromptLabel: 'Prompt vago',
        goodPromptLabel: 'Prompt estruturado',
        badResultLabel: 'Resposta genérica e superficial',
        goodResultLabel: 'Resposta precisa e contextualizada',
        qualityLabel: 'Qualidade da resposta',
        specificityLabel: 'Especificidade',
        arrowLabel: '→',
      },
      'en-us': {
        title: 'Prompt Impact on Quality',
        badPromptLabel: 'Vague prompt',
        goodPromptLabel: 'Structured prompt',
        badResultLabel: 'Generic and superficial answer',
        goodResultLabel: 'Precise and contextualized answer',
        qualityLabel: 'Answer quality',
        specificityLabel: 'Specificity',
        arrowLabel: '→',
      },
    },
  },
});
