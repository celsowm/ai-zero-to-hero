import { defineSlide } from './_factory';

export const reasoningVsCot = defineSlide({
  id: 'reasoning-vs-cot',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'CoT vs Reasoning Models',
      body: `É crucial entender: **Chain of Thought ≠ Reasoning Model**. Um é técnica de prompt, outro é modelo treinado.

### Chain of Thought (Prompt Engineering)

- **O que é**: Adicionar "think step by step" no prompt
- **Como funciona**: O modelo gera passos porque o contexto sugere
- **Limitação**: Não há garantia de qualidade nos passos; pode alucinar
- **Custo**: Zero — só muda o prompt

### Reasoning Model (Treinamento)

- **O que é**: Modelo fine-tuned com long CoT + RL
- **Como funciona**: O modelo **aprendeu** a raciocinar como parte do processo de geração
- **Vantagem**: Pensamentos mais estruturados, verificação interna, backtracking
- **Custo**: Tokens extras no output (pensamento + resposta)

### Comparação direta

\`\`\`python
snippet:reasoning/comparison-cot-vs-reasoning
\`\`\`

> CoT é como **pedir** para pensar. Reasoning Model é um modelo que **sabe** pensar.`,
    },
    'en-us': {
      title: 'CoT vs Reasoning Models',
      body: `It's crucial to understand: **Chain of Thought ≠ Reasoning Model**. One is a prompt technique, the other is a trained model.

### Chain of Thought (Prompt Engineering)

- **What**: Adding "think step by step" to the prompt
- **How it works**: The model generates steps because the context suggests it
- **Limitation**: No guarantee of step quality; can hallucinate
- **Cost**: Zero — just changes the prompt

### Reasoning Model (Training)

- **What**: Model fine-tuned with long CoT + RL
- **How it works**: The model **learned** to reason as part of the generation process
- **Advantage**: More structured thoughts, internal verification, backtracking
- **Cost**: Extra tokens in output (thinking + answer)

### Direct comparison

\`\`\`python
snippet:reasoning/comparison-cot-vs-reasoning
\`\`\`

> CoT is like **asking** to think. A Reasoning Model is a model that **knows** how to think.`,
    },
  },
  visual: {
    id: 'reasoning-vs-cot-visual',
    copy: {
      'pt-br': {
        title: 'CoT vs Reasoning Model',
        cotLabel: 'Chain of Thought',
        reasoningLabel: 'Reasoning Model',
        promptChange: 'Só muda o prompt',
        trainingChange: 'Fine-tuned com long CoT',
        promptQuality: 'Qualidade variável',
        reasoningQuality: 'Pensamentos estruturados',
        promptCost: 'Sem custo extra',
        reasoningCost: 'Tokens de thinking + resposta',
      },
      'en-us': {
        title: 'CoT vs Reasoning Model',
        cotLabel: 'Chain of Thought',
        reasoningLabel: 'Reasoning Model',
        promptChange: 'Just change the prompt',
        trainingChange: 'Fine-tuned with long CoT',
        promptQuality: 'Variable quality',
        reasoningQuality: 'Structured thoughts',
        promptCost: 'No extra cost',
        reasoningCost: 'Thinking tokens + answer',
      },
    },
  },
});
