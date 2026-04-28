import { defineSlide } from './_factory';

export const pythonPrereqData = defineSlide({
  id: 'python-prereq-data',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.95,
      1.05
    ]
  },
  content: {
    'pt-br': {
      title: `Python Essencial: dados e variáveis`,
      body: `Antes de entrar na IA, vale alinhar o alfabeto do Python que vamos usar no curso.

1. **Variáveis com nomes claros:** guardam valores que o modelo usa depois.

2. **Números e tuplas:** cada observação pode virar uma tupla como \`(altura, idade, peso)\`.

3. **Lista de exemplos:** um conjunto de tuplas vira a base para treino e análise.

4. **Leitura simples:** acessar \`dados[0][0]\` significa “primeira linha, primeira coluna”.

> Este slide é só base de leitura de dados: sem treino, sem gradiente.

---

### Exemplo rápido
\`\`\`python
snippet:python-prereq/data
\`\`\`

- \`amostra\`: uma tupla com 3 valores
- \`dados\`: lista de amostras
- \`dados[0][0]\`: primeira altura registrada`,
      codeExplanations: [
    {
    "lineRange": [
      2,
      5
    ],
    "content": "Estas linhas criam variáveis numéricas e montam uma tupla com os valores da amostra."
  },
    {
    "lineRange": [
      6,
      10
    ],
    "content": "Aqui montamos uma lista de tuplas, estrutura que reaparece nos exemplos de regressão."
  },
    {
    "lineRange": [
      11,
      11
    ],
    "content": "Este acesso usa índice de lista e tupla para ler a primeira altura do conjunto."
  },
    {
    "lineRange": [
      12,
      12
    ],
    "content": "A linha imprime o valor lido para conferir rapidamente os dados."
  }
  ],
    },
    'en-us': {
      title: `Python Essentials: data and variables`,
      body: `Before diving into AI, we align the Python alphabet used throughout this course.

1. **Clear variable names:** they store values the model will later consume.

2. **Numbers and tuples:** each observation can be represented as \`(height, age, weight)\`.

3. **List of examples:** a set of tuples becomes the base for training and analysis.

4. **Simple reading:** \`data[0][0]\` means “first row, first column”.

> This slide is only about data reading basics: no training, no gradients.

---

### Quick example
\`\`\`python
snippet:python-prereq/data
\`\`\`

- \`sample\`: one tuple with 3 values
- \`data\`: list of samples
- \`data[0][0]\`: first recorded height`,
      codeExplanations: [
    {
    "lineRange": [
      2,
      5
    ],
    "content": "These lines create numeric variables and assemble them into one tuple sample."
  },
    {
    "lineRange": [
      6,
      10
    ],
    "content": "Here we build a list of tuples, the same structure used later in regression examples."
  },
    {
    "lineRange": [
      11,
      11
    ],
    "content": "This access combines list and tuple indexing to read the first height value."
  },
    {
    "lineRange": [
      12,
      12
    ],
    "content": "This line prints the extracted value as a quick data check."
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
          "label": "Gráfico interativo"
        }
        ],
        "codePanel": {
          "title": "Código: estrutura de dados em Python",
          "description": "A mesma base do slide, agora com leitura guiada em linhas chave.",
          "source": {
            "snippetId": "python-prereq/data",
            "language": "python"
          },
          "codeExplanations": [
            {
            "lineRange": [
              2,
              5
            ],
            "content": "Estas linhas criam variáveis numéricas e montam uma tupla com os valores da amostra."
          },
            {
            "lineRange": [
              6,
              10
            ],
            "content": "Aqui montamos uma lista de tuplas, estrutura que reaparece nos exemplos de regressão."
          },
            {
            "lineRange": [
              11,
              11
            ],
            "content": "Este acesso usa índice de lista e tupla para ler a primeira altura do conjunto."
          },
            {
            "lineRange": [
              12,
              12
            ],
            "content": "A linha imprime o valor lido para conferência rápida."
          }
          ]
        },
        "graphPanel": {
          "type": "data",
          "title": "Leitura interativa das amostras",
          "description": "Use o controle para destacar uma amostra e visualizar altura e peso no gráfico.",
          "xLabel": "Altura",
          "yLabel": "Peso",
          "highlightLabel": "Amostra selecionada",
          "detailLabels": {
            "height": "Altura",
            "age": "Idade",
            "weight": "Peso"
          },
          "dataset": [
            {
            "label": "A",
            "height": 160,
            "age": 20,
            "weight": 55,
            "accent": "#00e5ff"
          },
            {
            "label": "B",
            "height": 165,
            "age": 24,
            "weight": 59,
            "accent": "#a855f7"
          },
            {
            "label": "C",
            "height": 172,
            "age": 29,
            "weight": 68.5,
            "accent": "#fbbf24"
          }
          ]
        },
        "footer": "Nesta etapa, o foco é organizar e ler dados de forma clara antes de qualquer treino."
      },
      "en-us": {
        "tabs": [
          {
          "label": "Code"
        },
          {
          "label": "Interactive chart"
        }
        ],
        "codePanel": {
          "title": "Code: Python data structure",
          "description": "The same base from the slide, now with guided line-level reading.",
          "source": {
            "snippetId": "python-prereq/data",
            "language": "python"
          },
          "codeExplanations": [
            {
            "lineRange": [
              2,
              5
            ],
            "content": "These lines create numeric variables and assemble one tuple sample."
          },
            {
            "lineRange": [
              6,
              10
            ],
            "content": "Here we build a list of tuples, the same structure used later in regression."
          },
            {
            "lineRange": [
              11,
              11
            ],
            "content": "This access combines list and tuple indexing to read the first height value."
          },
            {
            "lineRange": [
              12,
              12
            ],
            "content": "This line prints the extracted value for a quick check."
          }
          ]
        },
        "graphPanel": {
          "type": "data",
          "title": "Interactive sample reading",
          "description": "Use the control to highlight one sample and inspect height and weight on the chart.",
          "xLabel": "Height",
          "yLabel": "Weight",
          "highlightLabel": "Selected sample",
          "detailLabels": {
            "height": "Height",
            "age": "Age",
            "weight": "Weight"
          },
          "dataset": [
            {
            "label": "A",
            "height": 160,
            "age": 20,
            "weight": 55,
            "accent": "#00e5ff"
          },
            {
            "label": "B",
            "height": 165,
            "age": 24,
            "weight": 59,
            "accent": "#a855f7"
          },
            {
            "label": "C",
            "height": 172,
            "age": 29,
            "weight": 68.5,
            "accent": "#fbbf24"
          }
          ]
        },
        "footer": "At this stage, the focus is organizing and reading data clearly before any training."
      }
    },
  },
});
