import { defineSlide } from './_factory';

export const reasoningTraining = defineSlide({
  id: 'reasoning-training',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Treinando Reasoning Models',
      body: `Treinar um reasoning model vai além do SFT tradicional. Envolve **long CoT**, **Process Reward Models** e **RL**.

### Pipeline de Treino

1. **SFT com Long CoT**: Fine-tune com exemplos de raciocínio longo
2. **Process Reward Model (PRM)**: Modelo que avalia qualidade de cada step
3. **Reinforcement Learning**: RLHF com reward baseado na qualidade do reasoning

### SFT com Long CoT

\`\`\`python
snippet:reasoning/training-sft
\`\`\`

### Process Reward Model

O PRM não avalia a resposta final — avalia **cada passo** do raciocínio:

\`\`\`python
snippet:reasoning/prm-inference
\`\`\`

### RL com Reasoning Rewards

- **Outcome RM**: Reward baseado na resposta final (acertou/errou)
- **Process RM**: Reward baseado na qualidade dos passos intermediários
- **Combinado**: Ambos para garantir pensamento correto + resposta correta

> Treinar reasoning é como ensinar um aluno: não basta acertar, o caminho importa.`,
    },
    'en-us': {
      title: 'Training Reasoning Models',
      body: `Training a reasoning model goes beyond traditional SFT. It involves **long CoT**, **Process Reward Models**, and **RL**.

### Training Pipeline

1. **SFT with Long CoT**: Fine-tune with long reasoning examples
2. **Process Reward Model (PRM)**: Model that evaluates quality of each step
3. **Reinforcement Learning**: RLHF with reward based on reasoning quality

### SFT with Long CoT

\`\`\`python
snippet:reasoning/training-sft
\`\`\`

### Process Reward Model

The PRM doesn't evaluate the final answer — it evaluates **each step** of the reasoning:

\`\`\`python
snippet:reasoning/prm-inference
\`\`\`

### RL with Reasoning Rewards

- **Outcome RM**: Reward based on final answer (right/wrong)
- **Process RM**: Reward based on intermediate step quality
- **Combined**: Both to ensure correct thinking + correct answer

> Training reasoning is like teaching a student: getting the right answer isn't enough, the path matters.`,
    },
  },
  visual: {
    id: 'reasoning-training-visual',
    copy: {
      'pt-br': {
        title: 'Pipeline de Treino',
        sftLabel: 'SFT com Long CoT',
        sftDesc: 'Fine-tune com exemplos de raciocínio detalhado',
        prmLabel: 'Process Reward Model',
        prmDesc: 'Avalia qualidade de cada step do reasoning',
        rlLabel: 'Reinforcement Learning',
        rlDesc: 'RLHF com rewards de outcome + process',
      },
      'en-us': {
        title: 'Training Pipeline',
        sftLabel: 'SFT with Long CoT',
        sftDesc: 'Fine-tune with detailed reasoning examples',
        prmLabel: 'Process Reward Model',
        prmDesc: 'Evaluates quality of each reasoning step',
        rlLabel: 'Reinforcement Learning',
        rlDesc: 'RLHF with outcome + process rewards',
      },
    },
  },
});
