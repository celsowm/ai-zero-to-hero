import { defineSlide } from './_factory';

export const jinjaIntro = defineSlide({
  id: 'jinja-intro',
  type: 'two-column',
  options: { columnRatios: [0.48, 0.52] },
  content: {
    'pt-br': {
      title: `O que é Jinja Template?`,
      body: `O \`apply_chat_template\` do Hugging Face usa **Jinja** — uma engine de templates Python que interpola variáveis e executa lógica simples dentro de chaves.

Jinja é o padrão da indústria para templates de LLM, usado no Hugging Face Tokenizer, LangChain, e sistemas de prompt engineering.

### Sintaxe básica:

| Expressão | Sintaxe | Efeito |
|-----------|---------|--------|
| **Variável** | \`{{ nome }}\` | Substitui pelo valor da variável |
| **For loop** | \`{% for x in list %}...{% endfor %}\` | Itera sobre uma lista |
| **If/else** | \`{% if cond %}...{% endif %}\` | Executa condicionalmente |
| **Comentário** | \`{# comentário #}\` | Ignorado na saída |

### Exemplo simples:

\`\`\`python
snippet:jinja/jinja-intro-example
\`\`\`

> Jinja transforma templates estáticos em textos dinâmicos — essencial para estruturar prompts e conversas.`,
      codeExplanations: [
        {
          lineRange: [1, 3],
          content: 'Importamos a classe Template do Jinja2 e criamos um template simples.',
        },
        {
          lineRange: [4, 5],
          content: 'Renderizamos o template passando o valor — a saída substitui a variável pelo valor fornecido.',
        },
      ],
    },
    'en-us': {
      title: `What is Jinja Template?`,
      body: `Hugging Face's \`apply_chat_template\` uses **Jinja** — a Python template engine that interpolates variables and executes simple logic within curly braces.

Jinja is the industry standard for LLM templating, used in Hugging Face Tokenizer, LangChain, and prompt engineering systems.

### Basic syntax:

| Expression | Syntax | Effect |
|-----------|--------|--------|
| **Variable** | \`{{ name }}\` | Substitutes with the variable value |
| **For loop** | \`{% for x in list %}...{% endfor %}\` | Iterates over a list |
| **If/else** | \`{% if cond %}...{% endif %}\` | Conditionally executes |
| **Comment** | \`{# comment #}\` | Ignored in output |

### Simple example:

\`\`\`python
snippet:jinja/jinja-intro-example
\`\`\`

> Jinja turns static templates into dynamic text — essential for structuring prompts and conversations.`,
      codeExplanations: [
        {
          lineRange: [1, 3],
          content: 'Import the Template class from Jinja2 and create a simple template.',
        },
        {
          lineRange: [4, 5],
          content: 'Render the template by passing the value — the output substitutes the variable with the provided value.',
        },
      ],
    },
  },
  visual: {
    id: 'jinja-intro-visual',
    copy: {
      'pt-br': {
        title: 'Template vs Renderizado',
        templateLabel: 'Template Jinja',
        renderedLabel: 'Resultado Renderizado',
        variableExample: '{{ nome }} → "World"',
        variableRendered: 'Hello, World!',
        forLoopExample: '{% for item in items %}...{% endfor %}',
        forLoopRendered: '  apple\\n  banana\\n  cherry',
        ifExample: '{% if cond %}...{% else %}...{% endif %}',
        ifRendered: 'Welcome, Alice!',
      },
      'en-us': {
        title: 'Template vs Rendered',
        templateLabel: 'Jinja Template',
        renderedLabel: 'Rendered Output',
        variableExample: '{{ name }} → "World"',
        variableRendered: 'Hello, World!',
        forLoopExample: '{% for item in items %}...{% endfor %}',
        forLoopRendered: '  apple\\n  banana\\n  cherry',
        ifExample: '{% if cond %}...{% else %}...{% endif %}',
        ifRendered: 'Welcome, Alice!',
      },
    },
  },
});
