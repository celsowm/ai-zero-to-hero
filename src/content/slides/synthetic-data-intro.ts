import { defineSlide } from './_factory';

export const syntheticDataIntro = defineSlide({
  id: 'synthetic-data-intro',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'O que é Geração Sintética de Dados para SFT?',
      body: `Geração sintética de dados é a **criação artificial de exemplos de treino** para SFT (Supervised Fine-Tuning) / instruction tuning.

Em vez de depender exclusivamente de dados anotados por humanos, usamos modelos (LLMs) para gerar pares de:
- \`instrução → resposta\`
- \`messages → assistant\`
- \`prompt → completion\`

### Por que usar dados sintéticos?

- **Escala:** amplificar dataset sem anotação manual massiva
- **Diversidade:** cobrir edge cases e cenários raros
- **Custo:** reduzir expensive human annotation
- **Controle:** garantir distribuição balanceada de tarefas

### O que faz um dataset sintético *bom*?

Um dataset sintético de qualidade não é apenas "muitos exemplos". Ele precisa cobrir:

- **Tipos diferentes de instrução:** perguntas, comandos,_requests implícitos
- **Formatos de resposta:** listas, código, explicações, refusals
- **Níveis de dificuldade:** do simples ao multi-step reasoning
- **Casos negativos:** o que *não* fazer, refusals apropriados
- **Edge cases:** entradas ambíguas, outliers, prompts malformados
- **Avaliação separada:** treino e eval não podem se contaminar

> **SFT ensina o modelo a responder como queremos; geração sintética nos ajuda a construir esse comportamento de forma controlada, escalável e mensurável.**

**Referências:**
- [Instruction Tuning for Large Language Models: A Survey — arXiv 2308.10792](https://arxiv.org/abs/2308.10792)
- [A Survey on Data Synthesis and Augmentation for LLMs — arXiv 2410.12896](https://arxiv.org/abs/2410.12896)`,
    },
    'en-us': {
      title: 'What is Synthetic Data Generation for SFT?',
      body: `Synthetic data generation is the **artificial creation of training examples** for SFT (Supervised Fine-Tuning) / instruction tuning.

Instead of relying exclusively on human-annotated data, we use models (LLMs) to generate pairs of:
- \`instruction → response\`
- \`messages → assistant\`
- \`prompt → completion\`

### Why use synthetic data?

- **Scale:** amplify dataset without massive manual annotation
- **Diversity:** cover edge cases and rare scenarios
- **Cost:** reduce expensive human annotation
- **Control:** ensure balanced task distribution

### What makes a *good* synthetic dataset?

A quality synthetic dataset is not just "many examples". It needs to cover:

- **Different instruction types:** questions, commands, implicit requests
- **Response formats:** lists, code, explanations, refusals
- **Difficulty levels:** from simple to multi-step reasoning
- **Negative cases:** what *not* to do, appropriate refusals
- **Edge cases:** ambiguous inputs, outliers, malformed prompts
- **Separate evaluation:** train and eval must not contaminate each other

> **SFT teaches the model to respond as we want; synthetic generation helps us build this behavior in a controlled, scalable, and measurable way.**

**References:**
- [Instruction Tuning for Large Language Models: A Survey — arXiv 2308.10792](https://arxiv.org/abs/2308.10792)
- [A Survey on Data Synthesis and Augmentation for LLMs — arXiv 2410.12896](https://arxiv.org/abs/2410.12896)`,
    },
  },
  visual: {
    id: 'synthetic-data-intro-visual',
    copy: {
      'pt-br': {
        title: 'Dados Reais vs Sintéticos',
        humanLabel: 'Anotação Humana',
        syntheticLabel: 'Geração Sintética',
        humanFlow: 'Fluxo Tradicional',
        syntheticFlow: 'Fluxo Sintético',
        humanSteps: ['Coleta de dados', 'Anotação manual', 'QA/Revisão', 'Dataset final'],
        syntheticSteps: ['Seed prompts', 'LLM gerador', 'Filtragem', 'Dataset final'],
        humanCost: 'Alto custo',
        syntheticCost: 'Escala rápida',
        humanQuality: 'Alta qualidade',
        syntheticQuality: 'Variavel (filtragem)',
        clickHint: 'Clique em cada etapa para ver detalhes',
      },
      'en-us': {
        title: 'Real vs Synthetic Data',
        humanLabel: 'Human Annotation',
        syntheticLabel: 'Synthetic Generation',
        humanFlow: 'Traditional Flow',
        syntheticFlow: 'Synthetic Flow',
        humanSteps: ['Data collection', 'Manual annotation', 'QA/Review', 'Final dataset'],
        syntheticSteps: ['Seed prompts', 'LLM generator', 'Filtering', 'Final dataset'],
        humanCost: 'High cost',
        syntheticCost: 'Fast scale',
        humanQuality: 'High quality',
        syntheticQuality: 'Variable (filtering)',
        clickHint: 'Click each step for details',
      },
    },
  },
});