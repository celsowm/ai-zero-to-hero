import { defineSlide } from './_factory';

export const fewShotPrompting = defineSlide({
  id: 'few-shot-prompting',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Few-Shot Prompting',
      body: `Few-shot é quando você inclui **2-5 exemplos** no prompt para demonstrar o comportamento esperado. Isso muda drasticamente a qualidade da resposta.

### Por que funciona?

O modelo não está apenas "respondendo" — ele está **imitando o padrão** dos exemplos. Você está fazendo in-context learning: o modelo aprende o padrão durante a inferência.

### Estrutura de few-shot

1. **System** — define a tarefa geral
2. **Exemplo 1** — input → output esperado
3. **Exemplo 2** — input → output esperado (variação)
4. **Exemplo 3** — input → output esperado (edge case)
5. **Input real** — a pergunta que você quer responder

### Exemplo com LangChain

\`\`\`python
snippet:prompt-eng/few-shot-langchain
\`\`\`

> Few-shot não é sobre "ensinar fatos" — é sobre **demonstrar padrões de comportamento**.`,
    },
    'en-us': {
      title: 'Few-Shot Prompting',
      body: `Few-shot is when you include **2-5 examples** in the prompt to demonstrate expected behavior. This dramatically changes answer quality.

### Why does it work?

The model isn't just "answering" — it's **imitating the pattern** of examples. You're doing in-context learning: the model learns the pattern during inference.

### Few-shot structure

1. **System** — defines the general task
2. **Example 1** — input → expected output
3. **Example 2** — input → expected output (variation)
4. **Example 3** — input → expected output (edge case)
5. **Real input** — the question you want answered

### Example with LangChain

\`\`\`python
snippet:prompt-eng/few-shot-langchain
\`\`\`

> Few-shot isn't about "teaching facts" — it's about **demonstrating behavior patterns**.`,
    },
  },
  visual: {
    id: 'few-shot-prompting-visual',
    copy: {
      'pt-br': {
        title: 'Few-Shot: Exemplos → Padrão',
        example1Label: 'Exemplo 1',
        example2Label: 'Exemplo 2',
        example3Label: 'Exemplo 3',
        realInputLabel: 'Input real',
        outputLabel: 'Output do modelo',
        patternLabel: 'Padrão aprendido',
        arrowLabel: '→',
      },
      'en-us': {
        title: 'Few-Shot: Examples → Pattern',
        example1Label: 'Example 1',
        example2Label: 'Example 2',
        example3Label: 'Example 3',
        realInputLabel: 'Real input',
        outputLabel: 'Model output',
        patternLabel: 'Learned pattern',
        arrowLabel: '→',
      },
    },
  },
});
