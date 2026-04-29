import { defineSlide } from './_factory';

const PT_BODY = `Quando você conversa com o modelo no slide anterior, a resposta não veio como texto puro. Veio **formatada** — com negrito, listas, blocos de código, headings.

Isso é **Markdown**. E é o formato padrão de output de **todas** as LLMs modernas: ChatGPT, Claude, Gemini, Llama.

### O que é Markdown?

Markdown é uma linguagem de marcação leve. Foi criada em 2004 para escrever texto formatado sem precisar de HTML. Hoje é o formato universal de documentação, READMEs, e **respostas de LLMs**.

### Por que LLMs adotaram Markdown?

1. **Estrutura semântica:** \`**negrito**\` destaca, \`# heading\` organiza, blocos de código com tripla crase isolam trechos técnicos
2. **Treino:** modelos foram treinados em bilhões de páginas web — e a web usa Markdown extensivamente
3. **Legibilidade:** tanto humanos quanto máquinas conseguem ler o formato bruto

---

### Plain text vs Markdown

\`\`\`
Texto puro:          Markdown:
A capital é Brasília  # A Capital do Brasil
                      A capital é **Brasília**.
Fatos principais:     ## Fatos Principais
- Inaugurada em 1960  - Inaugurada em **1960**
- População: 3M       - População: **3M**
\`\`\`

No próximo slide, vamos praticar a sintaxe.`;

const EN_BODY = `When you talked to the model in the previous slide, the response didn't come as plain text. It came **formatted** — with bold, lists, code blocks, headings.

That's **Markdown**. And it's the default output format of **all** modern LLMs: ChatGPT, Claude, Gemini, Llama.

### What is Markdown?

Markdown is a lightweight markup language. It was created in 2004 to write formatted text without needing HTML. Today it's the universal format for documentation, READMEs, and **LLM responses**.

### Why did LLMs adopt Markdown?

1. **Semantic structure:** \`**bold**\` highlights, \`# heading\` organizes, triple-backtick blocks isolate technical snippets
2. **Training:** models were trained on billions of web pages — and the web uses Markdown extensively
3. **Readability:** both humans and machines can read the raw format

---

### Plain text vs Markdown

\`\`\`
Plain text:           Markdown:
The capital is        # The Capital of Brazil
Brasília              The capital is **Brasília**.
Main facts:           ## Main Facts
- Inaugurated 1960    - Inaugurated in **1960**
- Pop: 3M             - Population: **3M**
\`\`\`

In the next slide, let's practice the syntax.`;

export const markdownWhy = defineSlide({
  id: 'markdown-why',
  type: 'two-column',
  options: { columnRatios: [0.5, 0.5] },
  content: {
    'pt-br': {
      title: `Por que a resposta do modelo vem com **negrito** e \`código\`?`,
      body: PT_BODY,
      codeExplanations: [],
    },
    'en-us': {
      title: `Why does the model's response have **bold** and \`code\`?`,
      body: EN_BODY,
      codeExplanations: [],
    },
  },
  visual: {
    id: 'markdown-output-compare',
    copy: {
      'pt-br': {
        title: 'Plain Text vs Markdown',
        plainTextLabel: 'Texto Puro',
        markdownLabel: 'Markdown (LLM Output)',
        headingExample: '# heading',
        boldExample: '**negrito**',
        codeExample: '```python\ncode\n```',
        listExample: '- item 1\n- item 2',
        tableExample: '| Col | Valor |\n|---|---|',
        syntaxLabel: 'Sintaxe',
        renderLabel: 'Renderizado',
      },
      'en-us': {
        title: 'Plain Text vs Markdown',
        plainTextLabel: 'Plain Text',
        markdownLabel: 'Markdown (LLM Output)',
        headingExample: '# heading',
        boldExample: '**bold**',
        codeExample: '```python\ncode\n```',
        listExample: '- item 1\n- item 2',
        tableExample: '| Col | Value |\n|---|---|',
        syntaxLabel: 'Syntax',
        renderLabel: 'Rendered',
      },
    },
  },
});
