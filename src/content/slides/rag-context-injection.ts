import { defineSlide } from './_factory';

export const ragContextInjection = defineSlide({
  id: 'rag-context-injection',
  type: 'two-column',
  options: {
    "columnRatios": [0.5, 0.5]
  },
  content: {
    'pt-br': {
      title: `Injetando Contexto no Prompt`,
      body: `O passo crucial do RAG: **montar um prompt que contenha as fontes retrieved** antes da pergunta.

### O template de prompt RAG

\`\`\`
Instrução: Responda usando APENAS as informações do contexto.

Fonte 1: A Copa de 2022 foi realizada no Catar.
Fonte 2: A Argentina venceu a França na final por 4x2 nos pênaltis.
Fonte 3: Lionel Messi foi eleito o melhor jogador do torneio.

Pergunta: Quem ganhou a Copa do Mundo de 2022?
Resposta:
\`\`\`

### Por que isso funciona?

O LLM recebe **informação factual** junto com a pergunta. Ele não precisa "lembrar" dos pesos — a resposta está **literalmente no prompt**.

### Boas práticas

- **Numere as fontes** para rastreabilidade
- **Limite o contexto** ao que cabe na context window
- **Instrua explicitamente** o modelo a usar apenas o contexto
- **Ordene por relevância** (mais relevante primeiro)

\`\`\`python
snippet:rag/rag-context-injection
\`\`\``,
    },
    'en-us': {
      title: `Injecting Context into the Prompt`,
      body: `The crucial RAG step: **building a prompt that contains the retrieved sources** before the question.

### The RAG prompt template

\`\`\`
Instruction: Answer using ONLY the information from the context.

Source 1: The 2022 World Cup was held in Qatar.
Source 2: Argentina defeated France in the final 4-2 on penalties.
Source 3: Lionel Messi was elected the best player of the tournament.

Question: Who won the 2022 World Cup?
Answer:
\`\`\`

### Why this works

The LLM receives **factual information** along with the question. It doesn't need to "remember" from weights — the answer is **literally in the prompt**.

### Best practices

- **Number the sources** for traceability
- **Limit context** to what fits in the context window
- **Explicitly instruct** the model to use only the context
- **Order by relevance** (most relevant first)

\`\`\`python
snippet:rag/rag-context-injection
\`\`\``,
    },
  },
  visual: {
    id: 'rag-context-injection-visual',
    copy: {
      "pt-br": {
        "title": "Prompt Augmentado",
        "instructionLabel": "Instrução",
        "sourceLabel": "Fonte",
        "questionLabel": "Pergunta",
        "answerLabel": "Resposta",
        "contextBox": "Contexto Retrieved",
        "promptBox": "Prompt Final para o LLM"
      },
      "en-us": {
        "title": "Augmented Prompt",
        "instructionLabel": "Instruction",
        "sourceLabel": "Source",
        "questionLabel": "Question",
        "answerLabel": "Answer",
        "contextBox": "Retrieved Context",
        "promptBox": "Final Prompt to LLM"
      }
    },
  },
});
