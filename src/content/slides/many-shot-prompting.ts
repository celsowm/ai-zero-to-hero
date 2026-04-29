import { defineSlide } from './_factory';

export const manyShotPrompting = defineSlide({
  id: 'many-shot-prompting',
  type: 'two-column',
  options: { columnRatios: [0.55, 0.45] },
  content: {
    'pt-br': {
      title: 'Many-Shot & In-Context Learning',
      body: `Quando você escala de 5 para **50-100 exemplos**, entra no território de many-shot prompting. Pesquisas recentes do Google e Anthropic mostraram que mais exemplos = melhor performance, com curvas surpreendentes.

### Descobertas chave (Anthropic, 2024)

1. **Linear scaling** — cada exemplo adicional melhora accuracy, mesmo em 100+ exemplos
2. **Não satura rápido** — diferente do que se pensava, a curva não achata em 5-10 exemplos
3. **Qualidade > quantidade** — exemplos diversificados valem mais que repetições

### Curva de performance

\`\`\`python
snippet:prompt-eng/many-shot-in-context
\`\`\`

### Quando usar many-shot?

1. **Classificação complexa** — o modelo precisa ver muitos casos para aprender nuances
2. **Extração de dados** — formatos de output complexos com edge cases
3. **Tarefas não vistas no treino** — comportamentos totalmente novos

> Many-shot transforma o LLM em um **aprendiz de contexto**: ele aprende o pattern on-the-fly sem fine-tuning.`,
    },
    'en-us': {
      title: 'Many-Shot & In-Context Learning',
      body: `When you scale from 5 to **50-100 examples**, you enter many-shot prompting territory. Recent research from Google and Anthropic showed that more examples = better performance, with surprising curves.

### Key findings (Anthropic, 2024)

1. **Linear scaling** — each additional example improves accuracy, even at 100+ examples
2. **Doesn't saturate quickly** — contrary to belief, the curve doesn't flatten at 5-10 examples
3. **Quality > quantity** — diverse examples are worth more than repetitions

### Performance curve

\`\`\`python
snippet:prompt-eng/many-shot-in-context
\`\`\`

### When to use many-shot?

1. **Complex classification** — the model needs to see many cases to learn nuances
2. **Data extraction** — complex output formats with edge cases
3. **Unseen tasks** — entirely new behaviors not in training data

> Many-shot turns the LLM into a **context learner**: it learns the pattern on-the-fly without fine-tuning.`,
    },
  },
  visual: {
    id: 'many-shot-prompting-visual',
    copy: {
      'pt-br': {
        title: 'Curva: Exemplos vs Accuracy',
        xLabel: 'Número de exemplos',
        yLabel: 'Accuracy (%)',
        fewShotLabel: 'Few-shot (2-5)',
        manyShotLabel: 'Many-shot (50+)',
        saturationLabel: 'Curva de saturação',
        improvementLabel: 'Melhoria contínua',
      },
      'en-us': {
        title: 'Curve: Examples vs Accuracy',
        xLabel: 'Number of examples',
        yLabel: 'Accuracy (%)',
        fewShotLabel: 'Few-shot (2-5)',
        manyShotLabel: 'Many-shot (50+)',
        saturationLabel: 'Saturation curve',
        improvementLabel: 'Continuous improvement',
      },
    },
  },
});
