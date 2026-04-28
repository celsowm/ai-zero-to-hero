import { defineSlide } from './_factory';

export const pythonPrereqListComprehensions = defineSlide({
  id: 'python-prereq-list-comprehensions',
  type: 'two-column',
  options: {
    "columnRatios": [
      0.95,
      1.05
    ]
  },
  content: {
    'pt-br': {
      title: `Python Essencial: list comprehension`,
      body: `Depois de entender \`for\`, vale aprender a forma compacta de montar listas. Ela aparece muito em código numérico e em ML.

1. **Mesmo resultado, menos ruído:** em vez de \`lista = []\` + \`append\`, descrevemos a lista pronta.

2. **Leitura mental da sintaxe:** \`[expressao for item in colecao]\`.

3. **Ótima para transformação simples:** extrair uma coluna, normalizar valores, gerar uma lista intermediária.

4. **Não substitui tudo:** se a lógica ficar grande demais, o \`for\` tradicional continua melhor.

> A regra prática é simples: use comprehension quando ela deixar a intenção mais clara, não mais esperta.

### Tradução mental da sintaxe
\`\`\`txt
[altura for altura, idade, peso in dados]
\`\`\`

Leitura útil:
- “para cada tupla em \`dados\`, pegue \`altura\`”
- “monte uma nova lista com esses valores”

### Ponte curta para ML
\`\`\`txt
[x / 255 for x in pixels]
\`\`\`

Leitura útil:
- “para cada pixel, gere sua versão normalizada”

---

### Forma longa vs forma compacta
\`\`\`python
snippet:python-prereq/list-comprehensions
\`\`\`

- \`alturas\`: construída com \`for\` + \`append\`
- \`alturas_2\`: mesma lista, mas em uma linha
- leitura útil: “para cada amostra em \`dados\`, pegue \`altura\`”`,
      codeExplanations: [
    {
    "lineRange": [
      1,
      1
    ],
    "content": "Este dataset simples segue o mesmo padrão de tuplas usado em outros pré-requisitos."
  },
    {
    "lineRange": [
      3,
      6
    ],
    "content": "A forma longa cria uma lista vazia, percorre cada tupla e adiciona a altura com `append`."
  },
    {
    "lineRange": [
      7,
      9
    ],
    "content": "Aqui a list comprehension faz a mesma transformação em uma única expressão."
  },
    {
    "lineRange": [
      10,
      12
    ],
    "content": "As duas impressões servem para mostrar que os resultados são idênticos."
  }
  ],
    },
    'en-us': {
      title: `Python Essentials: list comprehension`,
      body: `Once \`for\` makes sense, the next useful step is the compact way to build lists. It appears often in numerical code and ML.

1. **Same result, less noise:** instead of \`list = []\` + \`append\`, we describe the final list directly.

2. **Mental reading of the syntax:** \`[expression for item in collection]\`.

3. **Great for simple transformations:** extracting one column, normalizing values, creating an intermediate list.

4. **Not a replacement for everything:** if the logic gets too large, the classic \`for\` loop is still better.

> Practical rule: use comprehension when it makes the intention clearer, not just shorter.

### Mental translation of the syntax
\`\`\`txt
[height for height, age, weight in data]
\`\`\`

Useful reading:
- “for each tuple in \`data\`, take \`height\`”
- “build a new list with those values”

### Short bridge to ML
\`\`\`txt
[x / 255 for x in pixels]
\`\`\`

Useful reading:
- “for each pixel, generate its normalized version”

---

### Long form vs compact form
\`\`\`python
snippet:python-prereq/list-comprehensions
\`\`\`

- \`heights\`: built with \`for\` + \`append\`
- \`heights_2\`: the same list in one line
- useful reading: “for each sample in \`data\`, take \`height\`”`,
      codeExplanations: [
    {
    "lineRange": [
      1,
      1
    ],
    "content": "This simple dataset follows the same tuple pattern used in the other prerequisites."
  },
    {
    "lineRange": [
      3,
      6
    ],
    "content": "The long form creates an empty list, walks through each tuple, and appends the height."
  },
    {
    "lineRange": [
      7,
      9
    ],
    "content": "The list comprehension performs the same transformation in a single expression."
  },
    {
    "lineRange": [
      10,
      12
    ],
    "content": "The two prints confirm that both approaches produce the same result."
  }
  ],
    },
  },
});
