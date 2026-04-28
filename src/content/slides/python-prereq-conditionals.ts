import { defineSlide } from './_factory';

export const pythonPrereqConditionals = defineSlide({
  id: 'python-prereq-conditionals',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.96,
      1.04
    ]
  },
  content: {
    'pt-br': {
      title: `Python Essencial: condicionais`,
      body: `Depois de ler dados e encapsular contas em funções, o próximo passo é decidir o caminho do programa.

1. **\`if\` testa a primeira hipótese:** se for verdadeira, o bloco executa.

2. **\`elif\` adiciona alternativas:** ele só roda se o anterior falhar.

3. **\`else\` fecha a regra:** cobre tudo o que sobrou.

4. **A ordem importa:** Python para no primeiro bloco verdadeiro.

> Condicionais transformam números em decisões simples e previsíveis.

---

### Exemplo rápido
\`\`\`python
snippet:python-prereq/conditionals
\`\`\`

- \`classificacao\`: resultado final da regra
- exemplo neutro: classificar um número como positivo, zero ou negativo
- a primeira condição verdadeira encerra a checagem`,
      codeExplanations: [
    {
    "lineRange": [
      1,
      2
    ],
    "content": "Aqui definimos um valor de entrada neutro para mostrar a estrutura da decisão."
  },
    {
    "lineRange": [
      4,
      5
    ],
    "content": "Se o número for maior que zero, o primeiro bloco é executado."
  },
    {
    "lineRange": [
      6,
      7
    ],
    "content": "O `elif` cobre o caso em que o número é exatamente zero."
  },
    {
    "lineRange": [
      8,
      9
    ],
    "content": "O `else` pega qualquer valor que não entrou nas condições anteriores."
  },
    {
    "lineRange": [
      11,
      11
    ],
    "content": "A impressão final mostra a decisão tomada pelo fluxo condicional."
  }
  ],
    },
    'en-us': {
      title: `Python Essentials: conditionals`,
      body: `After reading data and packaging calculations into functions, the next step is deciding which path the program should take.

1. **\`if\` tests the first hypothesis:** if it is true, that block runs.

2. **\`elif\` adds alternatives:** it only runs when the previous one fails.

3. **\`else\` closes the rule:** it covers everything left.

4. **Order matters:** Python stops at the first true block.

> Conditionals turn numbers into simple, predictable decisions.

---

### Quick example
\`\`\`python
snippet:python-prereq/conditionals
\`\`\`

- \`classification\`: final result of the rule
- neutral example: classify a number as positive, zero, or negative
- the first true condition ends the check`,
      codeExplanations: [
    {
    "lineRange": [
      1,
      2
    ],
    "content": "This sets a neutral input value so the control flow is easy to follow."
  },
    {
    "lineRange": [
      4,
      5
    ],
    "content": "If the number is above zero, the first block decides the classification."
  },
    {
    "lineRange": [
      6,
      7
    ],
    "content": "The `elif` covers the exact zero case, only after the first failure."
  },
    {
    "lineRange": [
      8,
      9
    ],
    "content": "The `else` catches any value that did not fit previous conditions."
  },
    {
    "lineRange": [
      11,
      11
    ],
    "content": "The final print shows the decision made by the conditional flow."
  }
  ],
    },
  },
  visual: {
    id: 'python-prereq-tabs',
    copy: {
      "pt-br": {
        "tabs": [
          {
          "label": "Código"
        },
          {
          "label": "Passos"
        }
        ],
        "codePanel": {
          "title": "Código: decisão por sinal",
          "description": "O mesmo exemplo do texto, agora com o snippet aberto para consulta rápida.",
          "source": {
            "snippetId": "python-prereq/conditionals",
            "language": "python"
          },
          "codeExplanations": [
            {
            "lineRange": [
              1,
              2
            ],
            "content": "A variável de entrada começa com um valor negativo para acionar o caminho do `else`."
          },
            {
            "lineRange": [
              4,
              5
            ],
            "content": "O primeiro teste cobre o caso em que o número é maior que zero."
          },
            {
            "lineRange": [
              6,
              7
            ],
            "content": "O `elif` trata o caso exato de zero, depois que o primeiro teste falha."
          },
            {
            "lineRange": [
              8,
              9
            ],
            "content": "O `else` fecha a regra e captura qualquer valor restante."
          },
            {
            "lineRange": [
              11,
              11
            ],
            "content": "A saída final mostra a classificação escolhida pelo fluxo condicional."
          }
          ]
        },
        "graphPanel": {
          "type": "conditionals",
          "title": "Passo a passo do if / elif / else",
          "description": "Navegue pelos passos e veja o caminho da decisão, com o bloco ativo destacado em cada etapa.",
          "xLabel": "Valor de entrada",
          "yLabel": "Fluxo de decisão",
          "valueLabel": "Número de teste",
          "branchLabel": "Caminho ativo",
          "traceLabel": "Rastro da decisão",
          "range": [
            -10,
            10
          ],
          "initialValue": -3,
          "branchLabels": {
            "negative": "else",
            "zero": "elif",
            "positive": "if"
          },
          "branchDescriptions": {
            "negative": "Valores menores que zero seguem para o bloco final, porque não passaram pelos testes anteriores.",
            "zero": "Quando o valor é exatamente zero, o fluxo para neste ponto e não avança para o `else`.",
            "positive": "Valores acima de zero entram no primeiro teste e encerram a checagem imediatamente."
          }
        },
        "footer": "Cada condição elimina caminhos até restar uma única classificação possível."
      },
      "en-us": {
        "tabs": [
          {
          "label": "Code"
        },
          {
          "label": "Steps"
        }
        ],
        "codePanel": {
          "title": "Code: sign-based decision",
          "description": "The same example from the text, now opened for quick reference.",
          "source": {
            "snippetId": "python-prereq/conditionals",
            "language": "python"
          },
          "codeExplanations": [
            {
            "lineRange": [
              1,
              2
            ],
            "content": "The input variable starts with a negative value so the `else` path is triggered."
          },
            {
            "lineRange": [
              4,
              5
            ],
            "content": "The first test covers the case where the number is greater than zero."
          },
            {
            "lineRange": [
              6,
              7
            ],
            "content": "The `elif` handles the exact zero case after the first check fails."
          },
            {
            "lineRange": [
              8,
              9
            ],
            "content": "The `else` closes the rule and captures any remaining value."
          },
            {
            "lineRange": [
              11,
              11
            ],
            "content": "The final output shows the classification chosen by the conditional flow."
          }
          ]
        },
        "graphPanel": {
          "type": "conditionals",
          "title": "Step-by-step if / elif / else",
          "description": "Move through the steps and watch the decision path, with the active block highlighted at each stage.",
          "xLabel": "Input value",
          "yLabel": "Decision flow",
          "valueLabel": "Test number",
          "branchLabel": "Active path",
          "traceLabel": "Decision trace",
          "range": [
            -10,
            10
          ],
          "initialValue": -3,
          "branchLabels": {
            "negative": "else",
            "zero": "elif",
            "positive": "if"
          },
          "branchDescriptions": {
            "negative": "Values below zero reach the final block because they did not satisfy earlier tests.",
            "zero": "When the value is exactly zero, the flow stops here and never reaches `else`.",
            "positive": "Values above zero enter the first test and end the check immediately."
          }
        },
        "footer": "Each condition removes paths until only one classification remains."
      }
    },
  },
});
