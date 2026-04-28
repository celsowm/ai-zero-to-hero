import { defineSlide } from './_factory';

export const ragHallucination = defineSlide({
  id: 'rag-hallucination',
  type: 'two-column',
  options: {
    "columnRatios": [0.5, 0.5]
  },
  content: {
    'pt-br': {
      title: `Problema 2: Alucinações`,
      body: `Quando um LLM não tem a resposta nos seus pesos, ele **não fica em silêncio** — ele gera texto plausível. Isso é chamado de **alucinação**.

### Por que alucinações acontecem

O modelo foi treinado para **prever a próxima palavra mais provável**. Ele não tem um conceito interno de "verdade" vs "mentira". Se a sequência parece plausível estatisticamente, ele gera.

### Exemplos clássicos

- **"Qual a fórmula do Unobtanium?"** → O modelo inventa uma fórmula química.
- **"Quem é o CEO da empresa X?"** → Responde com o CEO de uma empresa similar.
- **"Cite um artigo científico sobre..."** → Gera referências que não existem.

> Alucinações são especialmente perigosas porque o texto **soa convincente**. A gramática é perfeita, o tom é confiante — mas o conteúdo é falso.

\`\`\`python
snippet:rag/rag-hallucination
\`\`\`

### A raiz do problema

**LLMs são geradores de texto, não bancos de conhecimento.** Eles são ótimos em *como* escrever, mas não em *o que* é verdade.`,
    },
    'en-us': {
      title: `Problem 2: Hallucinations`,
      body: `When an LLM doesn't have the answer in its weights, it **doesn't stay silent** — it generates plausible text. This is called **hallucination**.

### Why hallucinations happen

The model was trained to **predict the next most likely word**. It has no internal concept of "truth" vs "lie". If the sequence seems statistically plausible, it generates it.

### Classic examples

- **"What's the formula for Unobtanium?"** → The model invents a chemical formula.
- **"Who is the CEO of company X?"** → Answers with the CEO of a similar company.
- **"Cite a scientific paper about..."** → Generates references that don't exist.

> Hallucinations are especially dangerous because the text **sounds convincing**. The grammar is perfect, the tone is confident — but the content is false.

\`\`\`python
snippet:rag/rag-hallucination
\`\`\`

### The root problem

**LLMs are text generators, not knowledge bases.** They're great at *how* to write, but not at *what* is true.`,
    },
  },
  visual: {
    id: 'rag-hallucination-visual',
    copy: {
      "pt-br": {
        "title": "Verdade vs Alucinação",
        "truthLabel": "Fonte Externa (Verdade)",
        "hallucinationLabel": "Sem Fonte = Alucinação",
        "plausibleLabel": "Texto Plausível mas Falso",
        "groundedLabel": "Resposta Fundamentada",
        "questionLabel": "Pergunta",
        "answerLabel": "Resposta"
      },
      "en-us": {
        "title": "Truth vs Hallucination",
        "truthLabel": "External Source (Truth)",
        "hallucinationLabel": "No Source = Hallucination",
        "plausibleLabel": "Plausible but False Text",
        "groundedLabel": "Grounded Answer",
        "questionLabel": "Question",
        "answerLabel": "Answer"
      }
    },
  },
});
