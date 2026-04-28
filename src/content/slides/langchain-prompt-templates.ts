import { defineSlide } from './_factory';

export const langchainPromptTemplates = defineSlide({
  id: 'langchain-prompt-templates',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: 'Prompt Templates',
      body: `Prompts são o **input** do LLM. LangChain oferece **3 tipos de templates** para diferentes cenários.

### PromptTemplate (simples)

Template com variáveis que são substituídas:

\`\`\`python
snippet:langchain/simple-prompt
\`\`\`

### ChatPromptTemplate (com roles)

Para modelos de chat com System/Human/AI:

\`\`\`python
snippet:langchain/chat-prompt
\`\`\`

### FewShotPromptTemplate (com exemplos)

Inclui exemplos para guiar o modelo:

\`\`\`python
snippet:langchain/few-shot-prompt
\`\`\`

> Few-shot prompting pode melhorar significativamente a qualidade das respostas sem fine-tuning.`,
    },
    'en-us': {
      title: 'Prompt Templates',
      body: `Prompts are the **input** of the LLM. LangChain offers **3 types of templates** for different scenarios.

### PromptTemplate (simple)

Template with variables that get substituted:

\`\`\`python
snippet:langchain/simple-prompt
\`\`\`

### ChatPromptTemplate (with roles)

For chat models with System/Human/AI:

\`\`\`python
snippet:langchain/chat-prompt
\`\`\`

### FewShotPromptTemplate (with examples)

Includes examples to guide the model:

\`\`\`python
snippet:langchain/few-shot-prompt
\`\`\`

> Few-shot prompting can significantly improve response quality without fine-tuning.`,
    },
  },
  visual: {
    id: 'langchain-prompt-templates-visual',
    copy: {
      'pt-br': {
        title: 'Tipos de Prompt Template',
        simpleLabel: 'PromptTemplate',
        chatLabel: 'ChatPromptTemplate',
        fewShotLabel: 'FewShotPromptTemplate',
        simpleDesc: 'Template simples com variáveis — ideal para one-off prompts',
        chatDesc: 'Templates com System/Human/AI roles — ideal para chat models',
        fewShotDesc: 'Templates com exemplos — ideal para guiar o comportamento do modelo',
        templateLabel: 'Template',
        inputLabel: 'Input',
        resultLabel: 'Resultado',
      },
      'en-us': {
        title: 'Prompt Template Types',
        simpleLabel: 'PromptTemplate',
        chatLabel: 'ChatPromptTemplate',
        fewShotLabel: 'FewShotPromptTemplate',
        simpleDesc: 'Simple template with variables — ideal for one-off prompts',
        chatDesc: 'Templates with System/Human/AI roles — ideal for chat models',
        fewShotDesc: 'Templates with examples — ideal for guiding model behavior',
        templateLabel: 'Template',
        inputLabel: 'Input',
        resultLabel: 'Result',
      },
    },
  },
});
