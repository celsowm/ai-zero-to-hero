import { defineSlide } from './_factory';

export const linearRegressionPrediction = defineSlide({
  id: 'linear-regression-prediction',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.95,
      1.05
    ]
  },
  content: {
    'pt-br': {
      title: `Regressão Linear em Python: usando o modelo treinado`,
      body: `Agora a fórmula sai do treino e entra em modo de uso. A pergunta já não é “como ajusto \`beta\`?”, e sim “como obtenho uma resposta nova a partir de uma entrada nova?”.

1. **Entradas conhecidas:** altura e idade chegam com valores reais.

2. **Coeficientes fixos:** \`beta_0\`, \`beta_1\` e \`beta_2\` já vieram do treino; durante a predição, eles não mudam.

3. **Uma única conta:** o modelo aplica \`ŷ = beta_0 + beta_1 * altura + beta_2 * idade\` e devolve o peso estimado.

4. **Sem loop, sem gradiente:** predição não recalcula erro nem ajusta parâmetros. Ela só executa a fórmula aprendida.

> Treino aprende os coeficientes; predição só os usa.

---

### Exemplo rápido
\`\`\`python
snippet:linear-regression/prediction
\`\`\`

- entrada: um novo caso que o modelo ainda não viu
- saída: um valor estimado para esse caso
- objetivo: responder rápido com o que o modelo aprendeu`,
      codeExplanations: [
    {
    "lineRange": [
      1,
      2
    ],
    "content": "Estas linhas definem as entradas do novo exemplo: altura e idade."
  },
    {
    "lineRange": [
      3,
      3
    ],
    "content": "Aqui acontece a predição: a função usa os betas treinados para calcular o peso estimado."
  },
    {
    "lineRange": [
      4,
      4
    ],
    "content": "Esta linha imprime o resultado para conferência rápida."
  }
  ],
    },
    'en-us': {
      title: `Linear Regression in Python: using the trained model`,
      body: `Now the formula leaves training mode and enters usage mode. The question is no longer “how do I adjust \`beta\`?” but “how do I obtain a new answer from a new input?”.

1. **Known inputs:** height and age arrive with real values.

2. **Fixed coefficients:** \`beta_0\`, \`beta_1\`, and \`beta_2\` already came from training; during prediction, they do not change.

3. **One calculation:** the model applies \`ŷ = beta_0 + beta_1 * height + beta_2 * age\` and returns the estimated weight.

4. **No loop, no gradient:** prediction does not recompute error or update parameters. It only executes the learned formula.

> Training learns the coefficients; prediction only uses them.

---

### Quick example
\`\`\`python
snippet:linear-regression/prediction
\`\`\`

- input: one new case the model has never seen
- output: an estimated value for that case
- goal: answer quickly with what the model learned`,
      codeExplanations: [
    {
    "lineRange": [
      1,
      2
    ],
    "content": "These lines define the new input values: height and age."
  },
    {
    "lineRange": [
      3,
      3
    ],
    "content": "This is the prediction step: the function uses trained betas to compute estimated weight."
  },
    {
    "lineRange": [
      4,
      4
    ],
    "content": "This line prints the final result for a quick check."
  }
  ],
    },
  },
});
