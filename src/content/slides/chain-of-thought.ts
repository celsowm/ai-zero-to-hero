import { defineSlide } from './_factory';

export const chainOfThought = defineSlide({
  id: 'chain-of-thought',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Chain of Thought (CoT)',
      body: `Chain of Thought é uma técnica onde você força o modelo a **raciocinar passo a passo** antes de responder. Descoberta por Wei et al. (2022), ela aumenta drasticamente performance em tarefas matemáticas e de lógica.

### A frase mágica

**"Let's think step by step"** — essa única frase melhora accuracy em ~15% em problemas de GSM8K (matemática elementary).

### Por que funciona?

O modelo é autoregressivo: cada token gerado influencia os próximos. Quando ele gera **passos intermediários**, está criando "espaço de raciocínio" — tokens que guiam a resposta final para um caminho lógico.

### CoT Few-Shot

\`\`\`python
snippet:prompt-eng/cot-few-shot-math
\`\`\`

### Zero-shot CoT

\`\`\`python
snippet:prompt-eng/cot-zero-shot
\`\`\`

> CoT não é "ensinar matemática" — é **dar tempo de computação** para o modelo raciocinar.`,
    },
    'en-us': {
      title: 'Chain of Thought (CoT)',
      body: `Chain of Thought is a technique where you force the model to **reason step by step** before answering. Discovered by Wei et al. (2022), it dramatically increases performance on math and logic tasks.

### The magic phrase

**"Let's think step by step"** — this single phrase improves accuracy by ~15% on GSM8K problems (elementary math).

### Why does it work?

The model is autoregressive: each generated token influences the next. When it generates **intermediate steps**, it's creating "reasoning space" — tokens that guide the final answer down a logical path.

### CoT Few-Shot

\`\`\`python
snippet:prompt-eng/cot-few-shot-math
\`\`\`

### Zero-shot CoT

\`\`\`python
snippet:prompt-eng/cot-zero-shot
\`\`\`

> CoT isn't "teaching math" — it's **giving compute time** for the model to reason.`,
    },
  },
  visual: {
    id: 'chain-of-thought-visual',
    copy: {
      'pt-br': {
        title: 'Direto vs Chain of Thought',
        directLabel: 'Direto',
        cotLabel: 'Chain of Thought',
        inputLabel: 'Input',
        reasoningLabel: 'Raciocínio (passos)',
        outputLabel: 'Resposta',
        accuracyDirectLabel: 'Accuracy direto',
        accuracyCotLabel: 'Accuracy com CoT',
      },
      'en-us': {
        title: 'Direct vs Chain of Thought',
        directLabel: 'Direct',
        cotLabel: 'Chain of Thought',
        inputLabel: 'Input',
        reasoningLabel: 'Reasoning (steps)',
        outputLabel: 'Answer',
        accuracyDirectLabel: 'Direct accuracy',
        accuracyCotLabel: 'Accuracy with CoT',
      },
    },
  },
});
