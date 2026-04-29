import { defineSlide } from './_factory';

const PT_BODY = `Todo prompt que você envia e toda resposta que recebe de uma LLM usa Markdown internamente. Dominar a sintaxe ajuda a **ler** e **escrever** prompts melhores.

### Elementos essenciais

| Sintaxe | Renderiza como | Uso em LLMs |
|---|---|---|
| \`# Título\` | Heading grande | Seções da resposta |
| \`## Subtítulo\` | Heading médio | Sub-seções |
| \`**texto**\` | **Negrito** | Destaque de conceitos |
| \`*texto*\` | *Itálico* | Ênfase leve |
| crase + código | \`Inline code\` | Nomes de funções |
| tripla crase + lang | Code block destacado | Snippets completos |
| \`- item\` | Bullet list | Listas de fatos |
| \`1. item\` | Lista numerada | Rankings, passos |
| \`| col | col |\` | Tabela formatada | Comparações |
| \`[link](url)\` | Hyperlink | Referências |

### Exemplo prático

\`\`\`python
snippet:markdown-syntax
\`\`\`

> Toda vez que uma LLM responde, ela está gerando **Markdown** — e o frontend renderiza para HTML que você vê bonito.`;

const EN_BODY = `Every prompt you send and every response you receive from an LLM uses Markdown internally. Mastering the syntax helps you **read** and **write** better prompts.

### Essential elements

| Syntax | Renders as | Usage in LLMs |
|---|---|---|
| \`# Title\` | Large heading | Response sections |
| \`## Subtitle\` | Medium heading | Sub-sections |
| \`**text**\` | **Bold** | Concept highlights |
| \`*text*\` | *Italic* | Light emphasis |
| backtick + code | \`Inline code\` | Function names |
| triple backtick + lang | Highlighted code block | Full snippets |
| \`- item\` | Bullet list | Fact lists |
| \`1. item\` | Numbered list | Rankings, steps |
| \`| col | col |\` | Formatted table | Comparisons |
| \`[link](url)\` | Hyperlink | References |

### Practical example

\`\`\`python
snippet:markdown-syntax
\`\`\`

> Every time an LLM responds, it's generating **Markdown** — and the frontend renders it into the HTML you see beautifully.`;

export const markdownSyntax = defineSlide({
  id: 'markdown-syntax',
  type: 'two-column',
  options: { columnRatios: [0.45, 0.55] },
  content: {
    'pt-br': {
      title: `Markdown: sintaxe rápida`,
      body: PT_BODY,
      codeExplanations: [
        {
          lineRange: [2, 12],
          content: 'A mesma informação em texto puro: simples, mas sem estrutura visual.',
        },
        {
          lineRange: [15, 28],
          content: 'Em Markdown: headings, negrito, tabela e code block — a resposta fica estruturada.',
        },
        {
          lineRange: [31, 33],
          content: 'O pipeline: tokens → texto → Markdown → HTML renderizado.',
        },
      ],
    },
    'en-us': {
      title: `Markdown: quick syntax reference`,
      body: EN_BODY,
      codeExplanations: [
        {
          lineRange: [2, 12],
          content: 'The same information in plain text: simple, but without visual structure.',
        },
        {
          lineRange: [15, 28],
          content: 'In Markdown: headings, bold, table, and code block — the response becomes structured.',
        },
        {
          lineRange: [31, 33],
          content: 'The pipeline: tokens → text → Markdown → rendered HTML.',
        },
      ],
    },
  },
  visual: {
    id: 'markdown-syntax-visual',
    copy: {
      'pt-br': {
        title: 'Sintaxe Markdown Interativa',
        syntaxLabel: 'Sintaxe',
        renderLabel: 'Renderizado',
        headingLabel: 'Heading',
        boldLabel: 'Negrito',
        codeLabel: 'Código',
        listLabel: 'Lista',
        tableLabel: 'Tabela',
      },
      'en-us': {
        title: 'Interactive Markdown Syntax',
        syntaxLabel: 'Syntax',
        renderLabel: 'Rendered',
        headingLabel: 'Heading',
        boldLabel: 'Bold',
        codeLabel: 'Code',
        listLabel: 'List',
        tableLabel: 'Table',
      },
    },
  },
});
