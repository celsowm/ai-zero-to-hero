import { defineSlide } from './_factory';

export const promptStructureAnatomy = defineSlide({
  id: 'prompt-structure-anatomy',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Anatomia de um Prompt',
      body: `Um prompt bem estruturado segue um **padrão composto por 5 elementos** que, juntos, comunicam intenção, contexto e formato esperado ao modelo.

### Os 5 componentes

1. **System (Persona)** — define quem o modelo deve ser: *"Você é um especialista em machine learning..."*
2. **Contexto** — informações de fundo necessárias: *"O aluno sabe Python mas nunca viu cálculo..."*
3. **Instrução** — a tarefa específica: *"Explique derivadas usando a analogia do velocímetro..."*
4. **Exemplos** — demonstrações do formato esperado (few-shot)
5. **Formato de saída** — estrutura esperada: *"Responda em 3 parágrafos com um exemplo numérico"*

### Template golden

\`\`\`python
snippet:prompt-eng/anatomy-golden
\`\`\`

> Prompts ruins são ambíguos. Prompts bons são **explícitos sobre contexto, tarefa e formato**.`,
    },
    'en-us': {
      title: 'Anatomy of a Prompt',
      body: `A well-structured prompt follows a **pattern of 5 elements** that together communicate intent, context, and expected format to the model.

### The 5 components

1. **System (Persona)** — defines who the model should be: *"You are a machine learning expert..."*
2. **Context** — necessary background info: *"The student knows Python but has never seen calculus..."*
3. **Instruction** — the specific task: *"Explain derivatives using the speedometer analogy..."*
4. **Examples** — demonstrations of expected format (few-shot)
5. **Output format** — expected structure: *"Answer in 3 paragraphs with a numerical example"*

### Golden template

\`\`\`python
snippet:prompt-eng/anatomy-golden
\`\`\`

> Bad prompts are ambiguous. Good prompts are **explicit about context, task, and format**.`,
    },
  },
  visual: {
    id: 'prompt-structure-anatomy-visual',
    copy: {
      'pt-br': {
        title: 'Componentes de um Prompt',
        systemLabel: '🎭 System/Persona',
        contextLabel: '📖 Contexto',
        instructionLabel: '🎯 Instrução',
        examplesLabel: '💡 Exemplos',
        formatLabel: '📐 Formato',
        combinedLabel: 'Prompt completo',
        flowArrow: '→',
      },
      'en-us': {
        title: 'Prompt Components',
        systemLabel: '🎭 System/Persona',
        contextLabel: '📖 Context',
        instructionLabel: '🎯 Instruction',
        examplesLabel: '💡 Examples',
        formatLabel: '📐 Format',
        combinedLabel: 'Complete prompt',
        flowArrow: '→',
      },
    },
  },
});
